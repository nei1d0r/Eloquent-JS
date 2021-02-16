// FLATTENING ARRAYS -----------------------------------------

let arrays = [[1, 2, 3], [4, 5], [6], ['blue', 8], [3, 5, 66, 7, 'j']];
// Your code here.
const flatten = (arrays) => arrays.reduce((total, amount) => total.concat(amount))

console.log('==>', flatten(arrays))
// → [1, 2, 3, 4, 5, 6]

// YOUR OWN LOOP ----------------------------------------------

// Your code here.
const loop = (value, test, update, body) => {
  for (let i = value; test(i); i = update(i)){
     body(i) 
  }
}

// slightly more expensive for no real gain - but for fun!
const loopRecursing = (value, test, update, body) => {
  if (!test(value)) return // exit condition	
  body(value) // do the function (console.log)
  loopRecursing(update(value), test, update, body) // again!
}

loop(3, n => n > 0, n => n - 1, console.log);
loopRecursing(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

// EVERYTHING (array.every) ----------------------------------------------

function every(array, test) {
  const anyFalse = array.filter((item) => {
    return !test(item)
  })
  
  //if the failures array is less than 0 all tests pass (De Morgan’s laws)
  return anyFalse < 1
}

// one liner for fun (above is more readable imo!!)
const everyTwo = (array, test) => !!!array.filter((item) => !test(item)).length

console.log(every([1, 3, 5], n => n < 10));
console.log(everyTwo([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
console.log(everyTwo([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
console.log(everyTwo([], n => n < 10));
// → true
