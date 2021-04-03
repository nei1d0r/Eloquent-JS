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

// A MONSTER ------------------------------------------------------------------

var Monster = class Monster {
    constructor(pos, speed, reset) {
        this.pos = pos
        this.speed = speed
        this.reset = reset
    }

    get type() {
        return 'monster'
    }

    static create(pos, ch) {
        if (ch == 'M') {
            return new Monster(
                pos.plus(new Vec(0, -1)), // adjust pos to accommodate height
                new Vec(0, 0) // movement vector (0,0 no movement)
            )
        }
    }
}

Monster.prototype.size = new Vec(1.2, 2)

// collide prototype function
Monster.prototype.collide = function (state) {
    let player = state.player
    let monster = this
    if (monster.pos.y - player.pos.y > 1) { // land on top, it disappears (used coin style here)
      let filtered = state.actors.filter(a => a != this)
      return new State(state.level, filtered, state.status)
    } else {
      return new State(state.level, state.actors, 'lost') // any other point causes DEATH
    }
}

Monster.prototype.update = function (time, state) {
    let newPos = this.pos.plus(this.speed.times(time))
    if (!state.level.touches(newPos, this.size, 'wall')) {
        return new Monster(newPos, this.speed, this.reset)
    } else if (this.reset) {
        return new Monster(this.reset, this.speed, this.reset)
    } else {
        return new Monster(this.pos, this.speed.times(-1))
    }
}
