// DOM selectors
const timer = document.getElementById("round-timer");
const wordChars = document.getElementById("word-characters");
const btnStart = document.getElementById("btn-start");
const btnReset = document.getElementById("btn-reset");
const numWins = document.getElementById("num-wins");
const numLosses = document.getElementById("num-losses");

// Variables
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
let isWin = false;
let roundWord = "";
let guessWord = "";
let timeRemaining;

//Utility Functions
// Sets disabled state of page buttons (state: true -> buttons disabled, false -> buttons enabled)
function setButtonStatus(state) {
  btnStart.disabled = state;
  btnReset.disabled = state;
}

// Functions
// init function is called on page load
function init() {
  getGameStats();
  renderGameStats();
}

// Retrieves game stats (win and loss count) from local storage
function getGameStats() {
  const savedGameStats = JSON.parse(localStorage.getItem("gameStats"));

  if (savedGameStats !== null) {
    gameStats = savedGameStats;
  } else {
    gameStats = { wins: 0, losses: 0 };
  }
}

// records game stats (win and loss count) to local storage
function setGameStats() {
  localStorage.setItem("gameStats", JSON.stringify(gameStats));
}

// Resets game stats to zero
function resetGameStats() {
  gameStats = { wins: 0, losses: 0 };
  renderGameStats();
  timer.textContent = "0";
  timer.style.color = "#333";
  wordChars.textContent = "Guess a Word";
}

// Renders game stats to window
function renderGameStats() {
  numWins.textContent = gameStats.wins;
  numLosses.textContent = gameStats.losses;
  setGameStats();
}

// Called when clicking 'Start Round' button, starts a word guess round
function startRound() {
  isWin = false;
  timer.style.color = "#333";
  setButtonStatus(true);
  selectWord();
  startTimer(roundTime);
}

// Selects a random word for word library
function selectWord() {
  roundWord = randomChoice(gameWords).split("");
  guessWord = roundWord.map((c) => "_");
  renderGuessWord(guessWord);
}

// Renders guess word to window
function renderGuessWord(word) {
  wordChars.textContent = word.join(" ");
}

// Starts game round timer
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

// Called when the win conditions is met
function roundWon() {
  wordChars.textContent = "You Got the W! 🎉";
  gameStats.wins++;
  setButtonStatus(false);
  renderGameStats();
}

// Called if the timer reaches zero
function roundLost() {
  wordChars.textContent = "Better luck next time";
  gameStats.losses++;
  setButtonStatus(false);
  renderGameStats();
}

// Checks a letter guess against the round word and renders correct guess to window
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

// Checks if complete word has been guessed
function checkWordGuess() {
  if (roundWord.join("") === guessWord.join("")) {
    isWin = true;
  }
}

// Event Listeners
// Event listeners on buttons
btnStart.addEventListener("click", () => {
  startRound();
});

btnReset.addEventListener("click", () => {
  resetGameStats();
});

// Event listener on document for letter keypress
document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (letters.includes(key)) {
    checkCharacterGuess(key);
  }
});

// Website Execution
init();
