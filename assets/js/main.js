// DOM selectors
const timer = document.getElementById("round-timer");
const wordChars = document.getElementById("word-characters");
const btnStart = document.getElementById("btn-start");
const btnReset = document.getElementById("btn-reset");
const numWins = document.getElementById("num-wins");
const numLosses = document.getElementById("num-losses");

// Variables
// let isRound = false;
let isWin = false;
const roundTime = 10; // seconds
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
let timeRemaining;

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

function resetGameStats() {
  gameStats = { wins: 0, losses: 0 };
  renderGameStats();
  timer.textContent = "0";
  timer.style.color = "#333";
  wordChars.textContent = "Guess a Word";
}

function renderGameStats() {
  numWins.textContent = gameStats.wins;
  numLosses.textContent = gameStats.losses;
  setGameStats();
}

function startRound() {
  isWin = false;
  btnStart.disabled = true;
  btnReset.disabled = true;
  timer.style.color = "#333";
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
  timeRemaining = countDownTime;
  timer.textContent = timeRemaining;

  const roundTimer = setInterval(() => {
    timeRemaining--;

    if (timeRemaining > 0) {
      if (timeRemaining === 3) {
        timer.style.color = "red";
      }
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
  wordChars.textContent = "You Got the W! 🎉";
  btnStart.disabled = false;
  btnReset.disabled = false;
  gameStats.wins++;
  renderGameStats();
}

function roundLost() {
  wordChars.textContent = "Better luck next time";
  btnStart.disabled = false;
  btnReset.disabled = false;
  gameStats.losses++;
  renderGameStats();
}

function checkCharacterGuess(letter) {
  if (!timeRemaining) {
    return;
  }

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

btnReset.addEventListener("click", () => {
  resetGameStats();
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (letters.includes(key)) {
    checkCharacterGuess(key);
  }
});

// Website Execution
init();
