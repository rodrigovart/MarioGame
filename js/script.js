const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const game_board = document.querySelector('.game-board')

document.addEventListener('keypress', (e) => {
    mario.classList.toggle('jump')

    let timeout = setTimeout(() => {
        mario.classList.toggle('jump')
        clearTimeout(timeout)
    }, 500)
})

let interval = setInterval(() => {
    let pipePosition = pipe.offsetLeft
    let marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    if (pipePosition <= 115 && pipePosition > 0 && marioPosition < 180) {
        gameOver(pipePosition, marioPosition)
        clearInterval(interval)
    }
}, 10)

function gameOver(pipePosition, marioPosition) {
    pipe.style.animation = 'none'
    pipe.style.left = `${pipePosition}px`
    mario.style.bottom = `${marioPosition}px`
    mario.src = '/assets/mario-game-over.png'
    mario.style.width = '60px'
    mario.style.marginLeft = '50px'
}