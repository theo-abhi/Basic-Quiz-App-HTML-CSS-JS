const quizData = [
  {
    question: "What is the capital of India?",
    options: ["New Delhi", "Chandigarh", "Mumbai", "Kolkata"],
    correct: 0,
    time: 15,
  },
  {
    question: "Which is the national animal of India?",
    options: ["Elephant", "Tiger", "Lion", "Peacock"],
    correct: 1,
    time: 15,
  },
  {
    question: "What is the national currency of India called?",
    options: ["Rupee", "Dollar", "Yuan", "Pound"],
    correct: 0,
    time: 15,
  },
  {
    question: "Which is the longest river in India?",
    options: ["Yamuna", "Brahmaputra", "Ganges", "Godavari"],
    correct: 2,
    time: 15,
  },
  {
    question: "In which year did India gain independence?",
    options: ["1946", "1948", "1945", "1947"],
    correct: 3,
    time: 15,
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft;
let timer;

function loadQuestion() {
  const question = quizData[currentQuestion];
  document.querySelector(".question").textContent = question.question;
  const options = document.querySelectorAll(".option");
  options.forEach((option, index) => {
    option.textContent = question.options[index];
    option.className = "option";
  });
  updateProgress();
  startTimer();
}

function startTimer() {
  timeLeft = quizData[currentQuestion].time;
  document.getElementById("time").textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = " " + timeLeft;
    if (timeLeft <= 0) nextQuestion();
  }, 1000);
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  document.querySelector(".progress").style.width = `${progress}%`;
  document.getElementById("current-question").textContent =
    currentQuestion + 1 + "/" + quizData.length;
}

document.querySelectorAll(".option").forEach((option) => {
  option.addEventListener("click", function () {
    clearInterval(timer);
    const correctIndex = quizData[currentQuestion].correct;
    const options = document.querySelectorAll(".option");
    options.forEach((option, index) => {
      option.classList.add(index === correctIndex ? "correct" : "wrong");
    });
    if (Array.from(options).indexOf(this) === correctIndex) score++;
    setTimeout(nextQuestion, 1500);
  });
});

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.querySelector(".quiz-container").innerHTML = `
    <div class="result-screen">
        <h2>Quiz Completed</h2>
        <div class="result-score">${score}/${quizData.length}</div>
        <button class="retry-btn" onCLick="location.reload()">Restart</button>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
});
