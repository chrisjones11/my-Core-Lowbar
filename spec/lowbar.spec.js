const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });
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

///////////////////////////test first//////////////////////////////////////////////

describe('#first', function () {
  it('is a function', function () {
    expect(_.first).to.be.a('function');
  });

  it('Return first item of the array||string if second argument is undefined.', () => {
    expect(_.first([1, 2, 3, 4, 5])).to.eql([1]);
    expect(_.first('hello')).to.eql(['h']);
  });

  it('Return array of string or array sliced up to second argument .', () => {
    expect(_.first([1, 2, 3, 4, 5], 2)).to.eql([1, 2]);
    expect(_.first(['a', 'b', 'c', 'd', 'e'], 2)).to.eql(['a', 'b']);
    expect(_.first('hello', true)).to.eql(['h']);
    expect(_.first('hello', false)).to.eql([]);
  });

  it('if first arg is not an array or string and second arg is undefined return undefined .', () => {
    expect(_.first(1)).to.equal(undefined);
    expect(_.first(true)).to.equal(undefined);
    expect(_.first({ 1: 'a', 2: 'b' })).to.equal(undefined);
  });

  it('Return empty array if first arg is not a string or array and second arg is not undefined .', () => {
    expect(_.first(1,1)).to.eql([]);
    expect(_.first(true,false)).to.eql([]);
    expect(_.first({ 1: 'a', 2: 'b' },2)).to.eql([]);
  });
});

///////////////////////////test last//////////////////////////////////////////////

describe('#last', function () {
  it('is a function', function () {
    expect(_.last).to.be.a('function');
  });

  it('if first arg is array or string and second arg is undefined return last element.', () => {
    expect(_.last([1, 2, 3, 4, 5])).to.eql([5]);
    expect(_.last('hello')).to.eql(['o']);
  });

  it('if first arg is string or array and second arg equates to a number return that number of elements from end.', () => {
    expect(_.last([1, 2, 3, 4, 5], 2)).to.eql([4, 5]);
    expect(_.last(['a', 'b', 'c', 'd', 'e'], 2)).to.eql(['d', 'e']);
    expect(_.last('hello', true)).to.eql(['o']);
    expect(_.last('hello', false)).to.eql([]);
  });

  it('return undefined if first arg is not string or array and second arg is undefined', () => {
    expect(_.last(1)).to.equal(undefined);
    expect(_.last(true)).to.equal(undefined);
    expect(_.last({ 1: 'a', 2: 'b' })).to.equal(undefined);
  });

  it('return empty array if first arg is not string or array and second arg is not undefined .', () => {
    expect(_.last(1,1)).to.eql([]);
    expect(_.last(true,false)).to.eql([]);
    expect(_.last({ 1: 'a', 2: 'b' },2)).to.eql([]);
  });

  it('if first arg is string or array and second arg does not equate to a number return whole of array.', () => {
    expect(_.last([1, 2, 3, 4, 5], 's')).to.eql([1, 2, 3, 4, 5]);
    expect(_.last('hello','s')).to.eql(['h','e','l','l','o']);
  });
});

///////////////////////////test each//////////////////////////////////////////////

describe('#each', function () {
  it('is a function', function () {
    expect(_.each).to.be.a('function');
  });

  it('when first arg is an Array return true if spy callCount is equal to expected', function() {
    const spy = sinon.spy();
    let result = 5;
    _.each([1,2,3,4,5], spy);
    expect(spy.callCount).to.equal(result);
  });

  it('when first arg is an Array return true if spy.firstCall.calledWithExactly is equal to expected', function() {
    const spy = sinon.spy();
    let result = true;
    _.each([1,2,3,4,5], spy);      
    expect(spy.firstCall.calledWithExactly(1,0,[1,2,3,4,5])).to.equal(result);
    expect(spy.lastCall.calledWithExactly(5,4,[1,2,3,4,5])).to.equal(result);
  });

  it('when first arg is an object return true if spy callCount is equal to expected', function() {
    const spy = sinon.spy();
    let result = 5;
    _.each({a : 1, b : 2, c : 3, d : 4, e : 5}, spy);
    expect(spy.callCount).to.equal(result);
  });

  it('when first arg is an Array return true if spy.firstCall.calledWithExactly is equal to expected', function() {
    const spy = sinon.spy();
    let result = true;
    _.each({a : 1, b : 2, c : 3, d : 4, e : 5}, spy);        
    expect(spy.firstCall.calledWithExactly(1,'a' ,{a : 1, b : 2, c : 3, d : 4, e : 5})).to.equal(result);
    expect(spy.lastCall.calledWithExactly(5, 'e',{a : 1, b : 2, c : 3, d : 4, e : 5})).to.equal(result);
  });
});
  