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
