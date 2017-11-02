'use strict';

const babylon = require('babylon');
const traverse = require('ast-traverse');
const Item = require('./item');

module.exports = class Parser {
  parse({ source, filePath, handler }) {
    const ast = babylon.parse(source, { loc: true });

    const keyword = [ 'describe', 'it', 'before', 'beforeEach', 'after', 'afterEach' ];

    const tree = new Item({ type: 'file', filePath });
    let currentItem = tree;

    traverse(ast, {
      pre(node) {
        let item;
        if (node.type === 'CallExpression') {
          // it('xxx', () => {})
          const { callee } = node;
          /* istanbul ignore else */
          if (callee.type === 'Identifier' && keyword.includes(callee.name)) {
            const title = node.arguments[0].value;
            item = currentItem.add({
              type: callee.name,
              title,
              ast: node,
            });
          } else if (callee.type === 'MemberExpression' && keyword.includes(callee.object.name)) {
            // it.only('xxx', () => {})
            const title = node.arguments[0].value;
            const modifier = callee.property.name;
            item = currentItem.add({
              type: callee.object.name,
              title,
              ast: node,
              modifier,
            });
          }

          /* istanbul ignore else */
          if (item) {
            currentItem = item;
            node.$match = true;
            /* istanbul ignore else */
            if (handler) handler(item);
            // only describe has sub item
            if (item.type !== 'describe') return false;
          }
        }
      },

      post(node) {
        if (node.$match) {
          currentItem = currentItem.parent;
          node.$match = undefined;
        }
      },
    });

    return tree;
  }
};
