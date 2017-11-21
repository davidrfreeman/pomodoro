// 25 minutes of milliseconds and variable for display time
let countdownTime = 1500000,
    timeToDisplay

//  create minutes and seconds vars for display
let minutes,
    seconds

// cache html elements
let timeDiv = document.querySelector('#output')
let startButton = document.querySelector('#start')
let pauseButton = document.querySelector('#pause')
let resetTimer = document.querySelector('#clear')
let minusButton = document.querySelector('#minus')
let plusButton = document.querySelector('#plus')


timeToDisplay = countdownTime

let displayTime = () => {
    minutes = Math.floor(timeToDisplay / 1000 / 60 % 60)
    seconds = Math.floor(timeToDisplay / 1000 % 60)
    minutes < 10 ? minutes = '0' + minutes : minutes = minutes
    seconds < 10 ? seconds = '0' + seconds : seconds = seconds

    timeDiv.innerText = minutes + ' ' + seconds
}

let checkvar = false

let timer = () => {
	checkvar === false && timeToDisplay > 0 ? (
        displayTime(),
        timeToDisplay -= 1000,
        console.log('Running...'),
        pauseButton.addEventListener('click', pauseTimer),
        resetTimer.addEventListener('click', clearOutTimer),
        startButton.removeEventListener('click', timer),
        minusButton.removeEventListener('click', removeTime),
        plusButton.removeEventListener('click', addTime),

        setTimeout(timer, 1000)
	) : (
        console.log('Timer cleared'),
        displayTime(),
        clearTimeout(timer),
        checkvar = false
	)
}

let pauseTimer = () => {
    checkvar = true,
    startButton.addEventListener('click', timer),
    pauseButton.removeEventListener('click', pauseTimer)
}

let clearOutTimer = () => {
    checkvar = true,
    timeToDisplay = countdownTime,
    displayTime(),
    startButton.addEventListener('click', timer),
    pauseButton.removeEventListener('click', pauseTimer),
    plusButton.addEventListener('click', addTime),
    minusButton.addEventListener('click', removeTime)
}


let addTime = () => {
    timeToDisplay += 60000
    displayTime()
}

let removeTime = () => {
    if(timeToDisplay > 60000) {
        timeToDisplay -= 60000
     } else {
         return
     }
    displayTime()
}

// create function to make adjustTime an interval to be able to remove eventListeners

startButton.addEventListener('click', timer)
minusButton.addEventListener('click', removeTime)
plusButton.addEventListener('click', addTime)

displayTime()