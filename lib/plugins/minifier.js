'use strict';

var minify = require('html-minifier').minify;

function MinifierPlugin(options) {
  this.options = options || {};
  return this;
}

MinifierPlugin.prototype.run = function(html, callback) {
  try {
    return callback(null, minify(html, this.options));
  } catch(e) {
    return callback(e);
  }
};

module.exports = MinifierPlugin;
