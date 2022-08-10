import { readFileSync } from 'fs';
import { Client as Ssh2Client } from 'ssh2';

class FtpTool {

  constructor() {}

  /**
   * @function parseError
   */
  parseError(error) {
    return error instanceof Error ? error
      : typeof error == 'string' ? new Error(error)
      : typeof error == 'object' ? new Error(JSON.stringify(error))
      : error;
  }

  /**
   * @function sConnect
   */
  sConnect({
    host = '',
    port = 22,
    un = '',
    pw = '',
    sshKeyPath = ''
  } = {}) {
    return new Promise((resolve, reject) => {
      try {
        const ssh2Client = new Ssh2Client();
        ssh2Client.on('error', error => reject(this.parseError(error)));
        ssh2Client.on('ready', error => {
          if (error) return reject(this.parseError(error));
          ssh2Client.sftp((error, sftp) => {
            if (error) return reject(this.parseError(error));
            resolve({ end: () => ssh2Client.end(), sftp });
          });
        });
        ssh2Client.connect({
          host,
          port,
          user: un,
          password: pw,
          privateKey: sshKeyPath ? readFileSync(sshKeyPath, 'utf8') : ''
        });
      } catch(error) { log.error(300691, error); }
    });
  }

  /**
   * @function sPut
   */
  async sPut({
    localPath,
    remotePath,
    credentials: {
      host = '',
      port = 22,
      un = '',
      pw = '',
      sshKeyPath = ''
    } = {}
  }) {
    return new Promise(async (resolve, reject) => {
      const c = await this.sConnect({ host, port, un, pw, sshKeyPath });
      c.sftp.fastPut(localPath, remotePath, error => {
        if (error) return reject(this.parseError(error));
        c.end();
        resolve();
      });
    });
  }

}

export default new FtpTool();