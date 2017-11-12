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

  it('returns an empty array if an argument is not an array, string or object', () => {
    expect(_.shuffle(true)).to.eql([]);
    expect(_.shuffle(123)).to.eql([]);
  });

  it('returns the array passed in if the array.length is 0 or 1', () => {
    expect(_.shuffle([])).to.eql([]);
    expect(_.shuffle([1])).to.eql([1]);
  });

  it('returns array of the same length', () => {
    let arr = [1, 2, 3, 4, 5];
    expect(_.shuffle(arr)).to.have.lengthOf(5);
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