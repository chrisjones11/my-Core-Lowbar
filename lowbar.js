const {binarySearch, binaryIndex} = require ('./utils');
const _ = {};

///////////////////////////////////////////////////////////////////////
///////////////////// identity/////////////////////////////////////////

_.identity = arg => arg;

///////////////////////////////////////////////////////////////////////
///////////////////// values///////////////////////////////////////////

_.values = (obj) => {
  if (typeof obj !== 'object' || obj === null) return [];
  else {
    const values = [];
    if (Array.isArray(obj)) return obj;
    for (let key in obj) {
      values.push(obj[key]);
    }
    return values;
  }
};

///////////////////////////////////////////////////////////////////////
///////////////////// first////////////////////////////////////////////

_.first = (list, n) => {
  if (Array.isArray(list) && n === undefined || typeof (list) === 'string' && n === undefined) return list[0];
  if (!Array.isArray(list) && typeof (list) !== 'string' && n === undefined) return undefined;
  if (!Array.isArray(list) && typeof (list) !== 'string' && n !== undefined) return [];
  if (typeof (list) === 'string') return list.split('').slice(0, n);
  return list.slice(0, n);
};

///////////////////////////////////////////////////////////////////////
///////////////////// Last/////////////////////////////////////////////

_.last = (list, n) => {
  if (Array.isArray(list) && n === undefined || typeof (list) === 'string' && n === undefined) return list[list.length - 1];
  if (!Array.isArray(list) && typeof (list) !== 'string' && n === undefined) return undefined;
  if (!Array.isArray(list) && typeof (list) !== 'string' && n !== undefined) return [];
  if (Array.isArray(list) && typeof (n) !== 'number' && typeof (n) !== 'boolean') return list;
  if (typeof (list) === 'string' && typeof (n) !== 'number' && typeof (n) !== 'boolean') return list.split('');
  if (typeof (list) === 'string') return list.split('').slice(list.length - n);
  return list.slice(list.length - n);
};

///////////////////////////////////////////////////////////////////////
//////////////////// each//////////////////////////////////////////////

_.each = (list, iteratee = _.identity , context = this) => {
  let newList = _.values(list);
  if (typeof list === 'string') newList = list;
  for (let i = 0; i < newList.length; i++) {
    iteratee.call(context, newList[i], i);
  }
  return list;
};

///////////////////////////////////////////////////////////////////////
////////////////// indexOf/////////////////////////////////////////////

_.indexOf = (array, value, isSorted) => {

  const loop = (i = 0) => {
    for (i; i < array.length; i++) {
      if (array[i] === value) return i;
    }
    return -1;
  };

  if (!Array.isArray(array) && typeof array !== 'string') return -1;

  if (isSorted === false || isSorted === undefined) return loop();
  
  if (typeof (isSorted) === 'number') return loop (isSorted); 

  if (isSorted) return binarySearch(array, value);
};

///////////////////////////////////////////////////////////////////////
////////////////// filter//////////////////////////////////////////////

_.filter = (list, predicate = _.identity , context = this) => {
  let result = [];
  if (!list || typeof list === 'number') return result;
  _.each(list, function (item, index) {
    if (predicate) {
      if (predicate.call(context, item, index, list)) result.push(item);
    } 
    else result.push(item);
  });
  return result;
};
///////////////////////////////////////////////////////////////////////
////////////////// reject//////////////////////////////////////////////

_.reject = (list, predicate, context = this) => {
  if (predicate) {
    return _.filter.call(null, list, _.negate(predicate), context);
  }
  return [];
};

///////////////////////////////////////////////////////////////////////
/////////////////// uniq///////////////////////////////////////////////


_.uniq = (array, isSorted = false, iteratee = _.identity) => {
  if (typeof isSorted === 'function') {
    iteratee = isSorted;
    isSorted = false;
  }
  const result = [],
    checkIteratee = [];
  _.each.call(null, array, function (item) {
    if (_.indexOf.call(checkIteratee, this, iteratee(item), isSorted) === -1) {
      this.push(iteratee(item));
      result.push(item);
    }
  }, checkIteratee);
  return result;
};


///////////////////////////////////////////////////////////////////////
//////////////////// map///////////////////////////////////////////////

_.map = (list, iteratee = _.identity,  context = this) => {
  let newArray = [];
  let nestedArray = [];
  iteratee = iteratee.bind(context);
  if (typeof (list) === 'string') list = list.split('');


  if (typeof (list) === 'boolean' || typeof (list) === 'number') return [];
  if (Array.isArray(list) || list instanceof Object) {
    _.each(list, (element) => {
      if (Array.isArray(element)) {
        for (var i = 0; i < element.length; i++) {
          nestedArray.push(iteratee(element[i]));
        }
        newArray.push(nestedArray);
        nestedArray = [];
      }
      if (!Array.isArray(element)) {
        newArray.push(iteratee(element));
      }
    });
  }
  return newArray;
};

///////////////////////////////////////////////////////////////////////
/////////////////// contains///////////////////////////////////////////

_.contains = (input, value, fromIndex) => {
  let values = [];
  if (!Array.isArray(input)) {
    _.each(input, (val) => {
      values.push(val);
    });
  }
  else {
    values = input;
  }
  return values.indexOf(value, fromIndex) > -1;
};

///////////////////////////////////////////////////////////////////////
///////////////// pluck////////////////////////////////////////////////

_.pluck = (input, value) => {
  let arr = [];
  if (typeof (input) === 'number' || typeof (input) === 'boolean') return [];
  _.each(input, (val) => {
    arr.push(val[value]);
  });
  return arr;
};

///////////////////////////////////////////////////////////////////////
///////////////// reduce///////////////////////////////////////////////

_.reduce = (list, iteratee  = _.identity, acc, context = this) => {
  let arr;
  let startIndex = 0;
  if (list instanceof Object) {
    arr = _.values(list);
  }

  if (typeof (list) === 'string') {
    arr = list.split('');
  }

  if (acc === undefined) {
    acc = arr[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    acc = iteratee.call(context, acc, arr[i], i, list);
  }
  return acc;
};

///////////////////////////////////////////////////////////////////////
/////////////// every//////////////////////////////////////////////////

_.every = (list, pred, context = this) => {
  let newList = list;
  let resultArr = [];
  if (pred === undefined) return true;
  if (!(pred instanceof Function)) return false;
  pred = pred.bind(context);
  if (typeof list === 'object') newList = _.values(list);
  for (let i = 0; i < newList.length; i++) {
    if (pred(newList[i]) != true) return false;
    else resultArr.push(newList[i]);
  }
  if (resultArr.length === newList.length) return true;
  else return false;
};


///////////////////////////////////////////////////////////////////////
///////////////// some/////////////////////////////////////////////////

_.some = (list, predicate = _.identity, context = this) => {
  let newList = list;
  predicate = predicate.bind(context);
  if (typeof list !== 'string' ) newList = _.values(list);
  for (let i = 0; i < newList.length; i++) {
    if (predicate(newList[i]) != false) return true;
  }
  return false;
};

///////////////////////////////////////////////////////////////////////
///////////////// extends//////////////////////////////////////////////

_.extend = (destination, ...sources) => {
  return _.reduce(sources, (acc, item) => {
    for (let key in item) {
      acc[key] = item[key];
    }
    return acc;
  }, destination);
};

///////////////////////////////////////////////////////////////////////
/////////////////defaults//////////////////////////////////////////////

_.defaults = (object, ...sources) => {
  return _.reduce(sources, (acc, item) => {
    for (let key in item) {
      if (acc[key] === undefined) acc[key] = item[key];
    }
    return acc;
  }, object);
};

///////////////////////////////////////////////////////////////////////
////////////////////once///////////////////////////////////////////////

_.once = (fn) => {
  let firstCall = true;
  let result;

  return function () {
    if (firstCall) {
      firstCall = false;
      result = fn.apply(null, arguments);
    }
    return result;
  };
};

///////////////////////////////////////////////////////////////////////
////////////////////negate/////////////////////////////////////////////

_.negate = (func) => {
  if (typeof func !== 'function') return _.negate;

  return function () {

    return !func.apply(this, arguments);
  };
};

///////////////////////////////////////////////////////////////////////
////////////////////shuffle////////////////////////////////////////////

_.shuffle =  (list) => {
  if (typeof list !== 'object' && typeof list !== 'string') return [];

  let originalList;
  let shuffledList = [];

  if (Array.isArray(list)) {
    originalList = list.slice();
  }
  else if (typeof list === 'string') {
    originalList = list.split('');
  }
  else if (typeof list === 'object' && list !== null) {
    originalList = Object.values(list);
  }

  while (originalList.length > 0) {
    let randomIndex = Math.floor(Math.random() * originalList.length);
    shuffledList.push(originalList[randomIndex]);
    originalList.splice(randomIndex, 1);
  }
  return shuffledList;
};

///////////////////////////////////////////////////////////////////////
////////////////////invoke/////////////////////////////////////////////

_.invoke = (list, method, args) => {
  if (!method) return undefined;
  const result = [];
  if (typeof list === 'object' || typeof list === 'string') {
    _.each(list, (item) => { 
      typeof item[method] === 'function' ? result.push(item[method](args)) : result.push(undefined);
    });
  }
  return result;
};
///////////////////////////////////////////////////////////////////////
////////////////////sortBy/////////////////////////////////////////////

_.sortBy = (list, iteratee = _.identity, context = this) => {
  let newList = list;
  if (typeof newList === 'string') newList = newList.split('');

  else newList = _.values(newList);

  iteratee = iteratee.bind(context);

  return newList.sort((a, b) => iteratee(b) < iteratee(a));
};

///////////////////////////////////////////////////////////////////////
////////////////////zip////////////////////////////////////////////////

_.zip = function () {
  const result = [];
  let longest = 0;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i].length > longest) longest = arguments[i].length;
  }

  for (let j = 0; j < longest; j++) {
    const tempArr = [];
    for (let k = 0; k < arguments.length; k++) {
      tempArr.push(arguments[k][j]);
    }
    result.push(tempArr);
  }
  return result;
};

///////////////////////////////////////////////////////////////////////
/////////////////// sortedIndex////////////////////////////////////////

_.sortedIndex = (list, value, iteratee, context = this) => {
  
  if ( typeof list !== 'string' && !Array.isArray(list)|| value === undefined ) return 0;
 
  if (typeof iteratee === 'string') {
    return binaryIndex(_.map(list, item => item[iteratee]), value[iteratee]);
  }

  if (typeof iteratee === 'function') {
    iteratee = iteratee.bind(context);
    return binaryIndex(_.map(list, item => iteratee(item)), iteratee(value));
  }
  
  else return binaryIndex(list, value);
};

///////////////////////////////////////////////////////////////////////
/////////////////// flatten////////////////////////////////////////////

_.flatten = (array, shallow) => {
  if (!Array.isArray(array) && typeof array !== 'string') return [];

  return _.reduce(array, function (acc, item) {
    if ((!shallow) && Array.isArray(item)) item = _.flatten(item);
    return acc.concat(item);
  }, []);
};

///////////////////////////////////////////////////////////////////////
/////////////////// intersection///////////////////////////////////////

_.intersection = function () {
  let newArrays = [].slice.call(arguments);
  let resultArr = [];

  if (!Array.isArray(newArrays[0]) && typeof newArrays[0] !== 'string') return [];

  _.each(newArrays[0], function (item) {
    let isCommon = true;
    _.each(newArrays, function (arr) {
      if (!_.contains(arr, item)) isCommon = false;
    });
    if (isCommon && !_.contains(resultArr, item)) resultArr.push(item);
  });
  return resultArr;
};

///////////////////////////////////////////////////////////////////////
/////////////////// difference/////////////////////////////////////////

_.difference = function (array) {
  let otherArrays = [].slice.call(arguments, 1);
  let finalArr = [];
  if (typeof array === 'string') return array.split('');
  _.each(array, function (item) {
    let isUnique = true;
    _.each(otherArrays, function (arr) {
      if (_.contains(arr, item)) isUnique = false;
    });
    if (isUnique && !_.contains(finalArr, item)) finalArr.push(item);
  });
  return finalArr;
};

///////////////////////////////////////////////////////////////////////
/////////////////// memoize////////////////////////////////////////////

_.memoize = (fn, hash) => {
  const cache = {};
  const memo = function () {
    const args = hash ? hash.apply(null, arguments) : JSON.stringify(arguments[0]);
    if (!cache[args]) {
      cache[args] = fn.apply(null, arguments);
    }
    return cache[args];
  };
  memo.cache = cache;
  return memo;
};

///////////////////////////////////////////////////////////////////////
/////////////////// delay//////////////////////////////////////////////

_.delay = function (func, wait) {
  
  if (arguments.length === 0 || typeof func !== 'function') return undefined;
  
  let args = [].slice.call(arguments, 2);
  return setTimeout( () => {
    return func.apply(null, args);
  }, wait);
};

///////////////////////////////////////////////////////////////////////
////////////////////// where///////////////////////////////////////////

_.where = (list, props) => {
  
  return _.filter(list, item => {
    let bool = true;
    for (let key in props) {
      if (item[key] !== props[key]) bool = false;
    }
    return bool;
  });
};

///////////////////////////////////////////////////////////////////////
////////////////////// throttle////////////////////////////////////////

_.throttle = (func, wait = 0, options = {leading: true}) => {
  const begin = Date.now();
  let callCount = 0;
  let loadBegin;
  let loadFlag = true;
  const caller = function (...args) {

    if (callCount === 0) {
      loadBegin = Date.now();
      callCount++;
      return options.leading === false ? _.delay(func, wait, ...args) : func(...args);
    }

    if (callCount > 0) {
      if ((options.leading === true || options.trailing === true) && loadFlag) {
        loadFlag = false;
        return _.delay(func, wait - Date.now() - loadBegin, ...args);
      }
    }
    if (Date.now() - begin > wait) {
      callCount = 0;
      loadFlag = true;
    }
  };
  return caller;
};

///////////////////////////////////////////////////////////////////////
////////////////////// partial/////////////////////////////////////////

_.partial = (func, ...partials) => {
  const innerFunction =  (...args) => {
      
    if (partials.length === 0) return func(...args);
    const newArgs = _.map(partials, arg => {
      if (arg === _) return args.shift();
      return arg;
    });
    return func(...newArgs, ...args);
  };
  return innerFunction;
};


module.exports = _;