let counter = 0;
let divElement = document.getElementById("div");
// The targets variables
const positiveTarget = 504; // 21 days * 24  hours = 504 hours for counting up
const negativeTarget = -504; // -21 days * 24 hours = -504 hours for counting down

const counterDisplay = document.getElementById("counter");
const resetButton = document.getElementById("reset");

// Function to update the counter
// The function takes a value as an argument and adds it to the counter
// It also updates the displayed counter value and checks if the target is reached
function updateCounter(value) {
  counter += value;
  counterDisplay.textContent = counter;

  // Check if the counter has reached the target
  if (counter >= positiveTarget || counter <= negativeTarget) {
    onTargetReached();
  }
}
//Function to reset the counter
function resetCounter() {
  counter = 0;
  counterDisplay.textContent = counter;
}

//Function to handle when the target is reached
function onTargetReached() {
  divElement.innerHTML = `<h1 class="text-green-600 text-6xl font-bold">Target Reached!</h1>`;
}
