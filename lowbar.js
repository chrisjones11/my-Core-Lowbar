const _ = {};

//////////////////////identity//////////////////////////////////////////

_.identity = arg => arg;

//////////////////////values///////////////////////////////////////////

_.values = (list) => {
  if (!(list instanceof Object)) return [];
  if (Array.isArray(list)) return list;
  let newArray = [];
  for (let key in list) newArray.push(list[key]);
  return newArray;
};

///////////////////////////first//////////////////////////////////////////////

_.first = (list, n) => {
  if (Array.isArray(list) && n === undefined || typeof (list) === 'string' && n === undefined) return [list[0]];
  if (!Array.isArray(list) && typeof (list) !== 'string' && n === undefined) return undefined;
  if (!Array.isArray(list) && typeof (list) !== 'string' && n !== undefined) return [];
  if (typeof (list) === 'string') return list.split('').slice(0, n);
  return list.slice(0, n);
};

/////////////////////Last/////////////////////////////////////////////

_.last = (list, n) => {
  if (Array.isArray(list) && n === undefined || typeof (list) === 'string' && n === undefined) return [list[list.length - 1]];
  if (!Array.isArray(list) && typeof (list) !== 'string' && n === undefined) return undefined;
  if (!Array.isArray(list) && typeof (list) !== 'string' && n !== undefined) return [];
  if (Array.isArray(list) && typeof (n) !== 'number' && typeof (n) !== 'boolean') return list;
  if (typeof (list) === 'string' && typeof (n) !== 'number' && typeof (n) !== 'boolean') return list.split('');
  if (typeof (list) === 'string') return list.split('').slice(list.length - n);
  return list.slice(list.length - n);
};

/////////////////////each/////////////////////////////////////////////

_.each = (list, fn) => {
  if (Array.isArray(list) || typeof (list) === 'string') {
    for (var i = 0; i < list.length; i++) {
      fn(list[i], i, list);
    }
  }
  else if (list instanceof Object) {
    for (var prop in list) {
      fn(list[prop], prop, list);
    }
  }
};

///////////////////indexOf////////////////////////////////////////////

_.indexOf = (array, value, isSorted) => {

  if (typeof (isSorted) === 'number') {
    for (let i = isSorted; i < array.length; i++) {
      if (array[i] === value) return i;
    }
    return -1;
  }

  if (isSorted) {
    let low = 1, high = array.length;
    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);
      if (array[mid] === value) return mid;
      else if (array[mid] < value) low = mid + 1;
      else high = mid - 1;
    }
  }

  for (let j = 0; j < array.length; j++) {
    if (array[j] === value) return j;
  }
  return -1;
};

/////////////////////filter/////////////////////////////////////////////

_.filter = (list, fn) => {
  if (!fn) fn = _.identity;
  var newArr = [];
  _.each(list, function (value, indexorkey, list) {
    if (fn(value, indexorkey, list)) newArr.push(value);
  });
  return newArr;
};

/////////////////////reject/////////////////////////////////////////////

_.reject = (list, fn) => {
  if (!fn) fn = _.identity;
  var newArr = [];
  _.each(list, function (value, indexorkey, list) {
    if (!fn(value, indexorkey, list)) newArr.push(value);
  });
  return newArr;
};

/////////////////////uniq//////////////////////////////////////////////

_.uniq = (input) => {
  if (!Array.isArray(input) && typeof (input) !== 'string') return [];
  let uniqueArray = [];
  for (var i = 0; i < input.length; i++) {
    if (!uniqueArray.includes(input[i]))
      uniqueArray.push(input[i]);
  }
  return uniqueArray;
};

/////////////////////map//////////////////////////////////////////////

_.map = (list, iteratee) => {
  let newArray = [];
  let nestedArray = [];
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

///////////////// contains////////////////////////////////////////////

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

///////////////// pluck////////////////////////////////////////////

_.pluck = (input, value) => {
  let arr = [];
  if (typeof (input) === 'number' || typeof (input) === 'boolean') return [];
  _.each(input, (val) => {
    arr.push(val[value]);
  });
  return arr;
};

///////////////// reduce////////////////////////////////////////////

_.reduce = (list, iteratee, acc) => {
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
    acc = iteratee(acc, arr[i], i, list);
  }
  return acc;
};

///////////////// every////////////////////////////////////////////
///refactor 

_.every = (list, pred) => {
  if (pred === undefined) return true;
  if (!(pred instanceof Function)) return false;
  let arr = [];
  if (typeof (list) === 'string') {
    for (let i = 0; i < list.length; i++) {
      if (pred(list[i]) !== true) {
        arr.push(list[i]);
      }
    }
  }
  if (list instanceof Object) {
    for (let prop in list) {
      if (pred(list[prop]) !== true) {
        arr.push(list[prop]);
      }
    }
  }
  if (arr.length >= 1) return false;
  else return true;
};

///////////////// some////////////////////////////////////////////
/// refactor code and stop loops as soon as true found
_.some = (list, pred) => {
  if (pred === undefined && list.length > 0 || pred === undefined && Object.keys(list).length > 0) return true;
  if (pred === undefined) return false;

  if (!(pred instanceof Function)) return false;
  let arr = [];
  if (typeof (list) === 'string') {
    for (let i = 0; i < list.length; i++) {
      if (pred(list[i]) === true) {
        arr.push(list[i]);
      }
    }
  }
  if (list instanceof Object) {
    for (let prop in list) {
      if (pred(list[prop]) === true) {
        arr.push(list[prop]);
      }
    }
  }
  if (arr.length >= 1) return true;
  else return false;
};

///////////////// extends////////////////////////////////////////////

_.extend = function (obj)  {
  _.each(arguments, (argObject) => {
    _.each(argObject, (value, key) => {
      obj[key] = value;
    });
  });
  return obj;
};

/////////////////defaults///////////////////////////////////////////

_.defaults = (object, ...sources) => {
  return _.reduce(sources, (acc, item) => {
    for (let key in item) {
      if (acc[key] === undefined) acc[key] = item[key];
    }
    return acc;
  }, object);
};

////////////////////once////////////////////////////////////////////

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

////////////////////negate///////////////////////////////////////////

_.negate = (func) => {
  if (typeof func !== 'function') return _.negate;

  return function () {

    return !func.apply(this, arguments);
  };
};

////////////////////shuffle///////////////////////////////////////////

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

////////////////////invoke///////////////////////////////////////////

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

////////////////////sortBy///////////////////////////////////////////

_.sortBy = (list, iteratee, context) => {
  let arrayList, iterated = false;
  Array.isArray(list) ? arrayList = [...list] : arrayList = _.defaults({}, list);
  if (typeof arrayList === 'string') arrayList = arrayList.split('');
  if (arrayList instanceof Object && !(Array.isArray(arrayList))) {
    const newList = [];
    for (let key in arrayList) {
      newList.push(arrayList[key]);
    }
    arrayList = newList;
  }

  if (typeof iteratee === 'function') {
    const newList = [];
    _.each(arrayList, (val) => {
      newList.push({ originalValue: val, newValue: iteratee.call(context, val) });
    });
    arrayList = newList, iterated = true;
  }

  //  sort the array
  let result = arrayList.sort((a, b) => {
    if (iteratee) {
      if (iterated) return a.newValue > b.newValue;
      return a[iteratee] > b[iteratee];
    }
    return a > b;
  });

  if (iterated) {
    const updatedResult = [];
    _.each(result, v => {
      updatedResult.push(v.originalValue);
    });
    return updatedResult;
  }
  return result;
};

////////////////////zip///////////////////////////////////////////

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


////////////////////sortedIndex///////////////////////////////////////////

_.sortedIndex = function (list, value, iteratee) {
  if (!Array.isArray(list) && typeof list !== 'string') return 0;

  let copyList = list.slice();
  copyList.push(value);

  if (arguments[2]) {
    copyList = _.sortBy(copyList, iteratee);

    let start = 0;
    let end = copyList.length - 1;
    let mid;
    while (end >= start) {
      mid = Math.floor((start + end) / 2);
      if (copyList[mid][iteratee] === value[iteratee]) {
        return mid;
      }
      else if (copyList[mid][iteratee] < value[iteratee]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return -1;

  } else copyList.sort();
  return _.indexOf(copyList, value, true);
};

////////////////////flatten///////////////////////////////////////////////

_.flatten = (array, shallow) => {
  if (!Array.isArray(array) && typeof array !== 'string') return [];

  return _.reduce(array, function (acc, item) {
    if ((!shallow) && Array.isArray(item)) item = _.flatten(item);
    return acc.concat(item);
  }, []);
};

////////////////////intersection///////////////////////////////////////////

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

////////////////////difference///////////////////////////////////////////

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

////////////////////memoize///////////////////////////////////////////////

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

////////////////////delay/////////////////////////////////////////////////

_.delay = function (func, wait) {
  
  if (arguments.length === 0 || typeof func !== 'function') return undefined;
  
  let args = [].slice.call(arguments, 2);
  return setTimeout( () => {
    return func.apply(null, args);
  }, wait);
};

///////////////////////where///////////////////////////////////////////////

_.where = (list, props) => {
  
  return _.filter(list, item => {
    let bool = true;
    for (let key in props) {
      if (item[key] !== props[key]) bool = false;
    }
    return bool;
  });
};
  
///////////////////////throttle////////////////////////////////////////////

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

module.exports = _;