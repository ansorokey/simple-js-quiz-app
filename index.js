// use an array of questions for the quiz
// each question has a question text, and an array of answers
// each answer has text and is either correct or incorrect
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

// reference elements on the page
const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-btn');

// we'll refer to the current question by an index, starting at the first
let questionIndex = 0;
// start with a score of 0
let score = 0;

// when the next button is clicked:
nextButton.addEventListener('click', () => {
    // we check to see if there is a next question
    if(questionIndex < questions.length) {
        // if so, set up the next question
        handleNextButton();
    } else {
        // otherwise, show the score and end the quiz
        startQuiz();
    }
})

startQuiz();

// When there are no more questions to display, show the score
function showScore() {
    // clears the questions and next button
    resetState();

    // show the score
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    // change the button text to play again
    nextButton.innerHTML = 'Play again';
    // show the button
    nextButton.style.display = 'block';
}

// when the next button is clicked
function handleNextButton() {
    // increase the index
    questionIndex += 1;
    // if there is a question at that index
    if(questionIndex < questions.length) {
        // set up the question
        showQuestion();
    } else {
        // end the game and show the score
        showScore();
    }
}

// removes all the answers from the page and hides the next button
function resetState() {
    nextButton.style.display = 'none';
    // removes the first child element one by one
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// when a button is clicked on
function selectAnswer(e) {
    const selection = e.target;
    // we check to see if that button was the one holding the correct answer (true) dataset
    const isCorrect = selection.dataset.correct === 'true';
    // if it was:
    if(isCorrect) {
        // change the css to show correct
        selection.classList.add('correct');
        // add increase the score
        score += 1;
    } else {
        // change the css to incorrect
        selection.classList.add('incorrect')
    }

    // whether the answer was right or wrong,
    // turn the buttons into an array and
    Array.from(answerButtons.children).forEach( btn => {
        // go through each answer and change the css of the correct answer
        if(btn.dataset.correct === "true") {
            btn.classList.add('correct');
        }
        // also disable each button so they cannot be fired again
        btn.disabled = true;
    });
    // show the next button
    nextButton.style.display = 'block';
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[questionIndex];
    let questionNumber = questionIndex + 1;
    questionElement.innerHTML = `${questionNumber}. ${currentQuestion.q}`;

    // iterate through each of the questions answers
    currentQuestion.a.forEach( ans => {
        // create a answer button
        const button = document.createElement('button');
        // add it's text as content
        button.innerHTML = ans.text;
        // add the 'answer button' class
        button.classList.add('btn');
        if(ans.correct) {
            button.dataset.correct = ans.correct;
        }
        // add an on click event listener to the buttons
        button.addEventListener('click', selectAnswer)
        // add the button to the parent container
        answerButtons.appendChild(button);
    });
}

// at the start or end of the game, set the index and score back to zero
function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}
