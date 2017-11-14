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

describe('#sortBy', () => {
  it('is a function', () => {
    expect(_.sortBy).to.be.a('function');
  });

  it('returns an empty array if a non-valid argument is given', () => {
    expect(_.sortBy(true)).to.eql([]);
    expect(_.sortBy(123)).to.eql([]);
    expect(_.sortBy(undefined)).to.eql([]);
    expect(_.sortBy(null)).to.eql([]);
    expect(_.sortBy()).to.eql([]);
  });

  it('returns an array of alphabetically ordered letters if a string argument is given', () => {
    expect(_.sortBy('hello')).to.eql(['e', 'h', 'l', 'l', 'o']);
    expect(_.sortBy('hello world')).to.eql([' ', 'd', 'e', 'h', 'l', 'l', 'l', 'o', 'o', 'r', 'w']);
  });

  it('returns a new array', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(_.sortBy(arr)).to.not.equal(arr);
  });

  it('returns a sorted array of values in ascending order', () => {
    const arr = [7, 3, 5, 1, 0, 19];
    expect(_.sortBy(arr)).to.eql([0, 1, 3, 5, 7, 19]);

    const objNum = { a: 7, b: 1, c: 12, d: 5 };
    expect(_.sortBy(objNum)).to.eql([1, 5, 7, 12]);
    
    const arrStr = ['zoo', 'ant', 'elephant'];
    expect(_.sortBy(arrStr)).to.eql(['ant', 'elephant', 'zoo']);

    const BoolArray = [true, true, false, true, false, true];
    expect(_.sortBy(BoolArray)).to.eql([false, false, true, true, true, true]);
  });

  it('returns a sorted array of mixed number and string values, with the values unchanged', () => {
    const mixed = ['a', 1, 'b', 2];
    expect(_.sortBy(mixed)).to.eql(mixed);
    expect(_.sortBy(mixed)).to.not.equal(mixed);
  });

  it('returns an array sorted by the results of passing each value through a function', () => {
    const func = n => Math.sin(n);
    expect(_.sortBy([1, 2, 3, 4, 5], func)).to.eql([5, 4, 3, 1, 2]);
  });

  it('13. returns an array stably sorted by the results of passing each value in an object through an iteratee (number)', () => {
    const func = n => Math.sin(n);
    expect(_.sortBy({ a: 1, b: 2, c: 3}, func)).to.eql([3, 1, 2]);
  });

  it('returns an array of objects sorted by a given key instead of function', () => {
    const arr = [{ name: 'umair', age: 32 }, { name: 'chris', age: 28 }, { name: 'ollie', age: 30 }];
    const res = [{ name: 'chris', age: 28 }, { name: 'ollie', age: 30 }, { name: 'umair', age: 32 }];
    expect(_.sortBy(arr, 'age')).to.eql(res);
  });
});

///////////////////////////test zip///////////////////////////////////////////


describe('#zip', function () {

  it('should be a function', function () {
    expect(_.zip).to.be.a('function');
  });

  it('should return an empty array when given an invalid data type', function () {
    expect(_.zip(true)).to.eql([]);
    expect(_.zip(1234)).to.eql([]);
  });

  it('returns the expected result if only one array is provided as an argument', () => {
    expect(_.zip([1, 2, 3])).to.eql([[1], [2], [3]]);
  });

  it('should merge together the values of each of the arrays with the values at the same index position', function () {
    expect(_.zip(['chris', 'emily', 'rhys'], [1, 2, 3], [true, false, false])).to.eql([['chris', 1, true], ['emily', 2, false], ['rhys', 3, false]]);
  });

  it('should merge together the values of each of the strings with the values at the same index position', function () {
    expect(_.zip('ben', 'jen', 'ken')).to.eql([['b', 'j', 'k' ], ['e', 'e', 'e'], ['n','n', 'n']]);
  });

  it('4. returns the expected result if the arrays are different lengths', () => {
    expect(_.zip(['chris', 'emily'], [30, 40], [true, false, false])).to.eql([['chris', 30, true], ['emily', 40, false], [undefined, undefined, false]]);
  });
});