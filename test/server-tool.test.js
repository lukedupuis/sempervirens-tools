import { expect } from 'chai';
import express from 'express';
import superagent from 'superagent';

import { startServer, stopServer, stopAllServers } from '../src/server.tool.js';

const app = express();
app.get('/', (req, res) => res.send('Success'));

describe('1. server.tool', () => {
  // return;

  describe('1.1. When "startServer" is called', () => {
    // return;

    describe('1.1.1. When "type" is "http"', () => {
      // return;
      it('1.1.1.1. Should start a server on port 80 and return an ID', async () => {
        const id = startServer({ type: 'http', app });
        const { text } = await superagent.get('http://localhost');
        expect(text).to.equal('Success');
        expect(id).to.exist;
        await stopServer(id);
      });
    });

  });

  describe('1.2. When "stopServer" is called', () => {
    it('1.2.1. Should stop the server', async () => {
      const id = startServer({ type: 'http', app });
      const { text } = await superagent.get('http://localhost');
      expect(text).to.equal('Success');
      await stopServer(id);
      try {
        await superagent.get('http://localhost');
      } catch(error) {
        expect(error.message).to.include('ECONNREFUSED');
      }
    });
  });

  describe('1.3. When "stopAllServers" is called', () => {
    it('1.3.1. Should stop all servers', async () => {
      startServer({ app, port: 80 });
      const { text: text1 } = await superagent.get('http://localhost:80');
      expect(text1).to.equal('Success');

      startServer({ app, port: 8080 });
      const { text: text2 } = await superagent.get('http://localhost:8080');
      expect(text2).to.equal('Success');

      await stopAllServers();

      try {
        await superagent.get('http://localhost:80');
      } catch(error) {
        expect(error.message).to.include('ECONNREFUSED');
      }
      try {
        await superagent.get('http://localhost:8080');
      } catch(error) {
        expect(error.message).to.include('ECONNREFUSED');
      }
    });
  });

  after(() => setTimeout(() => process.exit(), 100));

});
