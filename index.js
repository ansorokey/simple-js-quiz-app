const questions = [
    {
        q: 'Which pokemon is a fire type?',
        a: [
            {
                text: 'Piplup',
                correct: false
            },
            {
                text: 'turtwig',
                correct: false
            },
            {
                text: 'chimchar',
                correct: true
            }
        ]
    },
    {
        q: 'Which pokemon is a water type?',
        a: [
            {
                text: 'Piplup',
                correct: true
            },
            {
                text: 'Turtwig',
                correct: false
            },
            {
                text: 'Chimchar',
                correct: false
            }
        ]
    },
    {
        q: 'Which pokemon is a gras type?',
        a: [
            {
                text: 'Piplup',
                correct: false
            },
            {
                text: 'Turtwig',
                correct: true
            },
            {
                text: 'Chimchar',
                correct: false
            }
        ]
    }
]

const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-btn');

let questionIndex = 0;
let score = 0;

function showQuestion() {
    let currentQuestion = questions[questionIndex];
    let questionNumber = questionIndex + 1;
    questionElement.innerHTML = `${questionNumber}. ${currentQuestion.q}`;
}

// at the end of the game, set the index and score back to zero
function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

startQuiz();
