const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector(".time-list")
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = ['#d06060', '#e48c44', '#c2cd22', '#2fb748', '#20beee', '#3d49ef', '#970c99']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {    
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    }else {
        let current = --time
        setTime(current)
    }    
}

function setTime(value) {
    const minutes = Math.floor(value / 60)
    let sec = value - minutes * 60    
    if (sec < 10) sec = `0${sec}`

    timeEl.innerHTML = `0${minutes}:${sec}`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}
