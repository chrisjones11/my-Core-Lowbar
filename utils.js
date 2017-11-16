const  binarySearch = (arr, value) => {
  let low = 1, high = arr.length;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] === value) return mid;
    else if (arr[mid] < value) low = mid + 1;
    else high = mid - 1;
  }
};





module.exports =  {binarySearch};