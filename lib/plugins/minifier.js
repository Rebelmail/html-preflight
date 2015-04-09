'use strict';

var minify = require('html-minifier').minify;

function MinifierPlugin(opts) {
  this.opts = opts || {};
}

MinifierPlugin.prototype.run = function(html, cb) {
  try {
    return cb(null, minify(html, this.opts));
  } catch(e) {
    return cb(e);
  }
};

module.exports = MinifierPlugin;
