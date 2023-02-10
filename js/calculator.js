let hoursTime = document.querySelector('#hoursTime')
let hoursAndMinutes = document.querySelector('#hoursAndMinutes')
let minutesTime = document.querySelector('#minutes')
let startTime = document.querySelector("#startTime")
let finalTime = document.querySelector("#finalTime")
let operationRDs = document.querySelectorAll('input[type=radio][name="operations"]')

hoursTime.addEventListener('input', () => {
    let hoursTimeVal = Number(hoursTime.value)
    hoursAndMinutes.value = convertHoursToHoursAndMinutes(hoursTimeVal)
    minutesTime.value = convertHoursToMinutes(hoursTimeVal).toFixed(0)
})
hoursAndMinutes.addEventListener('input', () => {
    let hoursAndMinutesVal = hoursAndMinutes.value
    hoursTime.value = convertHoursAndMinutesToHours(hoursAndMinutesVal)
    minutesTime.value = convertHoursAndMinutesToMinutes(hoursAndMinutesVal)
})

minutesTime.addEventListener('input', () => {
    let minutesTimeVal = minutesTime.value
    hoursTime.value = convertMinutesToHours(minutesTimeVal)
    hoursAndMinutes.value = convertMinutesToHoursAndMinutes(minutesTimeVal)
})

startTime.addEventListener('input', () => {
    calculateTimeOpResult()
})
finalTime.addEventListener('input', () => {
    calculateTimeOpResult()
})

Array.prototype.forEach.call(operationRDs, (radio) => {
    radio.addEventListener('change', () => {
        document.querySelector('#opdisplay').innerHTML = document.querySelector('input[name="operations"]:checked').value
        calculateTimeOpResult()
    })
})


function splitHoursAndMinutes(hoursAndMinutes) {
    return hoursAndMinutes.split(':')
}

function convertHoursToMinutes(hours) {
    return Number(hours) * 60
}

function convertMinutesToHours(minutes) {
    return (parseInt(minutes) / 60).toFixed(2)
}

function convertHoursAndMinutesToMinutes(hoursAndMinutes) {
    let [hours, minutes] = splitHoursAndMinutes(hoursAndMinutes)
    let hoursInMinutes = convertHoursToMinutes(hours)
    if (hours[0] === '-') {
        minutes *= (-1)
    }
    return parseInt(hoursInMinutes) + parseInt(minutes)
}

function convertMinutesToHoursAndMinutes(minutes) {
    if (minutes < 0) {
        minutes *= (-1)
        let hours = parseInt(minutes / 60)
        minutes = parseInt(minutes % 60)
        hours = formatTimeLessThanNine(hours)
        minutes = formatTimeLessThanNine(minutes)
        return `-${hours}:${minutes}`
    }
    let hours = parseInt(minutes / 60)
    minutes = parseInt(minutes % 60)
    hours = formatTimeLessThanNine(hours)
    minutes = formatTimeLessThanNine(minutes)

    return `${hours}:${minutes}`
}

function convertHoursToHoursAndMinutes(hours) {
    return convertMinutesToHoursAndMinutes(convertHoursToMinutes(hours))
}
function convertHoursAndMinutesToHours(hoursAndMinutes) {
    return convertMinutesToHours(convertHoursAndMinutesToMinutes(hoursAndMinutes))
}
function formatTimeLessThanNine(time) {
    time = time <= 9 && time >= 0 ? ("0" + time) : time
    return time
}

function calculateDeltaTime(startTime, finalTime, operation) {
    switch (operation) {
        case '-':
            return Number(finalTime) - Number(startTime)
        case '+':
            return Number(finalTime) + Number(startTime)
        default:
            return Number(finalTime) - Number(startTime)
    }

}

function calculateTimeOpResult() {
    let result = ''
    let startTime = document.querySelector("#startTime").value
    let finalTime = document.querySelector("#finalTime").value
    let operation = document.querySelector('input[name="operations"]:checked').value;
    startTime = convertHoursAndMinutesToMinutes(startTime)
    finalTime = convertHoursAndMinutesToMinutes(finalTime)
    result = calculateDeltaTime(startTime, finalTime, operation)
    result = convertMinutesToHoursAndMinutes(result)
    document.querySelector('#result').value = `${result == 'NaN:NaN' ? '' : result}`
}