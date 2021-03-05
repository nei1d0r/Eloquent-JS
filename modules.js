// ROADS MODULE ------------------------------------------------------

// Add dependencies and exports
const graph = require('./graph')

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

const buildGraph = (roadsArray) => {
  const graph = {}
  roadsArray.forEach((journey) => {
	const [from, to] = journey.split("-")
    if (Object.keys(graph).includes(from)) graph[from].push(to)
    else {
      graph[to] = [from]
      graph[from] = [to] // cos if you can get there y'can go there right!!?
    }
  })
  return graph
}

// console.log(buildGraph(roads))
export default buildGraph
