'use strict';

var htmlAutoprefixer = require('html-autoprefixer');

function PrefixPlugin(options) {
  this.options = options || {};
  return this;
}

PrefixPlugin.prototype.run = function(html, callback) {
  try {
    return callback(null, htmlAutoprefixer.process(html, this.options));
  } catch (e) {
    return callback(e);
  }
};

module.exports = PrefixPlugin;
