const  binarySearch = (arr, value) => {
  let low = 0, high = arr.length;

  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);

    if (arr[mid] === value) return mid;

    if (value < arr[mid]) high = mid - 1;

    else low = mid + 1;
  }
};

const binaryIndex = (list, value) => {

  let mid,
    min = 0,
    max = list.length - 1;
 
  while (min <= max) {
    mid = Math.floor((min + max) / 2);
    if (mid === 0 && list[mid] > value) {
      return mid;
    }
    else if (mid === list.length - 1 && list[mid] < value) {
      return mid  + 1;
    }

    else if (list[mid] < value && list[mid + 1] >= value) {
      return mid + 1;
    }
    else if (list[mid] < value) min = mid + 1;

    else max = mid - 1;
    
        
  }
  return 0;
};



module.exports =  {binarySearch, binaryIndex};