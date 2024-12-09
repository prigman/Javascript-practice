const option1 = document.querySelector('.option1'),
option2 = document.querySelector('.option2'),
option3 = document.querySelector('.option3'),
option4 = document.querySelector('.option4')

const optionElements = document.querySelectorAll('.option')

const question = document.getElementById('question')

const numberOfQuestion = document.getElementById('number-of-question'),
numberOfAllQuestions = document.getElementById('number-of-all-questions')

let indexOfQuestion,
indexOfPage = 0

const answersTracker = document.getElementById('answers-tracker')

const btnNext = document.getElementById('btn-next')

let score = 0

const correctAnswer = document.getElementById('correct-answer'),
numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
btnTryAgain = document.getElementById('btn-try-again'),
btnTryAgainBad = document.getElementById('btn-try-again-bad')


const questions = [
    {
        question: 'Select the name of the String method that returns the position of the first occurrence of the specified value in the string',
        options: [
            'index()',
            'numberOf()',
            'position()',
            'indexOf()'
        ],
        rightAnswer: 3
    },
    {
        question: 'What the canvas tag is used for in HTML 5?',
        options: [
            'The canvas tag creates an area where you can draw different objects using JavaScript',
            'canvas serves as a basis for rendering images in img tags',
            'The tag replaces the body tag space and is used to create an image through JavaScript',
            'canvas is used for an alternative way of displaying an image with the img tag'
        ],
        rightAnswer: 0
    },
    {
        question: 'What is the value of Promise.resolve(5) in JavaScript?',
        options: [
           '5',
           'Promise {< pending >:5}',
           'Promise {< fulfilled >:5}',
           'Promise {< rejected >:5}'
        ],
        rightAnswer: 2
    },
    {
        question: 'console.log(Boolean(""))',
        options: [
           'true',
           'false',
           'Error',
        ],
        rightAnswer: 0
    }
]


numberOfAllQuestions.innerHTML = questions.length

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question

    option1.innerHTML = questions[indexOfQuestion].options[0]
    option2.innerHTML = questions[indexOfQuestion].options[1]
    option3.innerHTML = questions[indexOfQuestion].options[2]
    option4.innerHTML = questions[indexOfQuestion].options[3]

    numberOfQuestion.innerHTML = indexOfPage + 1
    indexOfPage++
}

let completedAnswers = []


const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length)
    let hitDuplicate = false
    
    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true
                }
            })
            if(hitDuplicate == true) {
                randomQuestion()
            } else {
                indexOfQuestion = randomNumber
                load()
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber
            load()
        }
    }
    completedAnswers.push(indexOfQuestion)
}

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct')
        updateAnswerTracker('correct')
        score++
    } else {
        el.target.classList.add('wrong')
        updateAnswerTracker('wrong')
    }
    disabledOptions()
}

for(option of optionElements) {
    option.addEventListener('click', (e) => checkAnswer(e)) 
}


const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled')
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct')
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong')
    })
}


const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Нужно выбрать один из ответов')
    } else {
        randomQuestion()
        enableOptions()
    }
}

btnNext.addEventListener('click', ()=> {
    validate()
})

const answerTracker = () => {
    questions.forEach( () => {
        const div = document.createElement('div')
        answersTracker.appendChild(div)
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
}


window.addEventListener('load', () => {
    randomQuestion()
    answerTracker()
})

const correctAnswerBad = document.getElementById('correct-answer-bad')
const numberOfAllQuestions3 = document.getElementById('number-of-all-questions-3')

const quizOver = () => {

    if(score < questions.length * 50 / 100) {
        correctAnswerBad.innerHTML = score
        numberOfAllQuestions3.innerHTML = questions.length
        document.querySelector('.quiz-over-modal-bad').classList.add('active')
    } else {
        correctAnswer.innerHTML = score
        numberOfAllQuestions2.innerHTML = questions.length
        document.querySelector('.quiz-over-modal').classList.add('active')
    }
    

}

const tryAgain = () => {
    window.location.reload()
}
btnTryAgain.addEventListener('click', tryAgain)
btnTryAgainBad.addEventListener('click', tryAgain)
