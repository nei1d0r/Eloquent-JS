// TRACKING THE SCALPEL ----------------------------------------------

const locateScalpel = async (nest) => {
  let current = nest.name
  for (;;) {
    let next = await anyStorage(nest, current, "scalpel")
    if (next == current) 
      return current
      current = next
    }
}

function locateScalpel2(nest) {
  function loop(current) {
    return anyStorage(nest, current, "scalpel")
      .then(next => next == current ? current : loop(next))
  }
  return loop(nest.name);
}

locateScalpel(bigOak).then(console.log);
// → Butcher Shop
locateScalpel2(bigOak).then(console.log);

// BUILDING PROMISE.ALL ----------------------------------------------

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let results = []
    let pending = promises.length
    
    if (promises.length == 0) return resolve(results)
    
    promises.forEach((promise, index) => {
		promise.then((result) => {
        results[index] = result;
        pending -= 1
        if (pending == 0) resolve(results);
      }).catch(reject);
	  })
  })
}
