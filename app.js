// 25 minutes of milliseconds and variable for display time
let defaultTime = 1500000,
    breakTime = 300000,
    cacheTime,
    cacheBreakTime,
    timeToDisplay

//  create minutes and seconds vars for display
let minutes,
    seconds

// cache html elements
let timeDiv = document.querySelector('#timerOutput')
let breakDiv = document.querySelector('#breakOutput')
let startButton = document.querySelector('#start')
let pauseButton = document.querySelector('#pause')
let resetTimer = document.querySelector('#clear')
let timerMinusButton = document.querySelector('#timerMinus')
let timerPlusButton = document.querySelector('#timerPlus')
let breakMinusButton = document.querySelector('#breakMinus')
let breakPlusButton = document.querySelector('#breakPlus')
let timerDisplay = document.querySelector('#timerDisplay')
let breakDisplay = document.querySelector('#breakDisplay')


timeToDisplay = defaultTime
breakTimeToDisplay = breakTime
cacheTime = defaultTime
cacheBreakTime = breakTime


// SHorthand function only displays minutes 
let timerShorthand = (milliseconds) => {
    minutes = Math.floor(milliseconds / 1000 / 60 % 60)
    timeToDisplay = minutes * 60 * 1000

    minutes < 10 ? minutes = '0' + minutes : minutes = minutes

    timeDiv.innerText = minutes
    timerDisplay.innerText = minutes
}

let breakShorthand = (milliseconds) => {
    minutes = Math.floor(milliseconds / 1000 / 60 % 60)
    breakTimeToDisplay = minutes * 60 * 1000

    minutes < 10 ? minutes = '0' + minutes : minutes = minutes

    breakDisplay.innerText = minutes
    if(timeToDisplay < 0) {
        timeDiv.innerText = minutes
    }
}

//  Active timer displays time as loop is in progress
let activeTimer = (milliseconds) => {
    minutes = Math.floor(milliseconds / 1000 / 60 % 60)
    seconds = Math.floor(milliseconds / 1000 % 60)
    minutes < 10 ? minutes = '0' + minutes : minutes = minutes
    seconds < 10 ? seconds = '0' + seconds : seconds = seconds

    timeDiv.innerText = minutes + ' ' + seconds
}

let checkvar = false

let timer = () => {
	(checkvar === false && timeToDisplay >= 0) ? (
        activeTimer(timeToDisplay),
        timeToDisplay -= 1000,
        console.log('Running...'),
        pauseButton.addEventListener('click', pauseTimer),
        resetTimer.addEventListener('click', clearOutTimer),
        startButton.removeEventListener('click', timer),
        timerMinusButton.removeEventListener('click', decreaseTimer),
        timerPlusButton.removeEventListener('click', increaseTimer),

        setTimeout(timer, 1000)
	) : (checkvar === false && timeToDisplay === -1000 && breakTimeToDisplay >= 0) ? (
            activeTimer(breakTimeToDisplay),
            breakTimeToDisplay -= 1000,
            console.log('On break...'),

            setTimeout(timer, 1000)
    ) : (checkvar === false && timeToDisplay === -1000 && breakTimeToDisplay === -1000) ? (
            timeToDisplay = cacheTime,
            breakTimeToDisplay = cacheBreakTime,
            activeTimer(timeToDisplay),
            timeToDisplay -= 1000,

            setTimeout(timer, 1000)
    ) : (

            console.log('Timer cleared'),
            clearTimeout(timer),
            checkvar = false
	)
}

let pauseTimer = () => {
    checkvar = true,
    startButton.addEventListener('click', timer),
    pauseButton.removeEventListener('click', pauseTimer)
    timerPlusButton.addEventListener('click', increaseTimer),
    timerMinusButton.addEventListener('click', decreaseTimer)
}

let clearOutTimer = () => {
    checkvar = true,
    timeToDisplay = cacheTime,
    breakTimeToDisplay = cacheBreakTime,
    timerShorthand(timeToDisplay),
    startButton.addEventListener('click', timer),
    pauseButton.removeEventListener('click', pauseTimer),
    timerPlusButton.addEventListener('click', increaseTimer),
    timerMinusButton.addEventListener('click', decreaseTimer)
}


let increaseTimer = () => {
    timeToDisplay += 60000
    cacheTime += 60000
    timerShorthand(timeToDisplay)
}

let decreaseTimer = () => {
    if(timeToDisplay > 60000) {
        timeToDisplay -= 60000
        cacheTime -= 60000
     } else {
         return
     }
    timerShorthand(timeToDisplay)
}

let increaseBreak = () => {
    breakTimeToDisplay += 60000
    cacheTime += 60000
    breakShorthand(breakTimeToDisplay)
}

let decreaseBreak = () => {
    if(breakTimeToDisplay > 60000) {
        breakTimeToDisplay -= 60000
        cacheTime -= 60000
     } else {
         return
     }
    breakShorthand(breakTimeToDisplay)
}

// create function to make adjustTime an interval to be able to remove eventListeners

startButton.addEventListener('click', timer)
timerMinusButton.addEventListener('click', decreaseTimer)
timerPlusButton.addEventListener('click', increaseTimer)

breakMinusButton.addEventListener('click', decreaseBreak)
breakPlusButton.addEventListener('click', increaseBreak)

timerShorthand(timeToDisplay)
breakShorthand(breakTimeToDisplay)