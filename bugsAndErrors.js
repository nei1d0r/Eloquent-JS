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


// THE LOCKED BOX -----------------------------------------------------

const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  const alreadyUnlocked = box.locked ? true : false
  try {
    if (!alreadyUnlocked) box.unlock()
    return body()
  } finally {
    if (!alreadyUnlocked) box.lock()
    return
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
// → true
