const path = require('path');
const expect = require('chai').expect;
// const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

  ///////////////////////////test identity//////////////////////////////////////////////

  describe('#identity', function () {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });
    it('is returns a argument exacty how it is passed', () => {
      expect(_.identity('string')).to.equal('string');
      expect(_.identity(false)).to.equal(false);
      expect(_.identity(1)).to.equal(1);
      expect(_.identity([1, 2, 3])).to.eql([1, 2, 3]);
      expect(_.identity({ 1: 'a', 2: 'b' })).to.eql({ 1: 'a', 2: 'b' });
    });
  });


  ///////////////////////////test values//////////////////////////////////////////////

  describe('#values', function () {
    it('is a function', function () {
      expect(_.values).to.be.a('function');
    });
    it('Return all of the values of the objects own properties.', () => {
      expect(_.values({ a: 1, b: 2, c: 3 })).to.eql([1, 2, 3]);
      expect(_.values({ 1: 'a', 2: 'b' })).to.eql(['a', 'b']);
    });
    it('Return empty array if arguments are not an object.', () => {
      expect(_.values('string')).to.eql([]);
      expect(_.values(false)).to.eql([]);
      expect(_.values(1)).to.eql([]);
    });
    it('Return array if passed an array.', () => {
      expect(_.values([1, 2, 3])).to.eql([1, 2, 3]);
    });
  });



});