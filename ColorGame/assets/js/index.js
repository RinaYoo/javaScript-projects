// -------------------------
// DOM Selectors
// -------------------------
var modeBtns = document.querySelectorAll(".console__btn--mode");
var boxes = document.querySelectorAll(".color-list__item");
var headingColor = document.querySelector(".heading-primary__color");
var heading = document.querySelector(".heading-primary");
var resetBtn = document.querySelector(".console__btn");
var resultDisplay = document.querySelector(".console__text");

// -------------------------
// Variables
// -------------------------
var numOfBoxes;
var colors = [];
var pickedColor;
var gameOver = false;

init();

function init() {
  setInitialMode();
  displayColors();
  setEventListeners();
}

// -------------------------
// Helper functions
// -------------------------
function setInitialMode() {
  modeBtns[1].classList.add("console__btn--selected");
  numOfBoxes = 6;
}

function displayColors() {
  colors = [];

  for (var i = 0; i < boxes.length; i++) {
    changeOpacity(i);

    if (i < numOfBoxes) {
      var color = generateColor();
      boxes[i].style.backgroundColor = color;
      colors.push(color);

      if (boxes[i].style.display === "none") {
        boxes[i].style.display = "inline-block";
      }
    } else {
      boxes[i].style.display = "none";
    }
  }

  var answerColor = colors[randomNum(numOfBoxes)];
  pickedColor = answerColor;
  headingColor.textContent = answerColor;
  resultDisplay.textContent = "";

  if (gameOver === true) {
    gameOver = false;
    heading.style.backgroundColor = "#4682B4";
    resetBtn.textContent = "new colors";
  }
}

function generateColor() {
  var color = [];

  for (var i = 0; i < 3; i++) {
    color.push(randomNum(256));
  }

  return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
}

function randomNum(maxNum) {
  return Math.floor(Math.random() * maxNum);
}

function setEventListeners() {
  // -------------------------
  // Event Listeners
  // -------------------------
  for (var i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener("click", changeMode);
  }
  resetBtn.addEventListener("click", displayColors);

  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", checkAnswer);
  }
}

function changeMode(e) {
  modeBtns[0].classList.remove("console__btn--selected");
  modeBtns[1].classList.remove("console__btn--selected");
  colors = [];

  if (e.target === modeBtns[0]) {
    numOfBoxes = 3;
    modeBtns[0].classList.add("console__btn--selected");
  } else if (e.target === modeBtns[1]) {
    numOfBoxes = 6;
    modeBtns[1].classList.add("console__btn--selected");
  }

  displayColors();
}

function checkAnswer(e) {
  var heading = document.querySelector(".heading-primary");

  if (e.target.style.backgroundColor === pickedColor) {
    heading.style.backgroundColor = pickedColor;
    resultDisplay.textContent = "correct!";
    gameOver = true;

    for (var i = 0; i < boxes.length; i++) {
      changeOpacity(i);

      boxes[i].style.backgroundColor = pickedColor;
      resetBtn.textContent = "play again?";
    }
  } else {
    resultDisplay.textContent = "try again!";
    e.target.style.opacity = "0";
  }
}

function changeOpacity(i) {
  if (boxes[i].style.opacity === "0") {
    boxes[i].style.opacity = "1";
  }
}
