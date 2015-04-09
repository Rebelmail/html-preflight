'use strict';

var htmlAutoprefixer = require('html-autoprefixer');

function PrefixPlugin(opts) {
  this.opts = opts;
}

PrefixPlugin.prototype.run = function(html, cb){
  try {
    return cb(null, htmlAutoprefixer.process(html, this.opts));
  } catch(e) {
    return cb(e);
  }
};


module.exports = PrefixPlugin;
