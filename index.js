const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random"
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const nexButtonElement = document.getElementById('nextButton')

quoteInputElement.addEventListener("input", () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]

        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if (correct) {
        nexButtonElement.classList.remove('display-none')
        quoteInputElement.classList.add('display-none')
        timerElement.classList.add("display-none")
    } else {
        nexButtonElement.classList.add('display-none')
        quoteInputElement.classList.remove('display-none')
        timerElement.classList.remove("display-none")
    }
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerHTML = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
}


let startTime
function startTimer() {
    startTime = new Date()
    timerElement.innerText = 0
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}


function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

quoteInputElement.addEventListener("click", () => {
    startTimer()
})

nexButtonElement.addEventListener("click", () => {
    renderNewQuote()
    nexButtonElement.classList.add("display-none")
    quoteInputElement.classList.remove("display-none")
})

renderNewQuote()