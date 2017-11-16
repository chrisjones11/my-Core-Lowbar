const  binarySearch = (arr, value) => {
  let low = 0, high = arr.length;

  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);

    if (arr[mid] === value) return mid;

    if (value < arr[mid]) high = mid - 1;

    else low = mid + 1;
  }
};




module.exports =  {binarySearch};