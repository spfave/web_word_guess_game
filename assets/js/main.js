// DOM selectors
timer = document.getElementById("round-timer");
wordChars = document.getElementById("word-characters");
btnStart = document.getElementById("btn-start");
// btnReset = document.getElementById("btn-reset");
numWins = document.getElementById("num-wins");
numLosses = document.getElementById("num-losses");

// Variables
// let isRound = false;
let isWin = false;
const roundTime = 5; // seconds
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

function setGameStats() {
  localStorage.setItem("gameStats", JSON.stringify(gameStats));
}

// function resetGameStats() {}

function renderGameStats() {
  numWins.textContent = gameStats.wins;
  numLosses.textContent = gameStats.losses;
}

function startRound() {
  isWin = false;
  // btnStart.disabled = true;
  selectWord();
  startTimer(roundTime);
}

function selectWord() {
  roundWord = randomChoice(gameWords).split("");
  guessWord = roundWord.map((c) => "_");

  renderGuessWord(guessWord);
}

function renderGuessWord(word) {
  wordChars.textContent = word.join(" ");
}

function startTimer(countDownTime) {
  let timeRemaining = countDownTime;
  timer.textContent = timeRemaining;

  const roundTimer = setInterval(() => {
    timeRemaining--;

    if (timeRemaining > 0) {
      timer.textContent = timeRemaining;
      if (isWin) {
        clearInterval(roundTimer);
        roundWon();
      }
    } else {
      timer.textContent = timeRemaining;
      clearInterval(roundTimer);
      roundLost();
    }
  }, 1000);
}

function roundWon() {
  gameStats.wins++;
  renderGameStats();
  setGameStats();
}

function roundLost() {
  gameStats.losses++;
  renderGameStats();
  setGameStats();
}

function checkCharacterGuess(letter) {
  if (roundWord.includes(letter)) {
    for (const [i, char] of roundWord.entries()) {
      if (char === letter) {
        guessWord[i] = letter;
      }
    }

    renderGuessWord(guessWord);
    checkWordGuess();
  }
}

function checkWordGuess() {
  if (roundWord.join("") === guessWord.join("")) {
    isWin = true;
  }
}

// Event Listeners
btnStart.addEventListener("click", () => {
  startRound();
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (letters.includes(key)) {
    checkCharacterGuess(key);
  }
});

// Website Execution
init();
