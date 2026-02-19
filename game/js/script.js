const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const game_over = document.querySelector('.game-over')
const arrow_restart_span = document.querySelector('.restart')
const arrow_restart = document.querySelector('.fa-solid')
const score_span = document.querySelector('.score')
const jumpSound = new Audio('../game/assets/sound/mario_jump.wav')
const deadSound = new Audio('../game/assets/sound/mario_dead.wav')

const PIPE_POSITION_PX = 100
const MARIO_POSITION_PX = 150
const MARIO_BOTTOM_PX = `70px`

let interval = initGame()
let player_score = 0
let gameSpeed = 1.5

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space' || e.key === 'ArrowUp') {
       jump()
    }
})

document.addEventListener('touchstart', (e) => {
    jump()
})

function jump() {
    if (mario.classList.contains('jump')) return
    
    mario.classList.add('jump')
    jumpSound.play()

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500)
}

function initGame() {
    gameSpeed = 1.5
    pipe.style.animationDuration = `${gameSpeed}s`
    
    return setInterval(() => {
        const pipePosition = pipe.offsetLeft
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

        updateScore()

        if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 150) {
            gameOver(pipePosition, marioPosition)
            clearInterval(interval)
        }
    }, 10)
}

function updateScore() {
    player_score += 1
    score_span.innerHTML = `Score: ${Math.floor(player_score / 10)}`

    if (player_score % 500 === 0 && gameSpeed > 0.6) {
        gameSpeed -= 0.1 // Diminui o tempo da animação (fica mais rápido)
        pipe.style.animationDuration = `${gameSpeed}s`
    }
}

function gameOver(pipePosition, marioPosition) {
    jumpSound.pause()
    deadSound.play()

    pipe.style.animation = 'none'
    pipe.style.left = `${pipePosition}px`

    mario.style.animation = 'none'
    mario.style.bottom = `${marioPosition}px`
    
    mario.classList.add('active')
    game_over.classList.add('active')
    arrow_restart_span.classList.add('active')
}

function restartGame() {
    location.reload()
}

arrow_restart.addEventListener('click', restartGame)
