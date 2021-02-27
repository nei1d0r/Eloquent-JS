// RETRY ----------------------------------------------------

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  try {
     return primitiveMultiply(a, b)
  } 
  catch(err) {
    if (err instanceof MultiplicatorUnitFailure){
      return reliableMultiply(a, b) 
    } else {
      throw err
    }
  }
}

console.log('==>', reliableMultiply(8, 8));
// → 64
