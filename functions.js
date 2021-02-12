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

const countCharOne = (string, char) => {
  let counter = 0
  for (let i = 0; i < string.length; i++) {
   	if (string[i] === char) counter++
  }
  return counter
}
// or.....
const countCharTwo = (string, char) => string.split('').filter((splitChar) => splitChar == char).length

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

// or same again but function used in curry...

const countChar = (string, char) => 
	string.split('')
	.filter((splitChar) => splitChar.toLowerCase() == char.toLowerCase()).length

const countCurryCharsWordFirst = (string) => {
  return (char) => countChar(string, char)
}

countCurryChars = (char) => {
  return (string) => countChar(string, char)
}

console.log(countCharOne('BBC', 'B'));
// → 2
console.log(countCharOne('BBC', 'B'));
// → 2
console.log(countCurryCharsWordFirst("kakkerlak")('k'));
// → 4
console.log(countCurryChars('M')('Mississippi'));
// → 4
