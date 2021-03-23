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

// TABS ------------------------------------------------------------- (less eloquent, more javascript)

<tab-panel>
  <div data-tabname="one">Tab one</div>
  <div data-tabname="two">Tab two</div>
  <div data-tabname="three">Tab three</div>
</tab-panel>
<script>
  function asTabs(node) {
    // Your code here.
    const tabNode = document.getElementsByTagName('tab-panel')
    const divs = document.getElementsByTagName('div')
    const tabNames = []
    for (const div of divs) {
    	tabNames.push(div.getAttribute('data-tabname'))
    }
    
    const selectText = ({innerText}) => {
      for (const [key, div] of Object.entries(divs)) {
        div.getAttribute('data-tabname') === innerText
          ? div.style.display = 'block'
          : div.style.display = 'none'
	  }
    }
    
    const tabDiv = document.createElement('tab-div')
    tabNames.forEach((tabName, index) => {
      const tab = document.createElement('button')
      tab.addEventListener('click', function(){
        selectText(tab);
      })
      tab.innerText = tabName
      tab.style.background = 'red'
      tab.style.margin = '1px'
      tab.style.display = 'inline'
      tabDiv.appendChild(tab)
    })
    document.body.prepend(tabDiv)
  }
  asTabs(document.querySelector("tab-panel"));
</script>
