let quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Uranus"],
        correctAnswer: 2
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;
let isSubmitted = false;

document.addEventListener("DOMContentLoaded", function() {
    renderQuestion();
});

document.getElementById("submit-btn").addEventListener("click", function() {
    let selectedOption = document.querySelector("input[name='option']:checked");
    if (selectedOption) {
        let userAnswer = selectedOption.id.replace("option", "");
        if (userAnswer == quizData[currentQuestionIndex].correctAnswer) {
            score++;
        }
        isSubmitted = true;
        document.getElementById("next-btn").style.display = "block";
        document.getElementById("submit-btn").style.display = "none";
    }
});

document.getElementById("next-btn").addEventListener("click", function() {
    if (isSubmitted) {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            renderQuestion();
            document.getElementById("next-btn").style.display = "none";
            document.getElementById("submit-btn").style.display = "block";
            isSubmitted = false;
        } else {
            displayResults();
        }
    } else {
        document.getElementById("error-message").textContent = "Please submit your answer first!";
        document.getElementById("error-message").style.display = "block";
    }
});

function renderQuestion() {
    let questionText = document.getElementById("question-text");
    let optionsList = document.getElementById("options-list");
    let question = quizData[currentQuestionIndex];
    questionText.textContent = question.question;
    optionsList.innerHTML = "";
    for (let i = 0; i < question.options.length; i++) {
        let option = document.createElement("li");
        option.innerHTML = `<input type="radio" id="option${i}" name="option"><label for="option${i}">${question.options[i]}</label>`;
        optionsList.appendChild(option);
    }
}

function displayResults() {
    let resultText = document.getElementById("result-text");
    resultText.textContent = `You scored ${score} out of ${quizData.length}!`;
}
