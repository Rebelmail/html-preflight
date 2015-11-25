'use strict';

var expect = require('chai').expect;

var Prefixer = require('../../lib/plugins').PrefixerPlugin;

describe('PrefixerPlugin', function() {
  describe('#constructor', function() {
    it('should not return null', function() {
      expect(new Prefixer()).to.exist;
    });

    it('should store options', function() {
      expect(new Prefixer(true).cheerioOptions).to.exist;
      expect(new Prefixer(true).postcssOptions).to.exist;
    });
  });

  describe('#run', function() {
    var prefixer;

    before(function() {
      prefixer = new Prefixer();
    });

    it('should return err if invalid input', function(done) {
      prefixer.run('<htm', function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should return result if valid input', function(done) {
      prefixer.run('<html></html>', function(err, html) {
        expect(err).to.not.exist;
        expect(html).to.exist;
        done();
      });
    });
  });
});
