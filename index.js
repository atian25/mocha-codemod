'use strict';

const Parser = require('./lib/parser');

module.exports = (...args) => new Parser().parse(...args);
