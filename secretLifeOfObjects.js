// A VECTOR TYPE ------------------------------------------------------

class Vec {
  constructor(x, y) {
    this.x = x,
    this.y = y
  }
  
  plus({x, y}) { // <- deconstructed new passed in Vec here
  	return `Vec{x: ${this.x + x}, y: ${this.y + y}}`
  }
  
  minus({x, y}) {
  	return `Vec{x: ${this.x - x}, y: ${this.y - y}}`
  }

  get length() {
    return (Math.sqrt((this.x * this.x) + (this.y * this.y)))
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5


// Groups ---------------------------------------------------------------

class Group {
  // Your code here.
  constructor(arr) {
  	this.group = arr.length ? arr : []
  }
  
  static from(arr){
    const newGroup = new Group()
    arr.forEach((item) => {
    	newGroup.add(item)
    })
    return newGroup
  }
  
  add(itemToAdd){
    const index = (this.group).indexOf(itemToAdd)
  	if (index < 0) this.group.push(itemToAdd)
  }
  
  delete(itemToAdd){
    const index = (this.group).indexOf(itemToAdd)
    if (index > -1) {
      this.group.splice(index, 1)
    }
  }
  
  has(itemToCheck){
  	return this.group.indexOf(itemToCheck) !== -1 ? true : false
  }
}

let group = Group.from([10, 20]);

console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

// ITERABLE GROUPS --------------------------------------------------------------

// Your code here (and the code from the previous exercise)
class Group {
  // Your code here.
  constructor(arr) {
  	this.group = []
  }
  
  static from(arr){
    const newGroup = new Group()
    arr.forEach((item) => {
    	newGroup.add(item)
    })
    return newGroup
  }
  
  add(itemToAdd){
    const index = (this.group).indexOf(itemToAdd)
  	if (index < 0) this.group.push(itemToAdd)
  }
  
  delete(itemToAdd){
    const index = (this.group).indexOf(itemToAdd)
    if (index > -1) {
      this.group.splice(index, 1)
    }
  }
  
  has(itemToCheck){
  	return this.group.indexOf(itemToCheck) !== -1 ? true : false
  }
}
//------------------------ ^from prev

class GroupIterator {
  constructor(group) {
    this.x = 0
    this.group = group.group;
  }
  
  next() {
    if (this.x == this.group.length) return {done: true};

    let value = this.group[this.x];
    this.x++;
    return { value, done: false }
  }
} 

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
};

for (let value of Group.from(["a", "b", "c", "d"])) {
  console.log(value);
}

// → a
// → b
// → c

// BORROWING A CALL -----------------------------------------------------

map = {one: true, two: true, hasOwnProperty: true};

// Fix this call --> console.log(map.hasOwnProperty("one"));

// using Object.prototype.[method].call([lexical this], ...args ) allows us to invoke
// the prototypical function rather than the method override from the map object.
// (from above) "Takes the this value as its first argument and treats further arguments 
// as normal parameters".

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true
