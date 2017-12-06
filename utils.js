module.exports = {
  add1: (acc, item) => {
    acc.push(item + 1);
    return acc;
  }, 
  addh: (acc, item) => {
    return acc + 'h' + item;
  },
  divide: (num) => {
    if (num % 2 === 0) return true;
  },
  dotrue: () => {
    return true;
  },
  double: (n) => {
    return n * 2;
  },
  equalToThis: function (item, i) {
    return item === this[i];
  },  
  isEven: (num) => {
    return num % 2 !== 1;
  },
  lessThanThis: function (item) {
    return item < this;
  },
  oneOverThis:function (num) {
    return this / num;
  },
  popContext: function () {
    this.pop();
  },
  sum: (acc, item) => {
    return acc + item;
  }
};
      
      
      
     
    




  