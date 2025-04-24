// Get elements from the DOM
let counter = document.getElementById("counter"); // Counter display element
let countingUpButton = document.getElementById("counting-up"); // Button to count up
let countingDownButton = document.getElementById("counting-down"); // Button to count down
let pauseButton = document.getElementById("pause"); // Button to pause the counter
let resetButton = document.getElementById("reset"); // Button to reset the counter
let divElement = document.getElementById("div"); // Div element for displaying messages

// Variables to manage the counter state
let interval; // Interval ID for the counter
let time = parseInt(localStorage.getItem("counterTime")) || 0; // Time in seconds, loaded from local storage or default to 0
let isCounting = false; // Flag to check if the counter is running
let isCountingUp = true; // Flag to check if counting up or down
const targetTime = 24 * 3600; // Target time in seconds (1 day)

// Display the initial counter value from local storage
counter.innerText = formatTime(time);

// Function to format time into HH:MM:SS
function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600); // Calculate hours
  let minutes = Math.floor((seconds % 3600) / 60); // Calculate minutes
  let secs = seconds % 60; // Calculate seconds
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`; // Format as HH:MM:SS
}

// Function to update the counter display
function updateCounter() {
  if (!isCounting) return; // If not counting, exit the function

  time += isCountingUp ? 1 : -1; // Increment or decrement time based on the direction
  if (time < 0) {
    time = 0; // Prevent time from going negative
    stopCounter(); // Stop the counter
    alert("Time's up!"); // Alert the user
  }

  counter.innerText = formatTime(time); // Update the counter display
  localStorage.setItem("counterTime", time); // Save the updated time to local storage

  // Check if the target time is reached
  if (time === targetTime) {
    onTargetReached(); // Trigger the target reached function
  }
}

// Function to start the counter
function startCounter(countUp) {
  stopCounter(); // Stop any existing counter
  isCountingUp = countUp; // Set the counting direction
  isCounting = true; // Set the counting flag to true
  toggleButtons(true); // Disable buttons while counting
  interval = setInterval(updateCounter, 1000); // Start the interval to update the counter every second
}

// Function to stop the counter
function stopCounter() {
  clearInterval(interval); // Clear the interval
  isCounting = false; // Set the counting flag to false
  toggleButtons(false); // Enable buttons
}

// Function to reset the counter
function resetCounter() {
  stopCounter(); // Stop the counter
  time = 0; // Reset time to 0
  counter.innerText = formatTime(time); // Update the counter display
  localStorage.setItem("counterTime", time); // Reset the counter in local storage
  divElement.innerHTML = ""; // Clear any popup messages
}

// Function to handle when the target is reached
function onTargetReached() {
  divElement.innerHTML = `
          <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong class="font-bold">Goal Reached!</strong>
            <span class="block sm:inline">You have reached the target of 1 day.</span>
          </div>
        `; // Display a styled popup message
  stopCounter(); // Stop the counter
}

// Function to toggle button states
function toggleButtons(disable) {
  countingUpButton.disabled = disable; // Enable/disable the counting up button
  countingDownButton.disabled = disable; // Enable/disable the counting down button
  pauseButton.disabled = !disable; // Enable/disable the pause button
  resetButton.disabled = !disable; // Enable/disable the reset button

  // Helper function to toggle CSS classes
  const toggleClass = (element, add) => {
    element.classList.toggle("opacity-50", add); // Add/remove opacity
    element.classList.toggle("cursor-not-allowed", add); // Add/remove not-allowed cursor
    element.classList.toggle("cursor-pointer", !add); // Add/remove pointer cursor
  };

  // Apply the toggleClass function to each button
  toggleClass(countingUpButton, disable);
  toggleClass(countingDownButton, disable);
  toggleClass(pauseButton, !disable);
  toggleClass(resetButton, !disable);
}

// Event listeners for button clicks
countingUpButton.addEventListener("click", () => startCounter(true)); // Start counting up
countingDownButton.addEventListener("click", () => startCounter(false)); // Start counting down
pauseButton.addEventListener("click", stopCounter); // Pause the counter
resetButton.addEventListener("click", resetCounter); // Reset the counter
