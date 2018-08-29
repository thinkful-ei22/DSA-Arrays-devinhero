const Array = require('./Array');

function main(){

  Array.SIZE_RATIO = 3;

  //create an instance of the array class
  let arr = new Array();

  //add an item to the array
  arr.push(3);

  // console.log(arr); //length 1, capacity 3, ptr 0

  /////////////////

  arr.push(5);
  arr.push(15);
  arr.push(19); //forces resize
  arr.push(45);
  arr.push(10);

  // console.log(arr); // length 6, capacity 12, ptr 3

  /* -push(19) changes length to 4, which exceeds original capacity
   *  of 3.
   * -New capacity becomes new length * 3, so 4*3=12.
   * -ptr is 3. Original memory block occupied addresses 0 through 2,
   *  resize initiated a new block at next available address (3) 
   */

  arr.pop();
  arr.pop();
  arr.pop();

  console.log(arr); // length 3, capacity 12, ptr 3

  /* pop removes three items, reducing the length by 3. No resizing
   * was done so capacity and ptr stay the same
   */

   console.log(arr.get(0)); // prints: 3

   arr.pop();
   arr.pop();
   arr.pop(); //should be empty now
   arr.push('hello squirrels');
   console.log(arr.get(0)); //prints: NaN

  /* The memory class uses Float64Array for memory allocation. This
   * means all inputs must be numbers; strings are an invalid type.
   * 
   * _resize is used when the current array needs to hold more than
   * what its current size in memory will allow. It allocates a new
   * memory block that can hold the expanded number of values (and
   * some amount of extra space for future additions).
   */

}

function urlify(inputStr){
  let newStr = [];
  for(let i = 0; i < inputStr.length; i++){
    if(inputStr[i] === ' '){
      newStr.push('%');
      newStr.push('2');
      newStr.push('0');
    }
    else
      newStr.push(inputStr[i]);
  }

  return newStr.join('');
}

function minFiveArrayFilter(arr){
  const newArr = [];
  for(let i = 0; i < arr.length; i++){
    if(arr[i] >= 5)
      newArr.push(arr[i]);
  }

  return newArr;
}

function maxSumInArray(arr){
  let maxSum = arr[0];
  let curSum;
  for(let i = 0; i < arr.length-1; i++){
    curSum = arr[i];
    if(curSum > maxSum)
      maxSum = curSum;

    for(let j = i+1; j < arr.length; j++){
      curSum += arr[j];
      if(curSum > maxSum)
        maxSum = curSum;
    }
  }

  return maxSum;
}

function mergeArrays(arr1, arr2){
  let idx1 = 0;
  let idx2 = 0;
  const newArr = [];

  while(idx1 < arr1.length || idx2 < arr2.length){
    if(idx1 === arr1.length){
      newArr.push(arr2[idx2]);
      idx2++;
    }else if(idx2 === arr2.length){
      newArr.push(arr1[idx1]);
      idx1++;
    }else if(arr1[idx1] > arr2[idx2]){
      newArr.push(arr2[idx2]);
      idx2++;
    }else{
      newArr.push(arr1[idx1]);
      idx1++;
    }
  }

  return newArr;
}

function removeCharsFromString(targetStr, remChars){
  let newStr = '';
  let shouldDelete = false;
  for(let i = 0; i < targetStr.length; i++){
    shouldDelete = false;
    
    for(let j = 0; j < remChars.length; j++){
      if(targetStr[i] === remChars[j])
        shouldDelete = true;
    }

    if(!shouldDelete)
      newStr += targetStr[i];
  }

  return newStr;
}

function products(arr){
  const newArr = [];
  let currProd = 1;

  for(let i = 0; i < arr.length; i++){
    currProd = 1;
    for(let j = 0; j < arr.length; j++){
      if(i !== j)
        currProd = currProd * arr[j];
    }
    newArr.push(currProd);
  }

  return newArr;
}

function zeroOneArray(arr){
  const newArr = [];
  
  for(let i = 0; i < arr.length; i++){
    newArr.push([]);
    for(let j = 0; j < arr[i].length; j++)
    newArr[i].push(arr[i][j]);
  }

  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr[i].length; j++){

      if(arr[i][j] === 0){
        for(let n = 0; n < arr.length; n++){
          newArr[n][j] = 0;
        }
        for(let m = 0; m < arr[i].length; m++){
          newArr[i][m] = 0;
        }
      }

    }
  }

  return newArr;
}

function isStringRotation(str1, str2){
  if(str1.length !== str2.length)
    return false;
  
  let isMatch = true;

  for(let offset = 0; offset < str1.length; offset++){
    isMatch = true;
    for(let i = 0; i < str1.length; i++){
      if(str1[i] !== str2[(i+offset) % str1.length])
        isMatch = false;
    }

    if(isMatch === true)
      return true;
  }

  return false;
}

main();
console.log('---------------------');
console.log(urlify('they will stare unbelieving at the last unicorn'));
console.log(minFiveArrayFilter([-1,6,7,3,8,4,5,9,10]));
console.log(maxSumInArray([4,6,-3,5,-2,1]));
console.log(mergeArrays([1, 3, 6, 8, 11] , [2, 3, 5, 8, 9, 10]));
console.log(removeCharsFromString('Why, oh why can we not use c or y? What if we need to cry?', 'cy'));
console.log(products([1, 3, 9, 4]));
console.log(zeroOneArray(  
  [[1,0,1,1,0],
  [0,1,1,1,0],
  [1,1,1,1,1],
  [1,0,1,1,1],
  [1,1,1,1,1]]
));
console.log(isStringRotation('amazon', 'azonma'));
console.log(isStringRotation('amazon', 'azonam'));