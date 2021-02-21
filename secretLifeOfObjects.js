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
    const uniqueArray = []
    arr.forEach((item) => {
    	if (uniqueArray.indexOf(item) < 0) uniqueArray.push(item)
    })
    return new Group(uniqueArray);
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
