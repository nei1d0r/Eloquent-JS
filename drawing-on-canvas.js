// SHAPES ----------------------------------------------------------------

<canvas width="600" height="200"></canvas>

// 1 - Trapezoid

<script>
  let canvas = document.querySelector("canvas")
  let cx = canvas.getContext("2d")

  // Your code here.
  const drawTrapezoid = (base = 100, top = 60, height = 30) => {
    topOffset = (base - top)/2
    cx.beginPath()
    cx.moveTo(0,height)
    cx.lineTo(base, height)
    cx.lineTo(base - topOffset, 0)
    cx.lineTo(topOffset, 0)
    cx.closePath()
    cx.stroke()
  }
  drawTrapezoid() // <== with defaults
  drawTrapezoid(200, 40, 40)

// 2 - diamond
  
  const drawDiamond = (length = 50) => {
    cx.translate(canvas.width/2 - length/2, canvas.height/2 - length/2) // <== centers diamon in canvas
    cx.rotate(45*Math.PI/180)
    cx.fillStyle = 'red'
    cx.fillRect(0, 0, length, length)
    cx.restore()
  }
  
  drawDiamond(100)






</script>
