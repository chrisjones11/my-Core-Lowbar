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
   




module.exports = _;