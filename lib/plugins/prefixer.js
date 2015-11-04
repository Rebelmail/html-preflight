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
    return callback(null, htmlAutoprefixer.process(html, this.cheerioOptions, this.postcssOptions));
  } catch (e) {
    return callback(e);
  }
};

module.exports = PrefixPlugin;
