// MINIMUM -----------------------------------------------

const min = (num1, num2) => num1 < num2 ? num1 : num2

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

// RECURSION ---------------------------------------------

const isEven = (num) => num % 2 === 0 ? true : false

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → false

// BEAN COUNTING -----------------------------------------

const countChar = (string, char) => {
  let counter = 0
  for (let i = 0; i < string.length; i++) {
   	if (string[i] === char) counter++
  }
  return counter
}

const countCurryCharsWordFirst = (string) => {
  return (char) => {
    let counter = 0
	for (let i = 0; i < string.length; i++) {
      if (string[i] === char) counter++
    }
    return counter
  } 
}

countCurryChars = (char) => {
  return (string) => {
    let counter = 0
    const stringLower = string.toLowerCase()
    const charLower = char.toLowerCase()
    for (let i = 0; i < stringLower.length; i++) {
      if (stringLower[i] === charLower) counter++
    }
    return counter
  }
}

console.log(countChar('BBC', 'B'));
// → 2
console.log(countCurryCharsWordFirst("kakkerlak")('k'));
// → 4
console.log(countCurryChars('M')('Mississippi'));
// → 4
