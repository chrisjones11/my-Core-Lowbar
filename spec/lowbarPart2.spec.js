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

describe('#once', () => {
  it('should be a function', () => {
    expect(_.once).to.be.a('function');
  });
  it('should only allow the function to be called once', () => {
    let Spy = sinon.spy();
    let mySpyOnce = _.once(Spy);
    mySpyOnce();
    mySpyOnce();
    mySpyOnce();
    expect(Spy.callCount).to.equal(1);
  });
  it('should forward all the arguments from the returned function to the original function', () => {
    let Spy = sinon.spy();
    let mySpyOnce = _.once(Spy);
    mySpyOnce(1, 2, 3);
    expect(Spy.calledWithExactly(1, 2, 3)).to.equal(true);
  });
  it('should always return the result of the first invocation', () => {
    let identityOnce = _.once(_.identity);
    let results = [];
    results.push(identityOnce(1));
    results.push(identityOnce(2));
    results.push(identityOnce(3));
    expect(results).to.eql([1, 1, 1]);
  });
});

///////////////////////////test negate//////////////////////////////////////////////

describe( '#negate', () => {
  'use strict';
  it('it is a function', () => {
    expect(_.negate).to.be.a('function');
  });
  it('returns the function itself if not passed a function as an argument', () => {
    expect(_.negate()).to.be.a('function');
  });
  it('negates the result of a function passed to it', () => {
    let isFalsy = _.negate(Boolean);
    expect(isFalsy(false)).to.be.true;
    expect(isFalsy(true)).to.be.false;

    let isEven = (num) => {
      return num % 2 !== 1;
    };

    let isOdd = _.negate(isEven);
    expect(isOdd(1)).to.be.true;
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
  it('it is a function', () => {
    expect(_.sortBy).to.be.a('function');
  });
  
  it('returns an empty array when not given valid list', () => {
    expect(_.sortBy()).to.eql([]);
    expect(_.sortBy(12)).to.eql([]);
    expect(_.sortBy(false)).to.eql([]);
  });

  it('it returns an array of elements sorted alphabetically when given a string', () => {
    const str = 'cba';
    const expected = ['a', 'b', 'c'];
    expect(_.sortBy(str)).to.eql(expected);
  });

  it('it returns an array of sorted elements when given an array', () => {
    const expectedNums = [1, 2, 3, 4];
    const Nums = [4, 3, 2, 1];
    const expectedStr = ['a', 'b', 'c', 'd'];
    const Str = ['d', 'c', 'b', 'a'];
    const Obj = {a:4, b:3, c:2, d:1};
    expect(_.sortBy(Nums)).to.eql(expectedNums);
    expect(_.sortBy(Obj)).to.eql(expectedNums);
    expect(_.sortBy(Str)).to.eql(expectedStr);
  });

  it('it returns an array of sorted elements based on the iteratee', () => {
    const Nums = [1,2,3,4,5,6];
    const expectedNums = [5, 4, 6, 3, 1, 2];
    const Strs = ['aaaa', 'aaa', 'aa', 'a'];
    const Obj = {0: 'aaaa', 1: 'aaa', 2: 'aa', 3: 'a'};
    const expectedStrs = ['a', 'aa', 'aaa', 'aaaa'];
    expect(_.sortBy(Nums, num => Math.sin(num))).to.eql(expectedNums);
    expect(_.sortBy(Strs, str => str.length)).to.eql(expectedStrs);
    expect(_.sortBy(Obj, str => str.length)).to.eql(expectedStrs);
  });

  it('it returns an array of sorted elements based on an iteratee using context', () => {
    const Nums = [1,2,3,4,5,6];
    const oneOverThis = function(num ) {
      return this / num;
    };
    const expectedNums = [6,5,4,3,2,1];
    expect(_.sortBy(Nums, oneOverThis, 1)).to.eql(expectedNums);
  });
});

///////////////////////////test zip///////////////////////////////////////////


describe('#zip', () => {

  it('should be a function', () => {
    expect(_.zip).to.be.a('function');
  });

  it('should return an empty array when given an invalid data type', () => {
    expect(_.zip(true)).to.eql([]);
    expect(_.zip(1234)).to.eql([]);
  });

  it('returns the expected result if only one array is provided as an argument', () => {
    expect(_.zip([1, 2, 3])).to.eql([[1], [2], [3]]);
  });

  it('should merge together the values of each of the arrays with the values at the same index position', () => {
    expect(_.zip(['chris', 'emily', 'rhys'], [1, 2, 3], [true, false, false])).to.eql([['chris', 1, true], ['emily', 2, false], ['rhys', 3, false]]);
  });

  it('should merge together the values of each of the strings with the values at the same index position', () => {
    expect(_.zip('ben', 'jen', 'ken')).to.eql([['b', 'j', 'k' ], ['e', 'e', 'e'], ['n','n', 'n']]);
  });

  it('4. returns the expected result if the arrays are different lengths', () => {
    expect(_.zip(['chris', 'emily'], [30, 40], [true, false, false])).to.eql([['chris', 30, true], ['emily', 40, false], [undefined, undefined, false]]);
  });
});

///////////////////////////test sortedIndex///////////////////////////////////

describe('#sortedIndex', () => {

  it('is a function', () => {
    expect(_.sortedIndex).to.be.a('function');
  });

  it('returns 0 if given an invalid data type', () => {
    expect(_.sortedIndex(1345, 2)).to.equal(0);
    expect(_.sortedIndex(true, false)).to.equal(0);
    expect(_.sortedIndex({ a: 2, b: 4, c: 6, d: 10 }, { e: 8 })).to.equal(0);
  });

  it('returns the index at which the value should be inserted into the sorted list',  () => {
    expect(_.sortedIndex([1, 2, 3, 5, 6], 4)).to.equal(3);
    expect(_.sortedIndex([10, 20, 30, 40, 50], 35)).to.equal(3);
    expect(_.sortedIndex([10, 20, 30, 40, 50], 45)).to.equal(4);
    expect(_.sortedIndex(['a', 'e', 'o', 'u'], 'i')).to.equal(2);
  });

  it('return the index of where the value should be inserted into the list when given a third arg which to sorts the list',  () => {
    expect(_.sortedIndex(['he', 'hen', 'holiday', 'ken'], 'hello', 'length')).to.equal(3);
  });

  it('returns the index at which the object should be inserted into the list',  () => {
    let family = [{ name: 'chris', age: 28 }, { name: 'emily', age: 38 }];
    expect(_.sortedIndex(family, { name: 'rhys', age: 32 }, 'age')).to.equal(1);
  });

  it('returns the index that a number should be inserted at if the number is provided as the only element in an array', () => {
    expect(_.sortedIndex([10, 20, 30, 40, 50, 60], [31])).to.equal(3);
  });

  it('returns the index that a number should be inserted at if the number is provided as a string', () => {
    expect(_.sortedIndex([10, 20, 30, 40, 50, 60], '31')).to.equal(3);
  });

});

///////////////////////////test flatten///////////////////////////////////////

describe('#flatten', () => {
  it('is a function', () => {
    expect(_.flatten).to.be.a('function');
  });

  it('returns an array from 2 nested arrays 1 level in', () => {
    expect(_.flatten([[1, 2], [3, 4, 5]])).to.eql([1, 2, 3, 4, 5]);
  });

  it('returns array from an array of nested arrays to any level depth', () => {
    expect(_.flatten([[1, [2]], [3, [4], 5]])).to.eql([1, 2, 3, 4, 5]);
    expect(_.flatten([1, [[2]], [[[3]]]])).to.eql([1, 2, 3]);
    expect(_.flatten([1, [2, [3, [4, [[5]], [[6]], [[[7]]]]], 8], 9])).to.eql([1,2,3,4,5,6,7,8,9]);
  });

  it('returns an array from a single level if shallow is true', () => {
    expect(_.flatten([1, 2, [3, [4]]])).to.eql([1, 2, 3, 4]);
    expect(_.flatten([1, 2, [3, [4]]], true)).to.eql([1, 2, 3, [4]]);
  });

  it('returns an array from a single level if a non-falsy value is passed as the second argument', () => {
    expect(_.flatten([1, [2, [3]]]), false).to.eql([1, 2, 3]);
    expect(_.flatten([1, [2, [3]]]), 0).to.eql([1, 2, 3]);
    expect(_.flatten([1, [2, [3]]], 'abc')).to.eql([1, 2, [3]]);
    expect(_.flatten([1, [2, [3]]], [2])).to.eql([1, 2, [3]]);
    expect(_.flatten([1, [2, [3]]], { a: 1 })).to.eql([1, 2, [3]]);
  });

  it('returns an empty array if an array or string is not passed as an argument', () => {
    expect(_.flatten(123)).to.eql([]);
    expect(_.flatten({ a: 1, b: 2 })).to.eql([]);
    expect(_.flatten(true)).to.eql([]);
  });
});

///////////////////////////test intersection///////////////////////////////////

describe('#intersection', () => {
  it('is a function', () => {
    expect(_.intersection).to.be.a('function');
  });

  it('should return all items common to each array given',  () => {
    expect(_.intersection([1, 2, 3], [1, 2, 4], [1, 2])).to.eql([1, 2]);
    expect(_.intersection([1, 2, 3], [1, 2, 3, 4], [1, 2])).to.eql([1, 2]);
  });

  it('should return an empty array if there is no common value', () => {
    expect(_.intersection([1, 2, 3], [4, 5, 6], [7, 8, 9])).to.eql([]);
    expect(_.intersection(['a', 'b'], ['c', 'd', 'e'], ['f'])).to.eql([]);
  });

  it('should return an array of matching characters in a string', () => {
    expect(_.intersection('world')).to.eql(['w', 'o', 'r', 'l', 'd']);
    expect(_.intersection('hello', 'world')).to.eql(['l', 'o']);
  });

  it('will only return repeated values once in an array or string', () => {
    expect(_.intersection([1, 2, 1, 2])).to.eql([1, 2]);
    expect(_.intersection('hello')).to.eql(['h','e','l','o']);
  });

  it('returns an empty array if an array or string is not passed as an argument', () => {
    expect(_.intersection()).to.eql([]);
    expect(_.intersection(123)).to.eql([]);
    expect(_.intersection({ a: 1, b: 2 })).to.eql([]);
    expect(_.intersection(true)).to.eql([]);
    expect(_.intersection(123, 123)).to.eql([]);
    expect(_.intersection({ a: 1, b: 2 }, { a: 1 })).to.eql([]);
    expect(_.intersection(true, true)).to.eql([]);
  });
});

///////////////////////////test difference///////////////////////////////////
 
describe('#difference', () => {

  it('should be a function', () => {
    expect(_.difference).to.be.a('function');
  });

  it('should return a blank array when given an invalid data type', () => {
    expect(_.difference(123)).to.eql([]);
    expect(_.difference(true)).to.eql([]);
    expect(_.difference(null)).to.eql([]);
    expect(_.difference(undefined)).to.eql([]);
  });

  it('should return any values from the first array that are not present in any other arrays given', () => {
    expect(_.difference([1, 2, 3, 4, 5], [5, 2, 10])).to.eql([1, 3, 4]);
    expect(_.difference([1, 2, 3, 4, 5], [5, 2, 10], [3, 11, 5])).to.eql([1, 4]);
  });

  it('should return an empty array if there are no unique values contained in the first array', () => {
    expect(_.difference([1, 2, 3], [1, 2, 3])).to.eql([]);
    expect(_.difference([1, 2, 3, 4], [1, 2], [3, 4])).to.eql([]);
    expect(_.difference(['a', 'b', 'c'], ['a', 'b', 'c'])).to.eql([]);
  });

  it('should return a split string when given a string instead of an array', () => {
    expect(_.difference('hello')).to.eql(['h','e','l','l', 'o']);

    expect(_.difference('one', 'two', 'three')).to.eql(['o', 'n', 'e']);
  });

  it('should return any unique values from the first array/object when given a mix of arrays/objects', () => {
    expect(_.difference([1, 2, 3], [101, 2, 1, 10], { a: 6, b: 2, c: 35 })).to.eql([3]);
    expect(_.difference({ a: 6, b: 2, c: 35 }, [1, 2, 3], [101, 2, 1, 10])).to.eql([6, 35]);
  });
});

/////////////////////////test memoize///////////////////////////////////////

describe('#memoize',() => {
  it('is a function', () => {
    expect(_.memoize).to.be.a('function');
  });

  it('returns a function', () => {
    expect(_.memoize(() => {})).to.be.a('function');
    expect(_.memoize(123)).to.be.a('function');
  });

  it('should return the same value as original function', () => {
    const dble = n => 2 * n;
    const memDble = _.memoize(dble);
    expect(memDble(1)).to.equal(memDble(1));
  });

  it('should call the function only once for multiple calls with the same argument', () => {
    const dble = n => 2 * n;
    const spy = sinon.spy(dble);
    const memDble = _.memoize(spy);
    memDble(1);
    memDble(1);
    memDble(1);
    expect(spy.callCount).to.equal(1);
  });

  it('should call the function multiple times with different arguments', () => {
    const double = n => 2 * n;
    const spy = sinon.spy(double);
    const memDble = _.memoize(spy);
    memDble(1);
    memDble(2);
    memDble(3);
    expect(spy.callCount).to.equal(3);
  });

  it('has a cache property which stores the cache object', () => {
    const dble = n => 2 * n;
    const memDble = _.memoize(dble);
    memDble(2);
    expect(memDble.cache).to.eql({ 2: 4 });
  });

  it('has a hash as a second argument to work out the hash key for storing', () => {
    const iteratee = n => n * 2;
    const hash = n => `num${n}`;
    const test = _.memoize(iteratee, hash);
    test(2);
    expect(test.cache).to.eql({ num2: 4 });
  });

});


/////////////////////////test delay/////////////////////////////////////////

describe('#delay', () => {

  it('is a function', () =>  {
    expect(_.delay).to.be.a('function');
  });
  
  let clock;
  before( () => { clock = sinon.useFakeTimers(); });
  after( () => { clock.restore(); });
  
  it('delays invocation of callback for specified period', () => {
    let callback = sinon.spy();
    let wait = 300;

    _.delay(callback, wait);

    clock.tick(1);
    expect(callback.callCount).to.equal(0);
    expect(callback.notCalled).to.equal(true);
    expect(callback.called).to.equal(false);

    clock.tick(300);
    expect(callback.callCount).to.equal(1);
    expect(callback.notCalled).to.equal(false);
    expect(callback.called).to.equal(true);

    clock.tick(301);
    expect(callback.callCount).to.equal(1);
    expect(callback.notCalled).to.equal(false);
    expect(callback.called).to.equal(true);
  });

  it('returns undefined if no arguments passed to function', () => {
    let result = undefined;
    expect(_.delay()).to.equal(result);
  });

  it('returns undefined if first argument is not a function', function () {
    let result = undefined;
    let wait = 0;


    let func = 123;
    expect(_.delay(func, wait)).to.equal(result);

    func = 123.45;
    expect(_.delay(func, wait)).to.equal(result);
  });
});





