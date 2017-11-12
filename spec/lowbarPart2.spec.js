const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', () => {
  'use strict';

  it('is an object', () => {
    expect(_).to.be.an('object');
  });
});

///////////////////////////test once//////////////////////////////////////////////

describe('#once', function () {
  it('should be a function', function () {
    expect(_.once).to.be.a('function');
  });
  it('should only allow the function to be called once', function () {
    let Spy = sinon.spy();
    let mySpyOnce = _.once(Spy);
    mySpyOnce();
    mySpyOnce();
    mySpyOnce();
    expect(Spy.callCount).to.equal(1);
  });
  it('should forward all the arguments from the returned function to the original function', function () {
    let Spy = sinon.spy();
    let mySpyOnce = _.once(Spy);
    mySpyOnce(1, 2, 3);
    expect(Spy.calledWithExactly(1, 2, 3)).to.equal(true);
  });
  it('should always return the result of the first invocation', function () {
    let identityOnce = _.once(_.identity);
    let results = [];
    results.push(identityOnce(1));
    results.push(identityOnce(2));
    results.push(identityOnce(3));
    expect(results).to.eql([1, 1, 1]);
  });
});

///////////////////////////test negate//////////////////////////////////////////////

describe('#negate', function () {
  it('should be a function', function () {
    expect(_.negate).to.be.a('function');
  });
});

///////////////////////////test shuffle///////////////////////////////////////////

describe('#shuffle', () => {
  it('is a function', () => {
    expect(_.shuffle).to.be.a('function');
  });

  it('returns an array', () => {
    let arr = [1, 2, 3, 4, 5];
    expect(_.shuffle(arr)).to.be.an('array');
  });

  it('returns array of the same length', () => {
    let arr = [1, 2, 3, 4, 5];
    expect(_.shuffle(arr)).to.have.lengthOf(5);
  });

  it('returns an empty array if an argument is not an array, string or object', () => {
    expect(_.shuffle(true)).to.eql([]);
    expect(_.shuffle(123)).to.eql([]);
  });

  it('returns the array passed in if the array.length is 0 or 1', () => {
    expect(_.shuffle([])).to.eql([]);
    expect(_.shuffle([1])).to.eql([1]);
  });

  it('returns an array that contains the same values', () => {
    let arr = [1, 2, 3];
    expect(_.shuffle(arr)).to.include(1, 2, 3);
  });

  it('returns an array containing each letter of the string argument in a shuffled order', () => {
    let str = 'abcdefg';
    expect(_.shuffle(str)).to.be.an('array');
    expect(_.shuffle(str)).to.include('a', 'b', 'c', 'd', 'e', 'f', 'g');
  });

  it('returns an array containing the value of each key-value pair in a shuffled order if an object is given as an argument', () => {
    let obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(_.shuffle(obj)).to.be.an('array');
    expect(_.shuffle(obj)).to.include(1, 2, 3, 4);
  });

  it('is a pure function', () => {
    let arr = [1, 2, 3];
    expect(_.shuffle(arr)).to.not.equal(arr);
    expect(arr).to.eql([1, 2, 3]);
  });
});

///////////////////////////test invoke///////////////////////////////////////////

describe('_.invoke', () => {
  it('is a function', () => {
    expect(_.invoke).to.be.a('function');
  });

  it('it takes at least two arguments', () => {
    expect(_.invoke).to.have.length.greaterThan(2);
  });

  it('returns undefined if no method is given', () => {
    expect(_.invoke([1, 2, 3])).to.be.undefined;
  });

  it('returns an empty array if the list argument is undefined, null, a number or a boolean', () => {
    expect(_.invoke(null, 'sort')).to.eql([]);
    expect(_.invoke(undefined, 'toUpperCase')).to.eql([]);
    expect(_.invoke(1234, 'sort')).to.eql([]);
    expect(_.invoke(true, 'toUpperCase')).to.eql([]);
    expect(_.invoke(false, 'toUpperCase')).to.eql([]);
  });

  it('applies an array method on each array value in an array list', () => {
    expect(_.invoke([[3, 2, 1], [5, 4, 6]], 'sort')).to.eql([[1, 2, 3], [4, 5, 6]]);
    expect(_.invoke([[3, 2, 1], [5, 4, 6]], 'join')).to.eql(['3,2,1', '5,4,6']);
  });

  it('takes arguments for the methods as the third argument', () => {
    expect(_.invoke([[1, 2, 3], [4, 5, 6]], 'join', '&')).to.eql(['1&2&3', '4&5&6']);
  });

  it('applies a string method on each string value in an array list', () => {
    expect(_.invoke(['hello', 'world'], 'toUpperCase')).to.eql(['HELLO', 'WORLD']);
  });

  it('returns an array if the list argument is a string and also applies the string method', () => {
    expect(_.invoke('abc', 'toUpperCase')).to.eql(['A', 'B', 'C']);
    expect(_.invoke('abc', 'repeat', 2)).to.eql(['aa', 'bb', 'cc']);
  });

  it('returns an array if the list argument is an object and also applies the string method', () => {
    expect(_.invoke({ a: 'abc', b: 'def'}, 'toUpperCase')).to.eql(['ABC', 'DEF']);
    expect(_.invoke({ a: 'abc', b: 'def'}, 'repeat', 2)).to.eql(['abcabc', 'defdef']);
    expect(_.invoke({ a: [1,2], b: [3,4]}, 'join')).to.eql(['1,2','3,4']);
  });

  it('returns undefined if the method cannot be applied to the list value', () => {
    expect(_.invoke([[3, 2, 1], [9, 8, 7], 123], 'sort')).to.eql([[1, 2, 3], [7, 8, 9], undefined]);
    expect(_.invoke([{a:'a', b:'b'}, true, 123], 'sort')).to.eql([undefined, undefined, undefined]);
  });
});

///////////////////////////test sortBy///////////////////////////////////////////

