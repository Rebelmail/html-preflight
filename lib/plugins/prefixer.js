'use strict';

var htmlAutoprefixer = require('html-autoprefixer');
var postcssSafeParser = require('postcss-safe-parser');

function PrefixPlugin(cheerioOptions, postcssOptions) {
  this.cheerioOptions = cheerioOptions || {};
  this.postcssOptions = postcssOptions || {};
  this.postcssOptions.parser = this.postcssOptions.parser || postcssSafeParser;
  return this;
}

PrefixPlugin.prototype.run = function(html, callback) {
  try {
    var prefixed = htmlAutoprefixer.process(html, this.cheerioOptions, this.postcssOptions);
    if (prefixed === '') {
      return callback(new Error('Invalid HTML'));
    }

    return callback(null, prefixed);
  } catch (e) {
    return callback(e);
  }
};

module.exports = PrefixPlugin;
