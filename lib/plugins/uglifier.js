'use strict';

var HtmlUglify = require('html-uglify');

function UglifierPlugin(opts) {
  this.uglifier = new HtmlUglify(opts);
}

UglifierPlugin.prototype.run = function(html, cb) {
  try {
    return cb(null, this.uglifier.process(html));
  } catch (e) {
    return cb(e);
  }
};

module.exports = UglifierPlugin;
