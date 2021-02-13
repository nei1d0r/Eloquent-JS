// THE SUM OF A RANGE --------------------------------------------------------

const range = (start, end, step = 1) => {
  let arr = []
    for (let i = start; step > 0 ? i <= end : i >= end; i+=step){
  	  arr.push(i)
    }
  return arr
}

const sum = (arr) => arr.reduce((total, num) => total + num)


console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

// REVERSING AN ARRAY ----------------------------------------------------------

const reverseArray = (arr) => {
  const reversed = []
  arr.map((val) => reversed.unshift(val))
  return reversed
}

const reverseArrayInPlace = (arr) => {
  for (let i = 0; i < arr.length / 2; i++) {
    const stored = arr[i]
    arr[i] = arr[(arr.length-1) - i]
    arr[(arr.length-1) - i] = stored
  }
  return arr
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

// A LIST ----------------------------------------------------------

const arrayToList = (arr) => {
  let list = {}
  for (let value of arr){
    list = Object.keys(list).length === 0 
      ? {value, rest: null} 
      : {value, rest: {...list}}
  }
  return list
}

const listToArray = (list) => {
  const arr = []	
  while (list.rest){
    arr.unshift(list.value)
    list = list.rest
  }
  arr.unshift(list.value)
  return arr
}

const prepend = (value, rest) => {return {value, rest}}

const nth = (list, position) => position === 0
    ? list.value
	: nth({...list.rest}, position - 1)

console.log('==>', arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log('==>', nth(arrayToList([10, 20, 30]), 1));
// → 20

// DEEP COMPARISSON ----------------------------------------------

const deepEqual = (objectA, objectB, iteration) => {
  // fail fast checks
  if ('NULL', objectA === null || objectB === null) return 'null error'
  if (objectA === objectB) return true
  if (JSON.stringify(objectA) !== JSON.stringify(objectB)) return false
  
  // iterate over keys and check for match
  return Object.keys(objectA).map((key) => {
    return typeof objectA[key] !== 'object' 
      ? objectA[key] === objectB[key]
      : deepEqual(objectA[key], objectB[key]) // recursively check nested object
  }).every((item) => item === true)           // checks that all items return true
}

let obj = {here: {is: "an"}, object: 2, bob: 5};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2, bob: 5}));
// → true
