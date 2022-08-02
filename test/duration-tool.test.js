import { expect } from 'chai';

import { duration } from '../index.js';

describe('1. duration', () => {

  describe.only('1.1. When "duration" is called', () => {
    it('1.1.1. Should return a duration from "start"', async () => {
      const start = new Date();
      await new Promise(resolve => setTimeout(() => resolve(), 1500));
      const d = duration(start);
      expect(d).to.equal('00:00:01.5');
    });
  });

});
