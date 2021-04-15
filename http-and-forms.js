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

// CONWAYS GAME OF LIFE ----------------------------------------- (save game) (draws grid, need to add logic)

<div id="grid"></div>
<button id="next">Next generation</button>

<script>
  // Your code here.
  const btn = document.getElementById('next')
  const grid = document.getElementById('grid')
  const trueFalseRandom = () => Math.random() < 0.5

  const createGrid = (perimeter) => {
  	for (let i = 0; i < perimeter; i++){
      var row = document.createElement("div")
      row.setAttribute("id", `${i}`);

      for (let j = 0; j < perimeter; j++){
        let check = document.createElement("INPUT");
		check.setAttribute("type", "checkbox")
        trueFalseRandom()
          ? check.setAttribute("checked", 'false')
          : null
        
        check.setAttribute("id", `${i}${j}`);
        row.appendChild(check)
      }
      grid.appendChild(row)
    }
  }
  
  const nextGeneration = (e) => {
    e.preventDefault()
  	console.log('NEXT')
  }
  
  createGrid(5)
  btn.addEventListener('click', nextGeneration)
