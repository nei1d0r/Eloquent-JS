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
