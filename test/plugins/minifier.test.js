'use strict';

var expect = require('chai').expect;

var Minifier = require('./../../lib/plugins').MinifierPlugin;

describe('MinifierPlugin', function() {
  describe('#constructor', function() {
    it('should not return nil', function() {
      expect(new Minifier()).to.exist;
    });
    it('should store opts', function() {
      expect(new Minifier(true).opts).to.exist;
    });
  });
  describe('#run', function() {
    var minifier;
    before(function() {
      minifier = new Minifier();
    });
    it('should return err if invalid input', function(done) {
      minifier.run('<htm', function(err) {
        expect(err).to.exist;
        done();
      });
    });
    it('should return result if valid input', function(done) {
      minifier.run('<html></html>', function(err, html) {
        expect(err).to.not.exist;
        expect(html).to.exist;
        done();
      });
    });
  });
});
