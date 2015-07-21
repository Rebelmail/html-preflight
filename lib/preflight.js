'use strict';

var async = require('async');
var	bytes = require('bytes');
var colors = require('colors/safe');

var	VERSION = require('../package.json').version;

function generateStats(originalDoc, doc) {
  var initialSize = Buffer.byteLength(originalDoc.toString(), 'utf8');
  var finalSize = Buffer.byteLength(doc.toString(), 'utf8');
  var delta = ((initialSize - finalSize) / initialSize) * 100;

  console.log('Starting Filesize: ', colors.inverse(bytes(initialSize)));
  console.log('Ending Filesize:   ', colors.inverse(bytes(finalSize)));
  console.log('Percent Savings:   ', colors.inverse.bold(delta.toFixed(2) + '%'));
  console.log('==================');

  if (finalSize <= 102400) {
    console.log(colors.bold.yellow.bgBlack('The file is under 100KiB and will work everywhere.'));
  } else {
    console.log(colors.bold.red.bgBlack('The file is NOT under 100KiB and will NOT work everywhere!!!'));
  }
}

function HTMLPreflight(plugins) {
  this.version = VERSION;
  this.plugins = plugins || [];
  return this;
}

HTMLPreflight.prototype.run = function(originalDoc, options, callback) {
  if (arguments.length < 3) {
    callback = options;
    options = {};
  }

  var tasks = [async.constant(originalDoc)].concat(this.plugins);
  async.waterfall(tasks, function(err, doc) {
    if (err) return callback(err, doc);
    if (options.stats) generateStats(originalDoc, doc);
    return callback(err, doc);
  });
};

module.exports = HTMLPreflight;
