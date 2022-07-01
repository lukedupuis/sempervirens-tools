import { expect } from 'chai';
import express from 'express';
import superagent from 'superagent';

import { startServer, stopServer } from '../src/server.tool.js';

describe('1. server.tool', () => {
  // return;

  describe('1.1. When "startServer" is called', () => {
    // return;

    describe('1.1.1. When "type" is "http"', () => {
      // return;
      it('1.1.1.1. Should start a server on port 80 and return an ID', async () => {
        const app = express();
        app.get('/', (req, res) => res.send('Success'));
        const id = startServer({ type: 'http', app });
        const { text } = await superagent.get('http://localhost');
        expect(text).to.equal('Success');
        expect(id).to.exist;
        stopServer(id);
      });
    });

  });

  describe('1.2. When "stopServer" is called', () => {
    it('1.2.1. Should stop the server', async () => {
      const app = express();
      app.get('/', (req, res) => res.send('Success'));
      const id = startServer({ type: 'http', app });
      const { text } = await superagent.get('http://localhost');
      expect(text).to.equal('Success');
      stopServer(id);
      try {
        await superagent.get('http://localhost');
      } catch(error) {
        expect(error.message).to.include('ECONNREFUSED');
      }
    });
  });

  after(() => setTimeout(() => process.exit(), 100));

});
