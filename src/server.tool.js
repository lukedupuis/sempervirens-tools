import http from 'http';
import https from 'https';
import { readFileSync } from 'fs';

const servers = {};

const generateId = () => {
  return `${Date.now()}${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`;
};

const startServer = ({
  type,
  app,
  port,
  message = '',
  ssl = { // Absolute paths
    keyPath: '',
    certPath: '',
    caPaths: []
  }
}) => {
  const serverId = generateId();
  let serverData = { server: null, sockets: {} };
  if (type == 'http') {
    if (!port) port = 80;
    serverData.server = http.createServer(app);
  } else if (type == 'https') {
    if (!port) port = 443;
    serverData.server = https.createServer({
      key: readFileSync(ssl.keyPath, 'utf-8'),
      cert: readFileSync(ssl.certPath, 'utf-8'),
      ca: ssl.caPaths.map(path => readFileSync(path, 'utf-8'))
    }, app);
  }
  serverData.server.listen(port, message);
  serverData.server.on('connection', socket => {
    const socketId = generateId();
    serverData.sockets[socketId] = socket;
    serverData.server.once('close', () => delete serverData.sockets[socketId]);
  });
  servers[serverId] = serverData;
  return serverId;
};

const stopServer = serverId => {
  const serverData = servers[serverId];
  for (const socketId in serverData.sockets) {
    serverData.sockets[socketId].destroy();
    delete serverData.sockets[socketId];
  }
  return new Promise(resolve => {
    serverData.server.close(() => {
      delete serverData.server;
      resolve();
    });
  });
};

const stopAllServers = () => {
  for (const serverId in servers) {
    stopServer(serverId);
  }
};

export {
  startServer,
  stopServer,
  stopAllServers
}