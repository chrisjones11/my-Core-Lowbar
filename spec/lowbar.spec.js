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




});