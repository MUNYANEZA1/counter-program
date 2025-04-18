let counter = 0;
const counterDisplay = document.getElementById("counter");
const resetButton = document.getElementById("reset");

function updateCounter(value) {
  counter += value;
  counterDisplay.textContent = counter;
}
function resetCounter() {
  counter = 0;
  counterDisplay.textContent = counter;
}