const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
  'use strict';

  it('is an object', () => {
    expect(_).to.be.an('object');
  });
});

///////////////////////////test identity//////////////////////////////////////////////

describe('#identity', function () {
  it('is a function', () => {
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
  it('is a function', () => {
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
  it('is a function', () => {
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
    expect(_.first(1, 1)).to.eql([]);
    expect(_.first(true, false)).to.eql([]);
    expect(_.first({ 1: 'a', 2: 'b' }, 2)).to.eql([]);
  });
});

///////////////////////////test last//////////////////////////////////////////////

describe('#last', function () {
  it('is a function', () => {
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
    expect(_.last(1, 1)).to.eql([]);
    expect(_.last(true, false)).to.eql([]);
    expect(_.last({ 1: 'a', 2: 'b' }, 2)).to.eql([]);
  });

  it('if first arg is string or array and second arg does not equate to a number return whole of array.', () => {
    expect(_.last([1, 2, 3, 4, 5], 's')).to.eql([1, 2, 3, 4, 5]);
    expect(_.last('hello', 's')).to.eql(['h', 'e', 'l', 'l', 'o']);
  });
});

///////////////////////////test each//////////////////////////////////////////////

describe('#each', function () {
  it('is a function', () => {
    expect(_.each).to.be.a('function');
  });

  it('when first arg is an Array return true if spy callCount is equal to expected', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each([1, 2, 3, 4, 5], spy);
    expect(spy.callCount).to.equal(result);
  });

  it('when first arg is an Array return true if spy.firstCall.calledWithExactly is equal to expected', () => {
    const spy = sinon.spy();
    let result = true;
    _.each([1, 2, 3, 4, 5], spy);
    expect(spy.firstCall.calledWithExactly(1, 0, [1, 2, 3, 4, 5])).to.equal(result);
    expect(spy.lastCall.calledWithExactly(5, 4, [1, 2, 3, 4, 5])).to.equal(result);
  });

  it('when first arg is an object return true if spy callCount is equal to expected', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each({ a: 1, b: 2, c: 3, d: 4, e: 5 }, spy);
    expect(spy.callCount).to.equal(result);
  });

  it('when first arg is an Array return true if spy.firstCall.calledWithExactly is equal to expected', () => {
    const spy = sinon.spy();
    let result = true;
    _.each({ a: 1, b: 2, c: 3, d: 4, e: 5 }, spy);
    expect(spy.firstCall.calledWithExactly(1, 'a', { a: 1, b: 2, c: 3, d: 4, e: 5 })).to.equal(result);
    expect(spy.lastCall.calledWithExactly(5, 'e', { a: 1, b: 2, c: 3, d: 4, e: 5 })).to.equal(result);
  });
});

///////////////////////////test indexOf//////////////////////////////////////////////

describe('#indexOf', function () {
  it('is a function', () => {
    expect(_.indexOf).to.be.a('function');
  });

  it('returns index of single element array', () => {
    expect(_.indexOf([1], 1)).to.equal(0);
  });

  it('returns -1 if value not present', () => {
    expect(_.indexOf([2, 4, 6], 5)).to.equal(-1);
  });

  it('returns index of multi element array', () => {
    expect(_.indexOf([2, 4, 6], 4)).to.equal(1);
  });

  it('returns index positon of element with start position given', () => {
    expect(_.indexOf([1, 2, 3, 4, 5, 6, 7, 8], 6, 2)).to.equal(5);
    expect(_.indexOf([8, 2, 3, 4, 5, 6, 7, 8], 8, 2)).to.equal(7);
  });

  it('returns index positon of element with multiple of that element in an unsorted array with start position given', () => {
    expect(_.indexOf([3, 4, 3, 3, 5, 6, 6, 8], 4, 4)).to.equal(-1);
    expect(_.indexOf([3, 4, 3, 3, 5, 6, 4, 8], 4, 4)).to.eql(6);
  });

  it('returns index position of element through a binary search if array is sorted', () => {
    expect(_.indexOf([1, 2, 3, 4, 5, 6, 7, 8], 2, true)).to.equal(1);
    expect(_.indexOf([1, 2, 3, 4, 5, 6, 7, 8], 4, true)).to.equal(3);
  });
});

///////////////////////////test filter//////////////////////////////////////////////

describe('#filter', function () {
  it('is a function', function () {
    expect(_.reject).to.be.a('function');
  });

  it('returns an empty array if array or object is not passed in', function () {
    expect(_.filter(12345)).to.eql([]);
    expect(_.filter(true)).to.eql([]);
  });

  it('returns a new array with all truthy values if no second argument', function () {

    expect(_.filter([1, 2, 3, 4, false])).to.eql([1, 2, 3, 4]);
    expect(_.filter({ 'a': 1, 'b': 2, 'c': true, 'd': false })).to.eql([1, 2, true]);
    expect(_.filter({ 'a': 1, 'b': 2, 'c': '', 'd': false })).to.eql([1, 2]);
    expect(_.filter({ 'a': 1, 'b': 2, 'c': 'hello', 'd': 0 })).to.eql([1, 2, 'hello']);
  });

  it('returns a new array with all items divisible by 2 when passed and object or an array', function () {
    const divide = (num) => {
      if (num % 2 === 0) return true;
    };
    expect(_.filter([1, 2, 3, 4, 5, 6, 7, 8], divide)).to.eql([2, 4, 6, 8]);
    expect(_.filter({ 'a': 1, 'b': 2, 'c': 3, 'd': 4 }, divide)).to.eql([2, 4]);
  });

  it('returns a new array with all items that pass test', function () {
    const dotrue = () => true;
    expect(_.filter([1, 2, 3, 4, 5, 6, 7, 8], dotrue)).to.eql([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('when first arg is an Array return true if spy.firstCall.calledWithExactly is equal to expected', function () {
    const spy = sinon.spy();
    let result = true;
    _.each([1, 2, 3, 4, 5], spy);
    expect(spy.firstCall.calledWithExactly(1, 0, [1, 2, 3, 4, 5])).to.equal(result);
    expect(spy.lastCall.calledWithExactly(5, 4, [1, 2, 3, 4, 5])).to.equal(result);
  });
});

///////////////////////////test reject//////////////////////////////////////////////

describe('#reject', function () {
  it('is a function', function () {
    expect(_.reject).to.be.a('function');
  });

  it('returns an empty array if array or object is not passed in', function () {
    expect(_.reject(12345)).to.eql([]);
    expect(_.reject(true)).to.eql([]);
  });

  it('returns a new array with all truthy values if no second argument', function () {

    expect(_.reject([1, 2, 3, 4, false])).to.eql([false]);
    expect(_.reject({ 'a': 1, 'b': 2, 'c': true, 'd': false })).to.eql([false]);
    expect(_.reject({ 'a': 1, 'b': 2, 'c': '', 'd': false })).to.eql(['', false]);
    expect(_.reject({ 'a': 1, 'b': 2, 'c': 'hello', 'd': 0 })).to.eql([0]);
  });

  it('returns a new array with all items divisible by 2 when passed and object or an array', function () {
    const divide = (num) => {
      if (num % 2 === 0) return true;
    };
    expect(_.reject([1, 2, 3, 4, 5, 6, 7, 8], divide)).to.eql([1, 3, 5, 7]);
    expect(_.reject({ 'a': 1, 'b': 2, 'c': 3, 'd': 4 }, divide)).to.eql([1, 3]);
  });

  it('returns a new array with all items that pass test', function () {
    const dotrue = () => true;
    expect(_.reject([1, 2, 3, 4, 5, 6, 7, 8], dotrue)).to.eql([]);
  });

  it('when first arg is an Array return true if spy.firstCall.calledWithExactly is equal to expected', function () {
    const spy = sinon.spy();
    let result = true;
    _.each([1, 2, 3, 4, 5], spy);
    expect(spy.firstCall.calledWithExactly(1, 0, [1, 2, 3, 4, 5])).to.equal(result);
    expect(spy.lastCall.calledWithExactly(5, 4, [1, 2, 3, 4, 5])).to.equal(result);
  });
});

///////////////////////////test uniq//////////////////////////////////////////////

describe('#uniq', () => {
  it('is a function', () => {
    expect(_.uniq).to.be.a('function');
  });

  it('returns an empty array for invalid arguments', () => {
    expect(_.uniq({})).to.eql([]);
    expect(_.uniq(4)).to.eql([]);
  });

  it('returns an array with only 1st occurence of each value when passed an array', () => {
    expect(_.uniq([1, 2, 2, 3, 3, 1, 4])).to.eql([1, 2, 3, 4]);
    expect(_.uniq([1, 2, '2', 3, 3, '2', 1, 4])).to.eql([1, 2, '2', 3, 4]);
    expect(_.uniq([1, 2, [2, 3], 3, 1, 4])).to.eql([1, 2, [2, 3], 3, 4]);
  });

  it('returns an array with only 1st occurence of each value passed a string', () => {
    expect(_.uniq('hello')).to.eql(['h', 'e', 'l', 'o']);
  });
});

///////////////////////////test map//////////////////////////////////////////////

describe('#map', () => {
  it('is a function', () => {
    expect(_.map).to.be.a('function');
  });

  it('return an empty array if the argument is not an array', () => {
    expect(_.map(5)).to.eql([]);
    expect(_.map(true)).to.eql([]);
    expect(_.map(undefined)).to.eql([]);
  });

  it('Produces a new array of values by mapping each value in list through a transformation function (iteratee)', () => {
    expect(_.map([1, 2, 3], (num) => num * 3)).to.eql([3, 6, 9]);
  });

  it('works for nested arrays', () => {
    expect(_.map([[1, 2, 3], [4, 5, 6]], (num) => num * 3)).to.eql([[3, 6, 9], [12, 15, 18]]);
  });

  it('if it\'s and objecct, it returns an array with the resulted values', () => {
    expect(_.map({ one: 1, two: 2, three: 3 }, (num) => num * 3)).to.eql([3, 6, 9]);
  });

  it('if it\'s string, it returns an array with the resulted values', () => {
    expect(_.map('hello', (num) => num)).to.eql(['h', 'e', 'l', 'l', 'o']);
  });
});

///////////////////////////test contains//////////////////////////////////////////////

describe('#contains', () => {

  it('is a function', () => {
    expect(_.contains).to.be.a('function');
  });

  it('is return a boolean', () => {
    expect(_.contains([1, 2], 2)).to.be.a('boolean');
  });

  it('returns true if array contains second argument', () => {
    expect(_.contains([1, 2, 3], 2)).to.be.true;
  });

  it('returns false if array doesnt contain second argument', () => {
    expect(_.contains([1, 2, 3], 6)).to.be.false;
  });

  it('searches for the value starting from the position of the third argument', () => {
    expect(_.contains([1, 2, 3, 4, 5], 1, 1)).to.be.false;
    expect(_.contains([1, 2, 3, 4, 5, 1], 1, 1)).to.be.true;
  });

  it('returns true if object contains second argument', () => {
    expect(_.contains({ a: 1, b: 2, c: 3 }, 3)).to.be.true;
  });

  it('returns false if object doesnt contain second argument', () => {
    expect(_.contains({ a: 1, b: 2, c: 3 }, 6)).to.be.false;
  });

  it('searches for the value starting from the position of the third argument with an object', () => {
    expect(_.contains({ a: 1, b: 2, c: 3, d: 4 }, 1, 1)).to.be.false;
    expect(_.contains({ a: 1, b: 2, c: 3, d: 1 }, 1, 1)).to.be.true;
  });

  it('returns true if string contains second argument', () => {
    expect(_.contains('hello', 'e')).to.be.true;
  });

  it('returns false if string doesnt contain second argument', () => {
    expect(_.contains('hello', 'p')).to.be.false;
  });
});

///////////////////////////test pluck//////////////////////////////////////////////

describe('#pluck', () => {

  it('is a function', () => {
    expect(_.pluck).to.be.a('function');
  });

  it('is returns empty array if first argument is a number or boolean', () => {
    expect(_.pluck(true, 'a')).to.eql([]);
    expect(_.pluck(59, 'a')).to.eql([]);
  });

  it('is returns array of values where the second argument matches objects keys', () => {
    var input = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'chris', age: 60 }];
    expect(_.pluck(input, 'name')).to.eql(['moe', 'larry', 'chris']);
  });

  it('is returns array of values where the second argument matches arrays or string index', () => {
    var input = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    expect(_.pluck(input, 0)).to.eql([1, 1, 1]);
    expect(_.pluck(input, 2)).to.eql([3, 3, 3]);
    expect(_.pluck('hello', 0)).to.eql(['h', 'e', 'l', 'l', 'o']);
  });

  it('if second arg doesnt match a value in the input push undefined', () => {
    var input = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { age: 60 }];
    expect(_.pluck(input, 'name')).to.eql(['moe', 'larry', undefined]);
    expect(_.pluck('hello', 0)).to.eql(['h', 'e', 'l', 'l', 'o']);
  });

  it('if second arg doesnt match a values key or index in the input push undefined', () => {
    expect(_.pluck('hello', 'h')).to.eql([undefined, undefined, undefined, undefined, undefined]);
  });
});

///////////////////////////test reduce//////////////////////////////////////////////

describe('#reduce', () => {

  let sum = (acc, item) => acc + item;

  it('is a function', () => {
    expect(_.reduce).to.be.a('function');
  });

  it('returns correct reduced value on an array', () => {
    expect(_.reduce([1, 2, 3], sum, 0)).to.equal(6);
    expect(_.reduce([1, 2, 3], sum, 2)).to.equal(8);
  });

  it('returns correct reduced value on an object', () => {
    expect(_.reduce({ a: 1, b: 2, c: 3 }, sum, 0)).to.equal(6);
    expect(_.reduce({ a: 1, b: 2, c: 3 }, sum, 2)).to.equal(8);
  });

  it('returns correct reduced value on an string', () => {
    let addh = (acc, item) => {
      return acc + 'h' + item;
    };
    expect(_.reduce('abcd', addh)).to.equal('ahbhchd');
  });

  it('uses the first element of the array as the accumulator if one isnt passed', () => {
    expect(_.reduce([1, 2, 3], sum)).to.equal(6);
  });

  it('uses the first element of the object as the accumulator if one isnt passed ', () => {
    expect(_.reduce({ a: 1, b: 2, c: 3 }, sum)).to.equal(6);
  });

  it('works if an array is passed as a accumulator ', () => {
    let add1 = (acc, item) => {
      acc.push(item + 1);
      return acc;
    };
    expect(_.reduce([1, 2, 3, 4], add1, [])).to.eql([2, 3, 4, 5]);
  });

  it('returns new istance of array so array passed in is untouched ', () => {
    let list = [1, 2, 3];
    _.reduce(list, sum);
    expect(list).to.eql([1, 2, 3]);
  });

  it('returns undefined if empty array is passed as first argument', () => {
    expect(_.reduce([], sum)).to.equal(undefined);
  });

  it('when first arg is an Array return true if spy.firstCall.calledWithExactly is equal to expected', () => {
    const spy = sinon.spy();
    let result = true;
    _.reduce([1, 2, 3, 4, 5], spy);
    expect(spy.firstCall.calledWithExactly(1, 2, 1, [1, 2, 3, 4, 5])).to.equal(result);

  });

  it('when first arg is an Array return true if spy callCount is equal to expected', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each([1, 2, 3, 4, 5], spy);
    expect(spy.callCount).to.equal(result);
  });



});

///////////////////////////test every//////////////////////////////////////////////

describe('#every', () => {

  let pred = (item) => {
    if (item % 2 === 0) return true;
  };

  it('is a function', () => {
    expect(_.every);
  });

  it('returns true if every element in the array, object or string pass the pred test', () => {
    expect(_.every([2, 4, 6], pred)).to.be.true;
    expect(_.every('246', pred)).to.be.true;
    expect(_.every({ a: 2, b: 4, c: 6 }, pred)).to.be.true;
  });

  it('returns false if any element in the array, object or string fail the pred test', () => {
    expect(_.every([2, 5, 6], pred)).to.be.false;
    expect(_.every('256', pred)).to.be.false;
    expect(_.every({ a: 2, b: 5, c: 6 }, pred)).to.be.false;
  });

  it('returns true if any second arg is undefined', () => {
    expect(_.every({ a: 2, b: 4, c: 5 })).to.be.true;
    expect(_.every([2, 4, 6])).to.be.true;
    expect(_.every('hello')).to.be.true;
    expect(_.every(true)).to.be.true;
    expect(_.every(false)).to.be.true;
    expect(_.every(-1)).to.be.true;
  });

  it('returns false if second arg is not a function', () => {
    expect(_.every([2, 4, 6], { a: 2, b: 4, c: 5 })).to.be.false;
    expect(_.every([2, 4, 6], [2, 4, 6])).to.be.false;
    expect(_.every([2, 4, 6], 'hello')).to.be.false;
    expect(_.every([2, 4, 6], true)).to.be.false;
    expect(_.every([2, 4, 6], false)).to.be.false;
    expect(_.every([2, 4, 6], -1)).to.be.false;
  });

  it('second argument is run once for every value in the array', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each([1, 2, 3, 4, 5], spy);
    expect(spy.callCount).to.equal(result);
  });

  it('second argument is run once for every value in the object', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each({ a: 2, b: 4, c: 5, d: 6, e: 8 }, spy);
    expect(spy.callCount).to.equal(result);
  });

  it('second argument is run once for every value in the string', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each('hello', spy);
    expect(spy.callCount).to.equal(result);
  });

});

///////////////////////////test some//////////////////////////////////////////////

describe('#some', () => {

  let pred = (item) => {
    if (item % 2 === 0) return true;
  };

  it('is a function', () => {
    expect(_.some);
  });

  it('returns true if some element in the array, object or string pass the pred test', () => {
    expect(_.some([1, 5, 6], pred)).to.be.true;
    expect(_.some('136', pred)).to.be.true;
    expect(_.some({ a: 1, b: 3, c: 6 }, pred)).to.be.true;
  });

  it('returns false if all elements in the array, object or string fail the pred test', () => {
    expect(_.some([1, 5, 7], pred)).to.be.false;
    expect(_.some('135', pred)).to.be.false;
    expect(_.some({ a: 1, b: 5, c: 7 }, pred)).to.be.false;
  });

  it('returns false if second arg is not a function', () => {
    expect(_.some([2, 4, 6], { a: 2, b: 4, c: 5 })).to.be.false;
    expect(_.some([2, 4, 6], [2, 4, 6])).to.be.false;
    expect(_.some([2, 4, 6], 'hello')).to.be.false;
    expect(_.some([2, 4, 6], true)).to.be.false;
    expect(_.some([2, 4, 6], false)).to.be.false;
    expect(_.some([2, 4, 6], -1)).to.be.false;
  });

  it('returns true if second arg is undefined and first argument is a string,array or object with a length of aleast 1', () => {
    expect(_.some({ a: 2, b: 4, c: 5 })).to.be.true;
    expect(_.some([2, 4, 6])).to.be.true;
    expect(_.some('hello')).to.be.true;
  });

  it('returns false if second arg is undefined and first argument is not a string,array or object with a length of aleast 1', () => {
    expect(_.some({})).to.be.false;
    expect(_.some([])).to.be.false;
    expect(_.some('')).to.be.false;
    expect(_.some(true)).to.be.false;
    expect(_.some(false)).to.be.false;
    expect(_.some(-1)).to.be.false;
  });


  it('second argument is run once for every value in the array', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each([1, 2, 3, 4, 5], spy);
    expect(spy.callCount).to.equal(result);
  });

  it('second argument is run once for every value in the object', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each({ a: 2, b: 4, c: 5, d: 6, e: 8 }, spy);
    expect(spy.callCount).to.equal(result);
  });

  it('second argument is run once for every value in the string', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each('hello', spy);
    expect(spy.callCount).to.equal(result);
  });

});

///////////////////////////test extends//////////////////////////////////////////////

describe('_.extend', () => {
  it('is a function', () => {
    expect(_.extend).to.be.a('function');
  });

  it('returns the object that was passed in', () => {
    let obj = { a: 1, b: 2 };
    let result = _.extend(obj);
    expect(result).to.equal(obj);
  });

  it('adds the values of an object to the first empty object', () => {
    expect(_.extend({}, { a: 1 })).to.eql({ a: 1 });
  });

  it('adds the values of an object with more than one key-value pair to the an empty destination object', () => {
    expect(_.extend({},{ a: 1, b: 2, c: 3 })).to.eql({ a: 1, b: 2, c: 3 });
  });

  it('adds the values of an object with aleast a key-value pair to the first object with existing key-value pairs', () => {
    expect(_.extend({ a: 1, b: 2 },{ c: 3 })).to.eql({ a: 1, b: 2, c: 3 });
    expect(_.extend({ a: 1, b: 2, c: 3 },{ d: 4, e: 2, f: 3 })).to.eql({ a: 1, b: 2, c: 3, d: 4, e: 2, f: 3 });
  });


  it('mutates the destination object', () => {
    let mutateObj = { a: 1, b: 2 };
    let obj = { c: 3 };
    expect(_.extend(mutateObj, obj)).to.eql(mutateObj);
  });


  it('returns the original first arg if it cannot be added to', () => {
    expect(_.extend('a','b','c')).to.eql('a');
    expect(_.extend(1,2,3,4)).to.eql(1);
  });

  it('passes nested array or objects to first arg', () => {
    let result = _.extend({ a: 1, b: 2 }, { c: [1, 2, 3] });
    expect(result).to.eql({ a: 1, b: 2, c: [1, 2, 3] });
    let result1 = _.extend({ a: 1, b: 2 }, { c: { d: 4, e: 5 }  });
    expect(result1).to.eql({ a: 1, b: 2, c: { d: 4, e: 5 } });
  });

  it('if first arg is array it gets overriden with it index position', () => {
    expect(_.extend([1, 2, 3, 4, 5],['a', 'b', 'c'],[9])).to.eql([9, 'b', 'c', 4, 5]);
    expect(_.extend([1, 2, 3, 4, 5],'hel',[9])).to.eql([9, 'e', 'l', 4, 5]);
  });

  it('returns the original array if the other args are not arrays or objects or strings', () => {
    expect(_.extend([1, 2, 3, 4, 5])).to.eql([1, 2, 3, 4, 5]);
    expect(_.extend([1, 2, 3, 4, 5],true)).to.eql([1, 2, 3, 4, 5]);
    expect(_.extend([1, 2, 3, 4, 5],123)).to.eql([1, 2, 3, 4, 5]);
  });

  it('properties will override properties of the same name in previous arguments', () => {
    expect(_.extend({ a: 1, b: 2, c: 3 },{ a: 7 },{ c: 8, d: 10 })).to.eql({ a: 7, b: 2, c: 8, d: 10 });
  });

  it('adds the index and value of each array element to an object, if the destination is an object and one source is an array', () => {
    expect(_.extend({ a: 1 },['a', 'b', 'c'],{ b: 2 })).to.eql({ '0': 'a', '1': 'b', '2': 'c', a: 1, b: 2 });
  });
});

/////////////////test defaults//////////////////////////////////////////
 
    