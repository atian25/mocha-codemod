'use strict';

const path = require('path');
const fs = require('mz/fs');
const assert = require('assert');
const parser = require('../');

describe('test/index.test.js', () => {
  const fixture = path.join(__dirname, 'fixtures/test');
  it('should work', function* () {
    const filePath = path.join(fixture, 'example.test.js');
    const source = yield fs.readFile(filePath, 'utf-8');
    let result = '';

    const tree = parser({
      source,
      filePath,
      handler(item) {
        result += [
          item.deep > 1 ? ' '.repeat((item.deep - 1) * 2) : '',
          item.type,
          item.modifier ? '.' + item.modifier : '',
          item.title ? '(\'' + item.title + '\')' : '()',
          '\n',
        ].join('');
      },
    });

    const out = yield fs.readFile(path.join(fixture, 'out.txt'), 'utf-8');
    assert(result === out);
  });
});
