// DOM selectors
btnStart = document.getElementById("btn-start");
timer = document.getElementById("round-timer");

// Variables
const roundTime = 3; // seconds

// Functions
function startRound() {
  startTimer(roundTime);
}

function startTimer(countDownTime) {
  let timeRemaining = roundTime;
  timer.textContent = timeRemaining;

  const roundTimer = setInterval(() => {
    timeRemaining--;

    if (timeRemaining > 0) {
      timer.textContent = timeRemaining;
    } else {
      timer.textContent = timeRemaining;
      clearInterval(roundTime);
    }
  }, 1000);
}

// Event Listeners
btnStart.addEventListener("click", () => {
  startRound();
});
