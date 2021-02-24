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
