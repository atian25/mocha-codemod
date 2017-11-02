'use strict';

const assert = require('assert');

module.exports = class TestItem {
  constructor({ type, title, modifier, filePath, ast }) {
    assert(type, 'must provide `type`');

    this.type = type;
    this.title = title;

    this.modifier = modifier;
    this.only = modifier === 'only';
    this.skip = modifier === 'skip';

    this.filePath = filePath;
    this.ast = ast;
    this.deep = 0;
    this.children = [];
  }

  add(opts) {
    const item = new TestItem(opts);
    item.parent = this;
    item.filePath = this.filePath;
    item.deep = this.deep + 1;
    this.children.push(item);
    return item;
  }
};
