'use strict';

describe('test/example.test.js', () => {
  before(() => {});
  beforeEach(() => {});
  after(() => {});
  afterEach(() => {});
  it('should work1', () => {});
  it.only('should work2', () => {});
  describe.skip('sub', () => {
    before(() => {});
    after(() => {});
    it('should work3', () => {});
    it.only('should skip', () => {});
    it('should support async', async () => { });
  });
});
