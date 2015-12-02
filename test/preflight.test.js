'use strict';

var expect = require('chai').expect;

var HTMLPreflight = require('../lib/preflight');

var plugins = require('../lib/plugins');
var Prefixer = plugins.PrefixerPlugin;
var Uglifier = plugins.UglifierPlugin;
var Minifier = plugins.MinifierPlugin;

var prefixer = new Prefixer();
var uglifier = new Uglifier();
var minifier = new Minifier();

describe('HTMLPreflight', function() {
  describe('#constructor', function() {
    it('should not return null', function () {
      var preflight = new HTMLPreflight();
      expect(preflight).to.exist;
    });

    it('should take a plugins array', function () {
      var preflight = new HTMLPreflight([1,2,3]);
      expect(preflight.plugins.length).to.equal(3);
    });
  });

  describe('#run', function () {
    var preflight;

    before(function() {
      preflight = new HTMLPreflight();
    });

    it('should return an error if a plugin failed', function(done) {
      var stub = function(html, cb) {
        return cb(new Error());
      };

      preflight.plugins = [stub];
      preflight.run('test', function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should return a valid html if plugins succeeded', function(done) {
      var stub = function(html, cb) {
        return cb(null, '');
      };

      preflight.plugins = [stub];
      preflight.run('test', function(err, html) {
        expect(err).to.not.exist;
        expect(html).to.exist;
        done();
      });
    });
  });

  describe('integration tests', function () {
    var preflight;

    before(function() {
      preflight = new HTMLPreflight()
    });

    it('raises an error with invalid html', function(done) {
      preflight.plugins = [
        prefixer.run.bind(prefixer),
        uglifier.run.bind(uglifier),
        minifier.run.bind(minifier)
      ]

      preflight.run('<htm', function(err, html) {
        expect(err).to.exist;
        done();
      });
    });
  });
});
