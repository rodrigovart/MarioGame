const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const game_over = document.querySelector('.game-over')
const arrow_restart_span = document.querySelector('.restart')
const arrow_restart = document.querySelector('.fa-solid')
const score_span = document.querySelector('.score')

const PIPE_POSITION_PX = 115
const MARIO_POSITION_PX = 180
const MARIO_BOTTOM_PX = `70px`

let interval = initGame()
let player_score = 0

document.addEventListener('keypress', (e) => {
    if (mario.classList[1]) {
        return false
    }

    mario.classList.toggle('jump')

    let timeout = setTimeout(() => {
        mario.classList.toggle('jump')
        clearTimeout(timeout)
    }, 500)
})

function initGame() {
    return setInterval(() => {
        let pipePosition = pipe.offsetLeft
        let marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

        score()

        if (pipePosition <= PIPE_POSITION_PX && pipePosition > 0 && marioPosition < MARIO_POSITION_PX) {
            gameOver(pipePosition, marioPosition)
            clearInterval(interval)
        }
    }, 10)
}

function score(stop = false) {
    if (!stop) {
        player_score += 1
        score_span.innerHTML = player_score.toFixed(0)
    } else {
        player_score = 0
    }
}

function gameOver(pipePosition, marioPosition) {
    pipe.classList.toggle('active')
    pipe.style.left = `${pipePosition}px`
    mario.style.bottom = `${marioPosition}px`
    mario.classList.toggle('active')
    game_over.classList.toggle('active')
    arrow_restart_span.classList.toggle('active')

    score(true)
}

arrow_restart.addEventListener('click', (e) => {
    restartGame()
})

function restartGame() {
    pipe.style.removeProperty('left')
    pipe.classList.toggle('active')
    mario.classList.toggle('active')
    mario.style.bottom = MARIO_BOTTOM_PX
    game_over.classList.toggle('active')
    arrow_restart_span.classList.toggle('active')
    interval = initGame()
}