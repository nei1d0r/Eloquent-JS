// MEASURING A ROBOT ---------------------------------------

function compareRobots(robot1, memory1, robot2, memory2) {
  function runRobot(state, robot, memory) {
    let moves = 0
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        return turn
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }
  VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};
  
  let totalMoves1 = 0
  let totalMoves2 = 0
  rounds = 100
  for (let x = 1; x < rounds+1; x++) {
    const villageState = new VillageState.random
    totalMoves1 += runRobot(villageState, robot1, memory1)
    totalMoves2 += runRobot(villageState, robot2, memory2)
  }
  const avgMoves = (total, rounds) => total/rounds
  console.log(`completed ${rounds} rounds in ${avgMoves(totalMoves1, rounds)} moves average`)
  console.log(`completed ${rounds} rounds in ${avgMoves(totalMoves2, rounds)} moves average`)
}

// ROBOT EFFICIENCY -----------------------------------------------------------
// Their robot
function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
// My Robot
function yourRobot({place, parcels}, route) {
  if (route.length == 0) {
    let pickUpRoutes = [];
    let deliveryRoutes = [];
    // we map the route for EACH parcel and add to appropriate array
    parcels.forEach((parcel) => {
      parcel.place != place
	? pickUpRoutes.push(findRoute(roadGraph, place, parcel.place))
	: deliveryRoutes.push(findRoute(roadGraph, place, parcel.address))
    })

    // we sort each array and use the 0th index (shortest route) to determine our direction
    pickUpRoutes.sort((a, b) => a.length - b.length)
    deliveryRoutes.sort((a, b) => a.length - b.length)
	
    route = pickUpRoutes.length == 0 ? deliveryRoutes[0] : pickUpRoutes[0]
  }
  return { direction: route[0], memory: route.slice(1) }
}

// PERSISTENT GROUP -----------------------------------------------------------------

class PGroup {
  constructor(arr){
    this.group = arr
  }
  
  add(item){
    return new PGroup(this.group.concat(item))
  }
  
  delete(item){
    const filtered = this.group.filter((keep) => keep != item)
  	if (this.group.indexOf(item) > -1){
      return new PGroup(filtered);
    }
  }
  
  has(item){
  	return this.group.includes(item) ? true : false
  }
}

PGroup.empty = new PGroup([])

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
