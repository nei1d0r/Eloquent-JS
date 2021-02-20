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

// DOMINANT WRITING DIRECTION ----------------------------------------------
// Write a function that computes the dominant writing direction in a string
// of text. Each script object has a direction property that can 
// be "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).

const dominantDirection = (text) => {
  const directions = {}
  
  // returns an array of charCodes for text
  const charCodeArray = text.split('')
    .filter((char) => char !== ' ')
    .map((char) => charCode = char.charCodeAt(0))
  
  // iterate over each script, then iterarte through the scripts charachter
  // range array. We then iterate throught the charCodeArray to see if the
  // char is part of the script range, if so we record the script direction
  // and tally accordingly
  SCRIPTS.forEach(({ranges, direction, name}) => {
    ranges.forEach(([lower, higher]) => {
      charCodeArray.map((char) => {
        if (lower <= char && char < higher) {
          directions.hasOwnProperty(direction) 
            ? directions[direction]++
            : directions[direction] = 1
        }
      })
    })
  })
  
  // loop over each key in the directions array to set the dominant value to
  // the highest tally
  let dominant
  Object.keys(directions).forEach((key) => {
    if (dominant === undefined) dominant = key
    if (directions[dominant] < directions[key]) dominant = key
  })
  
  return dominant
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
