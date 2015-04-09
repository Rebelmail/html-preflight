'use strict';

var expect = require('chai').expect;

var Uglifier = require('./../../lib/plugins').UglifierPlugin;

describe('UglifierPlugin', function() {
  describe('#constructor', function() {
    it('should not return nil', function() {
      expect(new Uglifier()).to.exist;
    });
    it('should create an uglifier with opts', function() {
      expect(new Uglifier(true).uglifier).to.exist;
    });
  });
  describe('#run', function() {
    var uglifier;
    before(function() {
      uglifier = new Uglifier();
    });
    it('should return err if invalid input', function(done) {
      uglifier.run('<htm', function(err) {
        expect(err).to.exist;
        done();
      });

    });
    it('should return result if valid input', function(done) {
      uglifier.run('<html></html>', function(err, html) {
        expect(err).to.not.exist;
        expect(html).to.exist;
        done();
      });
    });
  });
});
