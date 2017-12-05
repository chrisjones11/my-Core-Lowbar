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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test identity////////////////////////////////////

describe('#identity', () => {

  it('is returns a argument exacty how it is passed', () => {
    expect(_.identity('string')).to.equal('string');
    expect(_.identity(false)).to.equal(false);
    expect(_.identity(1)).to.equal(1);
    expect(_.identity([1, 2, 3])).to.eql([1, 2, 3]);
    expect(_.identity({ 1: 'a', 2: 'b' })).to.eql({ 1: 'a', 2: 'b' });
  });
});

////////////////////////////////////////////////////////////////////////////
///////////////////////////test values//////////////////////////////////////

describe('#values', () => {
 
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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test first///////////////////////////////////////
describe('#first', () => {

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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test last////////////////////////////////////////

describe('#last', () => {

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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test each////////////////////////////////////////

describe('#each', () => {

  it('when first arg is an Array return true if spy callCount is equal to expected', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each([1, 2, 3, 4, 5], spy);
    expect(spy.callCount).to.equal(result);
  });

  it('when first arg is an object return true if spy callCount is equal to expected', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each({ a: 1, b: 2, c: 3, d: 4, e: 5 }, spy);
    expect(spy.callCount).to.equal(result);
  });

  it('returns the list argument passed to it', () => {
    expect(_.each(5)).to.equal(5);
    expect(_.each([])).to.eql([]);
    expect(_.each({})).to.eql({});
  });

  it('calls a function the same number of times as the length of the list', () => {
    let countArray = 0;
    const incrementCountArray = () => {
      countArray++;
    };
    _.each([1,2,3,4], incrementCountArray);
    expect(countArray).to.equal(4);

    let countStr = 0;
    const incrementCountStr = () => {
      countStr++;
    };
    _.each('1234', incrementCountStr);
    expect(countStr).to.equal(4);

    let countObj = 0;
    const incrementCountObj = () => {
      countObj++;
    };
    _.each({1:1, 2:2, 3:3, 4:4}, incrementCountObj);
    expect(countObj).to.equal(4);
  });

  it('applies context to the iteratee function if given context argument', () => {
    let arr = ['a','b','c','d'];
    const popContext = function() {
      this.pop();
    };
    _.each([1,2,3], popContext, arr);
    expect(arr.length).to.equal(1);
  });
});

////////////////////////////////////////////////////////////////////////////
///////////////////////////test indexOf/////////////////////////////////////

describe('#indexOf', () => {

  it('returns index of single element array', () => {
    expect(_.indexOf([1], 1)).to.equal(0);
  });

  it('returns -1 if value not present', () => {
    expect(_.indexOf([2, 4, 6], 5)).to.equal(-1);
  });

  it('returns index of multi element array', () => {
    expect(_.indexOf([2, 4, 6], 2)).to.equal(0);
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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test filter//////////////////////////////////////

describe('#filter', () => {

  it('returns an empty array if array or object is not passed in', () => {
    expect(_.filter(12345)).to.eql([]);
    expect(_.filter(true)).to.eql([]);
    expect(_.filter()).to.eql([]);
    expect(_.filter(1)).to.eql([]);
    expect(_.filter('')).to.eql([]);
  });

  it('returns a new array with all truthy values if no second argument', () => {
    expect(_.filter([1, 2, 3, 4, false])).to.eql([1, 2, 3, 4]);
    expect(_.filter({ 'a': 1, 'b': 2, 'c': true, 'd': false })).to.eql([1, 2, true]);
    expect(_.filter({ 'a': 1, 'b': 2, 'c': '', 'd': false })).to.eql([1, 2]);
    expect(_.filter({ 'a': 1, 'b': 2, 'c': 'hello', 'd': 0 })).to.eql([1, 2, 'hello']);
  });

  it('returns a new array with all items divisible by 2 when passed and object or an array', () => {
    const divide = (num) => {
      if (num % 2 === 0) return true;
    };
    expect(_.filter([1, 2, 3, 4, 5, 6, 7, 8], divide)).to.eql([2, 4, 6, 8]);
    expect(_.filter({ 'a': 1, 'b': 2, 'c': 3, 'd': 4 }, divide)).to.eql([2, 4]);
  });

  it('returns a new array with all items that pass test', () => {
    const dotrue = () => true;
    expect(_.filter([1, 2, 3, 4, 5, 6, 7, 8], dotrue)).to.eql([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('can apply context to the predicate function', () => {
    function lessThanThis(item) {
      return item < this;
    }
    expect(_.filter([1,2,3,4,5,6,7,8,9,10], lessThanThis, 5)).to.eql([1,2,3,4]);
  });
});

////////////////////////////////////////////////////////////////////////////
///////////////////////////test reject//////////////////////////////////////
describe('#reject', () => {
 
  it('returns an empty array if array or object is not passed in', () => {
    expect(_.filter(12345)).to.eql([]);
    expect(_.filter(true)).to.eql([]);
    expect(_.filter()).to.eql([]);
    expect(_.filter(1)).to.eql([]);
    expect(_.filter('')).to.eql([]);
  });

  it('returns a new array with all items not divisible by 2 when passed and object or an array', () => {
    const divide = (num) => {
      if (num % 2 === 0) return true;
    };
    expect(_.reject([1, 2, 3, 4, 5, 6, 7, 8], divide)).to.eql([1, 3, 5, 7]);
    expect(_.reject({ 'a': 1, 'b': 2, 'c': 3, 'd': 4 }, divide)).to.eql([1, 3]);
  });

  it('returns a new array with all items that dont pass test', () => {
    const dotrue = () => true;
    expect(_.reject([1, 2, 3, 4, 5, 6, 7, 8], dotrue)).to.eql([]);
  });

  it('can apply context to the function as the third argument', () => {
    let context = ['a', 'b', 'c', 'd', 'e'];
    function lessThanThis(item) {
      return item < this;
    }
    expect(_.reject([2,4,5,6,7,8,9], lessThanThis, 5)).to.eql([5,6,7,8,9]);

    function equalToThis (item, i) {
      return item === this[i];
    }
    expect(_.reject('adcfe', equalToThis, context)).to.eql(['d', 'f']);
  });
});

////////////////////////////////////////////////////////////////////////////
///////////////////////////test uniq////////////////////////////////////////
describe('#uniq', () => {
  
  it('returns an empty array for invalid arguments', () => {
    expect(_.uniq({})).to.eql([]);
    expect(_.uniq(4)).to.eql([]);
    expect(_.uniq()).to.eql([]);
    expect(_.uniq(554545)).to.eql([]);
    expect(_.uniq(true)).to.eql([]);
  });
  
  it('returns an array of 1 value when given a list of the same the value repeated', () => {
    expect(_.uniq('aaaaaaaaa')).to.eql(['a']);
    expect(_.uniq(['a','a','a'])).to.eql(['a']);
    expect(_.uniq([1,1,1,1,1,1])).to.eql([1]);
  });

  it('returns an array with only 1st occurence of each value when passed an array', () => {
    expect(_.uniq([1, 2, 2, 3, 3, 1, 4])).to.eql([1, 2, 3, 4]);
    expect(_.uniq([1, 2, '2', 3, 3, '2', 1, 4])).to.eql([1, 2, '2', 3, 4]);
    expect(_.uniq([1, 2, [2, 3], 3, 1, 4])).to.eql([1, 2, [2, 3], 3, 4]);
  });

  it('returns an array with only 1st occurence of each value passed a string', () => {
    expect(_.uniq('hello')).to.eql(['h', 'e', 'l', 'o']);
  });

  it('returns an array of unique values based on iteratee argument' , () => {
    expect(_.uniq([2.1, 2.3, 2.4, 3.1, 3.2], false, Math.floor )).to.eql([2.1, 3.1]);
    expect(_.uniq([2.1, 2.3, 2.4, 3.1, 3.2],  Math.floor )).to.eql([2.1, 3.1]);
  });
});

////////////////////////////////////////////////////////////////////////////
///////////////////////////test map/////////////////////////////////////////

describe('#map', () => {

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

  it('returns a mapped verion of the list with a function using context', () => {
    expect(_.map([1,2,3], function(num) {return num * this;}, 5)).to.eql([5,10,15]);
  });
});

////////////////////////////////////////////////////////////////////////////
///////////////////////////test contains////////////////////////////////////

describe('#contains', () => {

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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test pluck///////////////////////////////////////

describe('#pluck', () => {

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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test reduce//////////////////////////////////////

describe('#reduce', () => {

  let sum = (acc, item) => acc + item;

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

  it('when first arg is an Array return true if spy callCount is equal to expected', () => {
    const spy = sinon.spy();
    let result = 5;
    _.each([1, 2, 3, 4, 5], spy);
    expect(spy.callCount).to.equal(result);
  });

  it('can use context in the iteratee', () => {
    expect(_.reduce('abcdefg', function(acc, letter) {
      if (!this[letter]) acc.push(letter);
      return acc;
    }, [], {a: true, b: true, c: true, d: true})).to.eql(['e', 'f' , 'g',]);
  });


});

////////////////////////////////////////////////////////////////////////////
///////////////////////////test every///////////////////////////////////////

describe('#every', () => {

  let pred = (num) => {
    return num % 2 !== 1;
  };

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

  it('can apply context to the predicate', () => {
    function lessThanThis(item) {
      return item < this;
    }
    expect(_.every([1,2,3,4,5], lessThanThis, 9)).to.equal(true);
    expect(_.every([1,2,3,4,5], lessThanThis, 1)).to.equal(false);
    expect(_.every({0:1,1:2,2:3,3:4,4:5}, lessThanThis, 1)).to.equal(false);
  });

});

////////////////////////////////////////////////////////////////////////////
///////////////////////////test some////////////////////////////////////////

describe('#some', () => {

  let pred = (num) => {
    return num % 2 !== 1;
  };

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

  it('can apply context to the function', () => {
    function lessThanThis(item) {
      return item < this;
    }
    expect(_.some([1,2,3,4,5], lessThanThis, -1)).to.equal(false);
    expect(_.some([1,2,3,4,5], lessThanThis, 2)).to.equal(true);
    expect(_.some({a:1, b:2}, lessThanThis, 2)).to.equal(true);
    expect(_.some({a:1, b:2}, lessThanThis, 1)).to.equal(false);
  });

});

////////////////////////////////////////////////////////////////////////////
///////////////////////////test extends/////////////////////////////////////

describe('#extend', () => {

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

////////////////////////////////////////////////////////////////////////////
//////////////////////////test defaults/////////////////////////////////////
 
describe('#defaults', () => {

  it('returns the first argument', () => {

    expect(_.defaults(9876, { number: 5432 })).to.equal(9876);
    expect(_.defaults('pineapple', 'coconut')).to.equal('pineapple');
    expect(_.defaults(true, false)).to.equal(true);
    expect(_.defaults({},{})).to.eql({});
  });

  it('should copy a property if that key is not already in the first object', () => {
    expect(_.defaults({ a: 1 }, { a: 2, b: 2 })).to.eql({ a: 1, b: 2 });
    expect(_.defaults({ a: 1 }, { a: 2, b: 2 },{ a: 2, b: 2, c:3 })).to.eql({ a: 1, b: 2, c:3 });
  });

  it('should copy value of that in the index position if its position is not already in the first array', () => {
    expect(_.defaults([1], [2,2])).to.eql([1,2]);
    expect(_.defaults([1], [2,2],[3,3,3])).to.eql([1,2,3]);
  });

  it('should not copy a property if that key is already in the first object', () => {
    expect(_.defaults({ a: 1}, { a: 2})).to.eql({ a: 1});
    expect(_.defaults({ a: 1, b: 1 }, { a: 2, b: 2 })).to.eql({ a: 1, b: 1 });
  });

  it('should not copy value of that in the index position if position already exists in the first array', () => {
    expect(_.defaults([1,1], [2,2])).to.eql([1,1]);
    expect(_.defaults([1,1,1], [2,2],[3,3,3])).to.eql([1,1,1]);
  });

  it('should not copy a property if that key is already set on the target, even if the value for that key is falsy', () => {
    expect(_.defaults({ a: ''}, { a: 2})).to.eql({ a: ''});
    expect(_.defaults({ a: false, b: NaN }, { a: 2, b: 2 })).to.eql({ a: false, b: NaN });
  });

  it('should not copy value of that in the index position if position already exists in the first array, even if the value for that position is falsy', () => {
    expect(_.defaults([NaN,''], [2,2])).to.eql([NaN,'']);
    expect(_.defaults([null,0,1], [2,2],[3,3,3])).to.eql([null,0,1]);
  });
});

////////////////////////////////////////////////////////////////////////////
///////////////////////////test once////////////////////////////////////////

describe('#once', () => {

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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test negate//////////////////////////////////////

describe( '#negate', () => {
  'use strict';

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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test shuffle/////////////////////////////////////

describe('#shuffle', () => {

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
////////////////////////////////////////////////////////////////////////////
/////////////////////////test invoke////////////////////////////////////////

describe('_.invoke', () => {

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

////////////////////////////////////////////////////////////////////////////
//////////////////////////test sortBy///////////////////////////////////////

describe('#sortBy', () => {
  
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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test zip/////////////////////////////////////////


describe('#zip', () => {

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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test sortedIndex/////////////////////////////////

describe('#sortedIndex', () => {

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

  it('it returns 0 if the value can not be sorted amongst the items in the list', () => {
    expect(_.sortedIndex('abc', 1)).to.equal(0);
    expect(_.sortedIndex([1,2,3], 'a')).to.equal(0);
  });

  it('returns the index at which the object should be inserted into the list',  () => {
    let family = [{ name: 'chris', age: 28 }, { name: 'emily', age: 38 }];
    expect(_.sortedIndex(family, { name: 'rhys', age: 32 }, 'age')).to.equal(1);
  });
  
  it('return the index of where the value should be inserted into the list when given a third arg which sorts the list',  () => {
    expect(_.sortedIndex(['he', 'hen', 'ken', 'holiday'], 'hello', 'length')).to.equal(3);
    expect(_.sortedIndex(['a', 'aa', 'aaa', 'aaa', 'aaaa'], 'aaa', item => item.length)).to.equal(2);
  });

  it('returns the index that a number should be inserted at if the number is provided as the only element in an array', () => {
    expect(_.sortedIndex([10, 20, 30, 40, 50, 60], [30])).to.equal(2);
  });

  it('returns the index that a number should be inserted at if the number is provided as a string', () => {
    expect(_.sortedIndex([10, 20, 30, 40, 50, 60], '30')).to.equal(2);
  });

  it('returns an index based on a iteratee function using context', () => {
    const contextTest = function (item) {
      return this.test(item);
    };
    const context = {test: item => item.length};
    expect(_.sortedIndex(['', 'b', 'cc'], 'b', contextTest, context)).to.equal(1);
  });
});
    
////////////////////////////////////////////////////////////////////////////
///////////////////////////test flatten/////////////////////////////////////

describe('#flatten', () => {
 
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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test intersection////////////////////////////////

describe('#intersection', () => {

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

////////////////////////////////////////////////////////////////////////////
///////////////////////////test difference//////////////////////////////////
 
describe('#difference', () => {

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

////////////////////////////////////////////////////////////////////////////
/////////////////////////test memoize///////////////////////////////////////

describe('#memoize',() => {

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

////////////////////////////////////////////////////////////////////////////
/////////////////////////test delay/////////////////////////////////////////

describe('#delay', () => {

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

////////////////////////////////////////////////////////////////////////////
/////////////////////////test where/////////////////////////////////////////

describe('#where', () => {
 
  it('returns an array from the array containing the properties passed', () => {
    const list = [
      { name: 'chris', gender: 'male'},    
      { name: 'emily', gender: 'female'},
      { name: 'rhys', gender: 'male'}
    ];
    expect(_.where(list, {gender: 'female'})).to.eql([
      { name: 'emily', gender: 'female'}
    ]);
  });

  it('returns an array from the string containing the properties passed', () => {
    expect(_.where('abc', {0: 'a'})).to.eql(['a']);
    expect(_.where('abc', {0: 'b'})).to.eql(['b']);
    expect(_.where('abc', {0: 'c'})).to.eql(['c']);
  });

  it('returns an empty array when not an object or string', () => {
    expect(_.where()).to.eql([]);
    expect(_.where(1)).to.eql([]);
    expect(_.where(true)).to.eql([]);
  });

  it('returns an array when given a string', () => {
    expect(_.where('a')).to.eql(['a']);
    expect(_.where('ab')).to.eql(['a','b']);
  });
});

////////////////////////////////////////////////////////////////////////////
/////////////////////////test throttle//////////////////////////////////////

describe('#throttle', () => {

  let sum = (acc, item) => {
    return acc + item;
  };

  beforeEach(() => {
    this.clock = sinon.useFakeTimers();
    this.spy = sinon.spy(sum);
  });

  afterEach(() => {
    this.clock.restore();
  });

  it('it returns a function', () => {
    expect(_.throttle()).to.be.a('function');
    expect(_.throttle(5)).to.be.a('function');
    expect(_.throttle('hello')).to.be.a('function');
  });

  it('returns function that behaves same as the function passed to it', () => {
    const throttleSum = _.throttle(sum);
    expect(throttleSum(1,2)).to.equal(3);
  });

  it('it calls the passed function once every wait period', () => {
    const throttleSpy = _.throttle(this.spy, 100);
    throttleSpy(1,2);
    throttleSpy(1,2);
    throttleSpy(1,2);
    throttleSpy(1,2);
    throttleSpy(1,2);
    throttleSpy(1,2);
    expect(this.spy.callCount).to.equal(1);
    this.clock.tick(101);
    expect(this.spy.callCount).to.equal(2);
  });

  it('calls function after the wait period when called multiple times if given option as true', () => {
    const throttleSpy = _.throttle(this.spy,100, {leading: true});
    throttleSpy(1,2);
    this.clock.tick(95);
    throttleSpy(1,2);
    throttleSpy(1,2);
    throttleSpy(1,2);
    expect(this.spy.callCount).to.equal(1);
    this.clock.tick(120);
    expect(this.spy.callCount).to.equal(2);
  });

  it('calls function once at the beginning of the next wait period when called multiple times if given option as false', () => {
    const throttleSpy = _.throttle(this.spy, 100, {leading: false});
    throttleSpy(1,2);
    throttleSpy(1,2);
    throttleSpy(1,2);
    expect(this.spy.callCount).to.equal(0);
    this.clock.tick(120);
    expect(this.spy.callCount).to.equal(1);
  });
});

////////////////////////////////////////////////////////////////////////////
/////////////////////////test partial///////////////////////////////////////

describe('#partial', () => {

  let sum = (acc, item) => {
    return acc + item;
  };

  it('it returns a function', () => {
    expect(_.partial()).to.be.a('function');
  });

  it('it returns a function that behaves like the function passed to it', () => {
    const partialSum = _.partial(sum);
    expect(partialSum(1,2)).to.equal(3);
  });

  it('it returns a function with the arguments partially filled in', () => {
    const sum5 = _.partial(sum, 5);
    const sum4 = _.partial(sum, _, 4);
    const sum4And5 = _.partial(sum, 5, 4);
    expect(sum5(4)).to.equal(9);
    expect(sum4(5)).to.equal(9);
    expect(sum4And5(9,9)).to.equal(9);
  });
  
  it('it does not change the "this" value of the function', () => {
    const context = {greeting: 'hello'};
    let hello = function(str)  {
      return `${this.greeting} ${str}`;
    };
    hello = hello.bind(context);
    const partialHello = _.partial(hello);
    expect(partialHello('olie')).to.equal('hello olie');
  });
});





