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
