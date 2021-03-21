// BALLOON --------------------------------------------------------------
<p>🎈</p>

<script>
  const para = document.getElementsByTagName('P')[0]
  
  let fontSize = 16
  const changeSize = (e) => {
    const {key} = e
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      e.preventDefault()
    }
	 if (key === 'ArrowUp') fontSize++
   	 if (key === 'ArrowDown') fontSize--
    if (fontSize > 80) {
      para.innerText = '💥'
      window.removeEventListener('keydown', changeSize())
    }
    para.style.fontSize = `${fontSize}px`
  }
    
  window.addEventListener("keydown", (e) => changeSize(e))
</script>

// MOUSE TRAIL --------------------------------------------------------

  let dots = []
  
  // create 12 dots
  for (var i = 0; i < 12; i++) {
    var node = document.createElement("div")
    node.className = "trail"
    document.body.appendChild(node)
    dots.push(node)
  }
  currentDot = 0
  window.addEventListener("mousemove", function(event) {
    var dot = dots[currentDot];
    dot.style.left = (event.pageX - 3) + "px"
    dot.style.top = (event.pageY - 3) + "px"
    // iterate over dot array
    currentDot = (currentDot + 1) % dots.length // resets to 0 when limit reached
  })
