const Memory = require('./Memory');

const mem = new Memory;

class Array{
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = mem.allocate(this.length);
  }

  get(idx){
    this._checkIdx(idx);

    return mem.get(this.ptr + idx);
  }

  push(value){
    if(this.length >= this._capacity)
      this._resize((this.length+1) * Array.SIZE_RATIO);

    mem.set(this.ptr+this.length, value);
    this.length++;
  }

  pop(){
    const val = mem.get(this.ptr+this.length-1);
    // mem.set(this.ptr+this.length-1, null);
    this.length--;
    return val;
  }

  insert(idx, value){
    this._checkIdx(idx);

    if(this.length >= this._capacity)
      this._resize((this.length+1) * this.SIZE_RATIO);

    const oldPtr = this.ptr;
    this.ptr = mem.allocate(this._capacity);
    mem.copy(this.ptr, oldPtr, idx);
    mem.set(this.ptr+idx, value);
    mem.copy(this.ptr+idx+1, oldPtr+idx, this.length-idx);
    this.length++;
  }

  remove(idx){
    this._checkIdx(idx);

    mem.copy(this.ptr + idx, this.ptr+idx+1, this.length - idx - 1);
    this.length--;
  }

  _checkIdx(idx) {
    if (idx < 0 || idx >= this.length)
      throw new Error('Segmentation Fault');
  }

  _resize(size){
    const prevPtr = this.ptr;
    if((this.ptr = mem.allocate(size)) === null)
      throw new Error('No memory Available');
    
    this._capacity = size;
    mem.copy(this.ptr, prevPtr, this.length);
    mem.free(prevPtr);
  }
}
Array.SIZE_RATIO = 3;


module.exports = Array;