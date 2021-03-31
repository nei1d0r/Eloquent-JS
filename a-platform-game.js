// GAME OVER -------------------------------------------

var DOMDisplay = class DOMDisplay {
    constructor(parent, level, lives) {
        this.dom = elt('div', { class: 'game' }, drawGrid(level))
        this.actorLayer = null

        // append player lives to DOM
        function removeElementsByClass(className){
          var elements = document.getElementsByClassName(className);
          while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
          }
        }
        removeElementsByClass('playerLives')

        const playerLives = document.createElement('p')
        playerLives.setAttribute('class', 'playerLives')
        parent.appendChild(playerLives)
        parent.appendChild(this.dom)

        playerLives.textContent = `Lives: ${lives}`
    }

    clear() {
        this.dom.remove()
    }
}

function runLevel(level, Display, playerLives) {
    let display = new Display(document.body, level, playerLives)
    let state = State.start(level)
    let ending = 1
    return new Promise((resolve) => {
        runAnimation((time) => {
            state = state.update(time, arrowKeys)
            display.syncState(state)
            if (state.status == 'playing') {
                return true
            } else if (ending > 0) {
                ending -= time
                return true
            } else {
                display.clear()
                resolve(state.status)
                return false
            }
        })
    })
}

async function runGame(plans, Display) {
  let playerLives = 3
  for (let level = 0; level < plans.length;) {
    let status = await runLevel(new Level(plans[level]), Display, playerLives); // added player lives here in order to render to dom
    if (status == "won") level++;
    if (status == "lost") playerLives--
    if (playerLives <= 0) {
      console.log('Ran out of lives, Restarting')
      level = 0
      playerLives = 3
    }
  }
  console.log("You've won!");
}

// PAUSING THE GAME --------------------------------------------------

function trackKeys(keys) {
    let down = Object.create(null)
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == 'keydown'
            event.preventDefault()
        }
    }
    window.addEventListener('keydown', track)
    window.addEventListener('keyup', track)
    down.unregister = () => { // unregister, to remove handlers
        window.removeEventListener('keydown', track)
        window.removeEventListener('keyup', track)
    }
    return down
}

var arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp'])

function runAnimation(frameFunc) {
    let lastTime = null
    function frame(time) {
        if (lastTime != null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000
            if (frameFunc(timeStep) === false) return
        }
        lastTime = time
        requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
}

function runLevel(level, Display, playerLives) {
    let display = new Display(document.body, level, playerLives)
    let state = State.start(level)
    let ending = 1

    return new Promise((resolve) => {
        let paused = false
        const isGamePaused = () => paused
        const pauseOrPlay = (e) => {
            if (e.key == 'Escape') {
                paused = !paused
            }
        }
        const waitForResume = () => {
            if (isGamePaused()) {
                setTimeout(waitForResume, 100)
            } else {
                runAnimation(animate)
            }
        }
        const animate = (time) => {
            state = state.update(time, arrowKeys)
            display.syncState(state)
            if (isGamePaused()) {
                waitForResume()
                return false
            } else if (state.status == 'playing') {
                return true
            } else if (ending > 0) {
                ending -= time
                return true
            } else {
                display.clear()
                resolve(state.status)
                document.removeEventListener('keydown', pauseOrPlay)
                arrowKeys.unregister()
                return false
            }
        }

        document.addEventListener('keydown', pauseOrPlay)
        let arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Escape'])
        runAnimation(animate)
    })
}
