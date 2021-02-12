// LOOPING A TRIANGLE -------------------------------

let hashes = ''
for (let i = 1; i <= 7; i++) {
  hashes += '#'
  console.log(hashes)
}

// FIZZBUZZ ----------------------------------------- (i don't like this it's too long!)

for (let i = 1; i <= 100; i++){
  if (i % 5 === 0 && i % 3 === 0){
  	console.log(i, 'FizzBuzz')
  } else if (i % 3 === 0) {
      console.log(i, 'Fizz')
  } else if (i % 5 === 0) {
  	console.log(i, 'Buzz')
  } else {
  console.log(i)
  }
}

// CHESSBOARD ----------------------------------------

let height = 8
let width = height

const board = (height, width) => {
  for (let i = 0; i < height; i++){
      let col = ''
      if (i % 2 === 0) {
        for (let j = 0; col.length < width; j++){ 
          j % 2 === 0 ? col += 'O' : col += '#'
        }
      } else {
        for (let j = 0; col.length < width; j++){ 
          j % 2 === 0 ? col += '#' : col += 'O'
        }
      }
    console.log(col)
  }
}
board(10, 10)
