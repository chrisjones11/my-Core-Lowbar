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
  
///////////////////////////test indexOf//////////////////////////////////////////////
  
describe('#indexOf', function(){
  it('is a function', function() {
    expect(_.indexOf).to.be.a('function');
  });

  it('returns index of single element array', function() {
    expect(_.indexOf([1],1)).to.equal(0);
  });
    
  it('returns -1 if value not present', function() {
    expect(_.indexOf([2,4,6],5)).to.equal(-1);
  });

  it('returns index of multi element array', function() {
    expect(_.indexOf([2,4,6],4)).to.equal(1);
  });

  it('returns index positon of element with multiple of that element in array with start position given', function() {
    expect(_.indexOf([2,3,6,7,4,6,6,4],4,3)).to.equal(4);
    expect(_.indexOf([2,4,6,7,4,6,6,4],4,3)).to.equal(4);
  });
});

///////////////////////////test filter//////////////////////////////////////////////

describe('#filter', function() {
  it('is a function', function() {
    expect(_.reject).to.be.a('function');
  });

  it('returns an empty array if array or object is not passed in', function() {
    expect(_.filter(12345)).to.eql([]);
    expect(_.filter(true)).to.eql([]);
  });

  it('returns a new array with all truthy values if no second argument', function () {
    
    expect(_.filter([1,2,3,4,false])).to.eql([1,2,3,4]);
    expect(_.filter({'a':1,'b':2,'c':true,'d':false})).to.eql([1,2,true]);
    expect(_.filter({'a':1,'b':2,'c':'','d':false})).to.eql([1,2]);
    expect(_.filter({'a':1,'b':2,'c':'hello','d':0})).to.eql([1,2,'hello']);
  });

  it('returns a new array with all items divisible by 2 when passed and object or an array', function () {
    const divide = (num) => {
      if (num % 2 === 0) return true;
    };
    expect(_.filter([1,2,3,4,5,6,7,8],divide)).to.eql([2,4,6,8]);
    expect(_.filter({'a':1,'b':2,'c':3,'d':4},divide)).to.eql([2,4]);
  });

  it('returns a new array with all items that pass test', function () {
    const dotrue = () => true;
    expect(_.filter([1,2,3,4,5,6,7,8],dotrue)).to.eql([1,2,3,4,5,6,7,8]);
  });

  it('when first arg is an Array return true if spy.firstCall.calledWithExactly is equal to expected', function() {
    const spy = sinon.spy();
    let result = true;
    _.each([1,2,3,4,5], spy);      
    expect(spy.firstCall.calledWithExactly(1,0,[1,2,3,4,5])).to.equal(result);
    expect(spy.lastCall.calledWithExactly(5,4,[1,2,3,4,5])).to.equal(result);
  });
});

///////////////////////////test reject//////////////////////////////////////////////

describe('#reject', function() {
  it('is a function', function() {
    expect(_.reject).to.be.a('function');
  });

  it('returns an empty array if array or object is not passed in', function() {
    expect(_.reject(12345)).to.eql([]);
    expect(_.reject(true)).to.eql([]);
  });

  it('returns a new array with all truthy values if no second argument', function () {
    
    expect(_.reject([1,2,3,4,false])).to.eql([false]);
    expect(_.reject({'a':1,'b':2,'c':true,'d':false})).to.eql([false]);
    expect(_.reject({'a':1,'b':2,'c':'','d':false})).to.eql(['',false]);
    expect(_.reject({'a':1,'b':2,'c':'hello','d':0})).to.eql([0]);
  });

  it('returns a new array with all items divisible by 2 when passed and object or an array', function () {
    const divide = (num) => {
      if (num % 2 === 0) return true;
    };
    expect(_.reject([1,2,3,4,5,6,7,8],divide)).to.eql([1,3,5,7]);
    expect(_.reject({'a':1,'b':2,'c':3,'d':4},divide)).to.eql([1,3]);
  });

  it('returns a new array with all items that pass test', function () {
    const dotrue = () => true;
    expect(_.reject([1,2,3,4,5,6,7,8],dotrue)).to.eql([]);
  });

  it('when first arg is an Array return true if spy.firstCall.calledWithExactly is equal to expected', function() {
    const spy = sinon.spy();
    let result = true;
    _.each([1,2,3,4,5], spy);      
    expect(spy.firstCall.calledWithExactly(1,0,[1,2,3,4,5])).to.equal(result);
    expect(spy.lastCall.calledWithExactly(5,4,[1,2,3,4,5])).to.equal(result);
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
    expect(_.uniq('hello')).to.eql(['h','e','l','o']);
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
    expect(_.map('hello', (num) => num )).to.eql(['h','e','l','l','o']);
  });
});

///////////////////////////test contains//////////////////////////////////////////////

describe('#contains', () => {

  it('is a function', () => {
    expect(_.contains).to.be.a('function');
  });

  it('is return a boolean', () => {
    expect(_.contains([1,2],2)).to.be.a('boolean');
  });

  it('returns true if array contains second argument', () => {
    expect(_.contains([1,2,3],2)).to.be.true;
  });

  it('returns false if array doesnt contain second argument', () => {
    expect(_.contains([1,2,3],6)).to.be.false;
  });

  it('searches for the value starting from the position of the third argument', () => {
    expect(_.contains([1,2,3,4,5],1,1)).to.be.false;
    expect(_.contains([1,2,3,4,5,1],1,1)).to.be.true;
  });

  it('returns true if object contains second argument', () => {
    expect(_.contains({a:1,b:2,c:3},3)).to.be.true;
  });

  it('returns false if object doesnt contain second argument', () => {
    expect(_.contains({a:1,b:2,c:3},6)).to.be.false;
  });

  it('searches for the value starting from the position of the third argument with an object', () => {
    expect(_.contains({a:1,b:2,c:3,d:4},1,1)).to.be.false;
    expect(_.contains({a:1,b:2,c:3,d:1},1,1)).to.be.true;
  });

  it('returns true if string contains second argument', () => {
    expect(_.contains('hello','e')).to.be.true;
  });

  it('returns false if string doesnt contain second argument', () => {
    expect(_.contains('hello','p')).to.be.false;
  });
});

///////////////////////////test pluck//////////////////////////////////////////////

