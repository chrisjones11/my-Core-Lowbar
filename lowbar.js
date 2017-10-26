const _ = {};

//////////////////////identity//////////////////////////////////////////


_.identity = arg => arg;


//////////////////////values///////////////////////////////////////////

_.values = (list) => {
  if (typeof (list) !== 'object') return [];
  if (Array.isArray(list)) return list;
  let newArray = [];
  for (let key in list) newArray.push(list[key]);
  return newArray;
};
   
///////////////////////////first//////////////////////////////////////////////

_.first = (list, n) => {
  if (Array.isArray(list) && n === undefined || typeof (list) === 'string' && n === undefined) return [list[0]];
  if (!Array.isArray(list) && typeof(list) !== 'string' && n === undefined) return undefined;
  if (!Array.isArray(list) && typeof(list) !== 'string' && n !== undefined) return [];
  if (typeof(list) === 'string') return list.split('').slice(0,n);
  return list.slice(0, n);
};

/////////////////////Last/////////////////////////////////////////////

_.last = (list, n) => {
  if (Array.isArray(list) && n === undefined || typeof (list) === 'string' && n === undefined) return [list[list.length-1]];
  if (!Array.isArray(list) && typeof(list) !== 'string' && n === undefined) return undefined;
  if (!Array.isArray(list) && typeof(list) !== 'string' && n !== undefined) return [];
  if (Array.isArray(list) && typeof(n) !== 'number'&& typeof(n) !== 'boolean') return list;
  if (typeof(list) === 'string' && typeof(n) !== 'number' && typeof(n) !== 'boolean') return list.split('');
  if (typeof(list) === 'string') return list.split('').slice(list.length-n);
  return list.slice(list.length-n);
};

/////////////////////each/////////////////////////////////////////////

_.each = (list, fn) => {
  if (Array.isArray(list) || typeof(list) === 'string') {
    for (var i = 0; i < list.length; i++) {
      fn(list[i], i, list);
    }
  }
  else if (typeof list === 'object') {
    for (var prop in list) {
      fn(list[prop], prop, list);
    }
  }
};

///////////////////indexOf////////////////////////////////////////////
/// ****Still need to implement isSorted part of this function****////

_.indexOf = (arr, val, start = 0) => {
  for (var i = start; i < arr.length; i++) {
    if (val === arr[i]) return i;
  } return -1;
};

/////////////////////filter/////////////////////////////////////////////

_.filter = (list, fn) => {
  if (!fn) fn = _.identity;
  var newArr = [];
  _.each(list, function(value, indexorkey, list) {
    if (fn(value, indexorkey,list)) newArr.push(value);
  });
  return newArr;
};

/////////////////////reject/////////////////////////////////////////////

_.reject = (list, fn) => {
  if (!fn) fn = _.identity;
  var newArr = [];
  _.each(list, function(value, indexorkey, list) {
    if (!fn(value, indexorkey,list)) newArr.push(value);
  });
  return newArr;
};

/////////////////////uniq//////////////////////////////////////////////

_.uniq = (input) => {
  if (!Array.isArray(input) && typeof(input) !== 'string' ) return [];
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
  if (typeof(list) === 'string') list = list.split('');


  if (typeof(list) === 'boolean' || typeof(list) === 'number') return [];
  if (Array.isArray(list) || list instanceof Object ){
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

_.contains = function (input, value, fromIndex) {
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
  



module.exports = _;