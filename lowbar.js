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



module.exports = _;