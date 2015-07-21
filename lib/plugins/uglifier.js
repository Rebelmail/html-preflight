'use strict';

var HTMLUglify = require('html-uglify');

function UglifierPlugin(options) {
  this.options = options || {};
  this.uglifier = new HTMLUglify(this.options);
  return this;
}

UglifierPlugin.prototype.run = function(html, callback) {
  try {
    return callback(null, this.uglifier.process(html));
  } catch (e) {
    return callback(e);
  }
};

module.exports = UglifierPlugin;
