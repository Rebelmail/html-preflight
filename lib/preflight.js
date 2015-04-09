'use strict';

var async = require('async');
var	bytes = require('bytes');
var	colors = require('colors');
var	packageJson = require('./../package.json');

var generateStats = function (start, end) {
  var startbyte = Buffer.byteLength(start.toString(), 'utf8');
  var endbyte = Buffer.byteLength(end.toString(), 'utf8');
  var delta = ((startbyte-endbyte)/startbyte) *100;
  console.log('Starting Filesize: ', colors.inverse(bytes(startbyte)));
  console.log('Ending Filesize:   ', colors.inverse(bytes(endbyte)));
  console.log('Percent Savings:   ', colors.inverse.bold(delta.toFixed(2) + '%'));
  console.log('==================');
  if (endbyte <= 102400) {
    return console.log('The file is under 100kb and will work everywhere!!!'.bold.yellow.bgBlack);
  } else {
    return console.log('The file is NOT under 100kb and will NOT work everywhere!!!'.bold.red.bgBlack);
  }
};

function Preflight(plugins) {
  this.plugins = plugins || [];
  this.version = packageJson.version;
}

Preflight.prototype.run = function(doc, options, cb) {
  var that = this;

  if (arguments.length < 3) {
    cb = options;
    options = {};
  }

  if (options.stats) var originalDoc = doc;
  that.plugins[0] = async.apply(that.plugins[0], doc);
  async.waterfall(that.plugins, function(err, doc) {
    if (options.stats) generateStats(originalDoc, doc);
    return cb(err, doc);
  });
};

module.exports = Preflight;
