const _ = {};

//////////////////////identity//////////////////////////////////////////


_.identity = arg => arg;


//////////////////////values///////////////////////////////////////////

_.values = (list) => {
  // if (typeof(list) === 'string') return list.split('');
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

_.defaults = function (obj) {
  _.each(arguments, (argObject) => {
    _.each(argObject, (value, key) => {
      if (obj[key] === undefined) {
        obj[key] = value;
      }
    });
  });
  return obj;
};

module.exports = _;