import { expect } from 'chai';
import moment from 'moment';

import { timestamp } from '../index.js';

describe('1. timestamp', () => {

  describe('1.1. When "timestamp" is called without a "format" parameter', () => {
    it('1.1.1. Should return a "MM-DD-YY hh:mm:ssa" formatted string', () => {
      const now = moment().format('MM-DD-YY hh:mm:ssa');
      const stamp = timestamp();
      expect(stamp).to.equal(`[${now}]`);
    });
  });

  describe('1.2. When "timestamp" is called with a "format" parameter', () => {
    it('1.1.1. Should return a formatted string', () => {
      const format = 'MM/DD/YY hh:mm';
      const now = moment().format(format);
      const stamp = timestamp(format);
      expect(stamp).to.equal(`[${now}]`);
    });
  });

});
