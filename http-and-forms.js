// CONTENT NEGOTIATION -----------------------------------------------

const getTheData = (dataType) => {
  const url = 'https://eloquentjavascript.net/author'
  fetch(url, {headers: {Accept: dataType}})
  .then(resp => resp.text())
  .then(console.log)
}

getTheData('text/plain')
getTheData('application/json')
getTheData('text/html')
getTheData('application/rainbows+unicorns')

// A JAVASCRIPT WORKBENCH --------------------------------------------

<textarea id="code">return "hi"</textarea>
<button id="button">Run</button>
<pre id="output"></pre>

<script>
  // Your code here.
  const btn = document.getElementById('button')
  const output = document.getElementById('output')
  
  btn.addEventListener('click', (e) => {
    const code = document.getElementById('code').value
    e.preventDefault()
    let res 
    try {
      res = eval(code)
      output.style.color = 'green'
      output.innerHTML = res
    } catch (e) {
      output.style.color = 'red'
      output.innerHTML = e
    }
  })
</script>

// CONWAYS GAME OF LIFE ----------------------------------------- (works, but needs refactoring!!!)

<div id="grid"></div>
<button id="next">Next generation</button>

<script>
  // Your code here.
  const btn = document.getElementById('next')
  const grid = document.getElementById('grid')
  const trueFalseRandom = () => Math.random() < 0.5
  const PERIMETER = 5
  
  const createGrid = (PERIMETER, state) => {
  	for (let i = 0; i < PERIMETER; i++){
      let rowArr = [] 
      for (let j = 0; j < PERIMETER; j++){
        rowArr.push(trueFalseRandom())
      }
      state.push(rowArr)
    }
    return state
  }
  
  const drawGrid = (state) => {
    grid.innerHTML = '';
  	for (let i = 0; i < PERIMETER; i++){
      var row = document.createElement("div") // creates our row
      row.setAttribute("id", `${i}`)
		
      let rowArr = [] 
      for (let j = 0; j < PERIMETER; j++){
        
        // create checkboxes
        let check = document.createElement("INPUT")
		check.setAttribute("type", "checkbox")
                
        if (state[i][j]) check.setAttribute("checked", 'true')
        check.setAttribute("id", `${i}${j}`)
        
        // append the checkbox to the row
        row.appendChild(check)
      }
      
      // add the row boolean array to the main state array
      state.push(rowArr)
      
      //append the row to the grid div
      grid.appendChild(row)
    }
    return state
  }
    
  const findSurroundingSquares = (state, row, column) => {
    let nearbyTrue = 0
    let nearbyFalse = 0
    
    if (column < PERIMETER) state[row][column+1] ? nearbyTrue++ : nearbyFalse++
    if (column > 0) state[row][column-1] ? nearbyTrue++ : nearbyFalse++
    
    if (row > 0 ) {
      if (column < PERIMETER) state[row-1][column+1] ? nearbyTrue++ : nearbyFalse++
      if (column > 0) state[row-1][column-1] ? nearbyTrue++ : nearbyFalse++
      state[row-1][column] ? nearbyTrue++ : nearbyFalse++
    }
    
    if (row+1 < PERIMETER) {
      if (column < PERIMETER) state[row+1][column+1] ? nearbyTrue++ : nearbyFalse++
      if (column > 0) state[row+1][column-1] ? nearbyTrue++ : nearbyFalse++
      state[row+1][column] ? nearbyTrue++ : nearbyFalse++
    }
    
    return [nearbyTrue, nearbyFalse]
  }
	
  const nextGeneration = (e) => {
    e.preventDefault()
    // iterate over state array
    state.forEach((rows, i) => {
    	rows.forEach((row, j) => {
          const [alive, dead] = findSurroundingSquares(state, i, j)
          console.log(alive, dead)
          
          if (state[i][j] = true) {
          	// Any live cell with fewer than two or more than three live neighbors dies.
            if (alive < 2 || alive > 3) state[i][j] = false
            
            // Any live cell with two or three live neighbors lives on to the next generation.
            else if (alive === 2 || alive === 3) state[i][j] = true
          }
          // Any dead cell with exactly three live neighbors becomes a live cell.
          else if (state[i][j] = false && alive === 3) state[i][j] = true
        })
    })
    drawGrid(state)
  }
    
  const state = createGrid(PERIMETER, [])
  drawGrid(state) // initial draw
  btn.addEventListener('click', nextGeneration)
</script>
