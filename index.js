'use strict';

module.exports = require('./lib/preflight');
var plugins = require('./lib/plugins');

for (var key in plugins) {
  if (plugins.hasOwnProperty(key)) {
    module.exports[key] = plugins[key];
  }
}
