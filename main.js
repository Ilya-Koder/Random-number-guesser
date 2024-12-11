//random number guesser

let randomNumber = 0;
let tries = 0;
let maxNumber = 100; // Default for Easy

// Difficulty settings
const difficultySettings = {
  easy: { min: 1, max: 100 },
  medium: { min: 1, max: 1000 },
  hard: { min: 1, max: 10000 },
};

// Start screen elements
const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen");
const difficultyDisplay = document.querySelector("#difficultyDisplay");

// Game elements
const inputElement = document.querySelector("#numberInput");
const guessButton = document.querySelector("#guessButton");
const triesCounter = document.querySelector("#triesCounter");
const answerList = document.querySelector("#previousAnswers");

// Event listeners for difficulty selection
document
  .querySelector("#easyButton")
  .addEventListener("click", () => startGame("easy"));
document
  .querySelector("#mediumButton")
  .addEventListener("click", () => startGame("medium"));
document
  .querySelector("#hardButton")
  .addEventListener("click", () => startGame("hard"));

// Event listener for the guess button
guessButton.addEventListener("click", guessNumber);

// Start the game by setting difficulty
function startGame(difficulty) {
  // Hide start screen and show game screen
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  // Set difficulty settings
  maxNumber = difficultySettings[difficulty].max;
  const minNumber = difficultySettings[difficulty].min;

  // Update the game screen with difficulty information
  difficultyDisplay.textContent = `Difficulty: ${
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
  } (1 - ${maxNumber})`;

  // Generate a new random number within the selected range
  randomNumber =
    Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

  // Reset tries and update counter
  tries = 0;
  updateTriesCounter();
}

// Handle the user's guess
function guessNumber() {
  const inputValue = convertStringToNumber(inputElement.value);

  if (inputValue === 0) {
    addLiYoAnswerList("Please enter a valid number.");
    return;
  }

  tries++;
  updateTriesCounter();

  if (randomNumber === inputValue) {
    addLiYoAnswerList(
      `${inputValue} is the correct number! You did it in ${tries} tries!`
    );
  } else if (inputValue > randomNumber) {
    addLiYoAnswerList(`The number is smaller than ${inputValue}. Try again!`);
  } else {
    addLiYoAnswerList(`The number is larger than ${inputValue}. Try again!`);
  }

  inputElement.value = ""; // Clear input field
}

// Update the tries counter on the screen
function updateTriesCounter() {
  triesCounter.textContent = `Tries: ${tries}`;
}

// Convert string to number (with basic validation)
function convertStringToNumber(str) {
  const num = Number(str);
  return isNaN(num) ? 0 : num;
}

// Add feedback to the answer list
function addLiYoAnswerList(str) {
  const text = document.createElement("li");
  text.textContent = str;
  answerList.prepend(text);
}
