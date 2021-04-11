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

// 3 - ZigZag

  const zigZag = (length, zigHeight, zagTimes) => {
    let isZig = true // we'll use this to set zig or zag
    cx.beginPath()
    cx.moveTo(0, 0)
    
    for (let i = 1; i < zagTimes + 1; i++) {
      cx.lineTo(isZig ? length : 0, zigHeight * i)
      cx.stroke()
      isZig = !isZig
    }
  }
  
  zigZag(100, 10, 20)

// 4 - Spiral

  const spiral = (spirals) => { // This didn't work as expected, but looks cool!
    cx.beginPath()
    for (let i = 0; i < spirals; i++) {
      cx.arc(100, 100, i * 2, i * 2, i * 2);
      cx.stroke()
    }
  }
  
  spiral(50)

  const spiral = (spirals, radius) => { // This one works
    cx.beginPath()
    for (let i = 0; i < spirals; i++) {
      cx.arc(100, 100, i * radius, i * Math.PI/10 , i * Math.PI/10); // took some fiddling with latter params though!
      cx.stroke()
    }
  }
  
  spiral(100, 0.6)

// 5 - STAR (couldn't quite get this one so got help!!)

  const star = (x, y, width, points) => {
    let halfWidth = width / 2;
    let xCentre = x + halfWidth;
    let yCentre = y + halfWidth;
    let inc = 2 * Math.PI / points; 
    let angle = 0;
    cx.beginPath();
    cx.moveTo(x + width, y + width / 2);
    for (let i = 0; i < points; i++) {
      angle += inc;
      cx.quadraticCurveTo(xCentre, yCentre, xCentre + Math.cos(angle) * halfWidth, yCentre + Math.sin(angle) * halfWidth);
    }
    cx.fillStyle = 'orange';
    cx.fill();
  }
  
  star(50, 50, 100, 6)

</script>

// PIE CHART ------------------------------------------------------------------

<canvas width="600" height="300"></canvas>
<script>
  let cx = document.querySelector("canvas").getContext("2d");
  let total = results
    .reduce((sum, {count}) => sum + count, 0);
  let currentAngle = -0.5 * Math.PI;
  let centerX = 300, centerY = 150; radius = 100;

  // Add code to draw the slice labels in this loop.
  for (let result of results) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    cx.arc(centerX, centerY, 100,
           currentAngle, currentAngle + sliceAngle);
    const prevAngle = currentAngle // save this value for later
    currentAngle += sliceAngle;

    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();
    
    // find half way between last angle and new angle
    const angleDiff = (prevAngle + currentAngle) / 2
    
    cx.fillStyle = result.color;
	  cx.textBaseline = 'middle';
    Math.cos(angleDiff) > 0 ? cx.textAlign = 'start' : cx.textAlign = 'end'

    cx.fillText(
      result.name, 
      centerX + Math.cos(angleDiff) * radius * 1.1, 
      centerY + Math.sin(angleDiff) * radius * 1.1
    );
  }
</script>
