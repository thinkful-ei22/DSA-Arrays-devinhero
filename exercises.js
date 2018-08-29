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

main();