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

// CONWAYS GAME OF LIFE ----------------------------------------- (save game) (draws grid added state array, need to add logic)

<div id="grid"></div>
<button id="next">Next generation</button>

<script>
  // Your code here.
  const btn = document.getElementById('next')
  const grid = document.getElementById('grid')
  const trueFalseRandom = () => Math.random() < 0.5
  
  const createGrid = (perimeter, state) => {
  	for (let i = 0; i < perimeter; i++){
      var row = document.createElement("div") // creates our row
      row.setAttribute("id", `${i}`)
		
      let rowArr = [] 
      for (let j = 0; j < perimeter; j++){
        
        // create checkboxes
        let check = document.createElement("INPUT")
		check.setAttribute("type", "checkbox")
        
        // random true/false to populate checkboxes
        trueFalseRandom()
          ? check.setAttribute("checked", 'false')
          : null
        check.setAttribute("id", `${i}${j}`)
        
        //get the checked status of the creted checkbox and add to array
        rowArr.push(check.checked)
        
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
  

	
  const nextGeneration = (e) => {
    e.preventDefault()
    // iterate over state array
    initialState.forEach((rows, i) => {
    	rows.forEach((row, j) => {
        	console.log(row, i, j)
          // ADD THE LOGIC CHECKS IN HERE FOR GAME
        })
    })
    
    // iterate over nests within state
  	console.log('NEXT')
  }
  
  // creates grid and returns the grid as a nested array of booleans
  const initialState = createGrid(40, [])
  btn.addEventListener('click', nextGeneration)
</script>
