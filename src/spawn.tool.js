import crossSpawn from 'cross-spawn';
import timestamp from './timestamp.tool.js';

function spawn({
  command = '',
  args = [],
  cwd = process.cwd(),
  detached = false,
  readyIndicator = null,
  timeout = null,
  onLine = null,
  onReady = null,
  prefix = '',
  suppressLogs = false,
  includeLines = [],
  excludeLines = []
}) {
  return new Promise(resolve => {
    try {
      let timer;
      const child = crossSpawn(command, args, {
        stdio: 'pipe',
        cwd,
        detached
      });
      const allData = [];
      const _onData = data => {

        const lines = [];

        data.toString().split(/\r?\n|\r/g).filter(Boolean).forEach(line => {

          if (timer) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              if (onReady) onReady(allData);
              resolve(allData);
            }, timeout);
          }

          lines.push(line);

          if (onLine) onLine(line);

          const isIncluded = !!includeLines.find(includeLine => line.indexOf(includeLine) != -1);
          const isExcluded = !!excludeLines.find(excludeLine => line.indexOf(excludeLine) != -1);
          const isLogged = !suppressLogs
            || (includeLines.length > 0 && excludeLines.length > 0 && isIncluded && !isExcluded)
            || (includeLines.length > 0 && isIncluded)
            || (excludeLines.length > 0 && !isExcluded);

          if (isLogged) {
            const commandParts = command.split('/');
            console.log([
              `${timestamp()} `,
              `${commandParts[commandParts.length - 1].toUpperCase()} >> `,
              prefix ? `${prefix} >> ` : '',
              line
            ].join(''));
          }

          if (readyIndicator && line.includes(readyIndicator)) {
            if (timer) clearTimeout(timer);
            setTimeout(() => {
              if (onReady) onReady(allData);
              resolve(allData);
            }, 500);
          }

        });

        allData.push(...lines);

      };
      child.on('error', error => console.error(582993, error));
      child.stderr.on('data', _onData);
      child.stdout.on('data', _onData);
      child.on('close', () => {
        if (timer) clearTimeout(timer);
        if (onReady) onReady(allData);
        resolve(allData);
      });
    } catch(error) { console.error(603958, error); }
  });
}

export default spawn;