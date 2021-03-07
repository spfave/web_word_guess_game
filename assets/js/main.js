// DOM selectors
btnStart = document.getElementById("btn-start");
timer = document.getElementById("round-timer");
numWins = document.getElementById("num-wins");
numLosses = document.getElementById("num-losses");

// Variables
// let isRound = false;
const roundTime = 3; // seconds
const gameWords = [
  "variable",
  "array",
  "modulus",
  "object",
  "function",
  "string",
  "boolean",
];
let gameStats = {};
let roundWord = "";
let guessWord = "";

// Functions
function init() {
  getGameStats();
  renderGameStats();
}

function getGameStats() {
  const savedGameStats = JSON.parse(localStorage.getItem("gameStats"));

  if (savedGameStats !== null) {
    gameStats = savedGameStats;
  } else {
    gameStats = { wins: 0, losses: 0 };
  }
}

function renderGameStats() {
  numWins.textContent = gameStats.wins;
  numLosses.textContent = gameStats.losses;
}

function startRound() {
  selectWord();
  startTimer(roundTime);
}

function selectWord() {
  roundWord = randomChoice(gameWords).split("");
  guessWord = roundWord.map((c) => "_");
  console.log(roundWord);
  console.log(guessWord);

  // renderGuessWord(guessWord);
}

function startTimer(countDownTime) {
  let timeRemaining = countDownTime;
  timer.textContent = timeRemaining;

  const roundTimer = setInterval(() => {
    timeRemaining--;

    if (timeRemaining > 0) {
      timer.textContent = timeRemaining;
    } else {
      timer.textContent = timeRemaining;
      clearInterval(roundTimer);
    }
  }, 1000);
}

// Event Listeners
btnStart.addEventListener("click", () => {
  startRound();
});

// Website Execution
init();
