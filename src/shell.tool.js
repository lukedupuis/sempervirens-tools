import { readFileSync } from 'fs';
import Ssh2Shell from 'ssh2shell';
import timestamp from './timestamp.tool.js';

function shell({
  host = '',
  un = '',
  pw = '',
  sshKeyPath = '',
  commands = [],
  logOutput = false
} = {}) {
  return new Promise(resolve => {
    const shell = new Ssh2Shell({
      commands: commands.filter(Boolean),
      server: {
        host,
        userName: un,
        password: pw,
        privateKey: sshKeyPath && readFileSync(sshKeyPath, 'utf8')
      },
      dataIdleTimeOut: 5000,
      idleTimeOut: 5000,
      connectedMessage: `${timestamp()}   Connected`,
      readyMessage: `${timestamp()}   Running ...`,
      onError: error => log.error(995233, error),
      onEnd: sessionText => {
        setTimeout(() => resolve(sessionText), 3000);
        log(`${timestamp()}   Closed`);
      },
      // debug: true, // For debugging
      // verbose: true, // For debugging
      onData: data => logOutput && log(data), // For debugging
      // onCommandTimeout: (command, response, stream, connection) => log.error(698992, `Command timed out: ${command} : ${response}`)
    });
    shell.connect();
  });
}

export default shell;