var title = document.querySelector("#title");
title.addEventListener("click", () => {
  var gameScreen = document.querySelector("#game-screen");
  gameScreen.style.display = "none";
  var categoriesContainer = document.querySelector(".categories-container");
  categoriesContainer.style.display = "flex";
});

var categoriesContainer = document.querySelector(".categories-container");

var data = {
  feelings: ["happy", "sad"],
  foods: [
    "bread",
    "curryandrice",
    "frenchfries",
    "hamburger",
    "grilledfish",
    "omelet",
    "pancakes",
    "pie",
    "pizza",
    "rice",
    "riceball",
    "friedchicken",
    "salad",
    "sandwich",
    "sausage",
    "spaghetti",
    "steak",
  ],
  fruits: ["melon"],
  sports: ["baseball", "badminton"],
  animals: [
    "bear",
    "cow",
    "horse",
    "dog",
    "cat",
    "snake",
    "spider",
    "mouse",
    "sheep",
    "tiger",
    "panda",
    "monkey",
  ],
};

// Get the categories from the DOM elements
var categories = Array.from(categoriesContainer.children);

var categoriesArray = [];
categories.forEach((el) => {
  categoriesArray.push(el.classList[1]);
});
// console.log(categoriesArray);

// var animalsCategory = document.querySelector(".animals");
// var sportCategory = document.querySelector(".sports");
// var foodCategory = document.querySelector(".food");
// var fruitCategory = document.querySelector(".fruits");

var gameScreen = document.querySelector("#game-screen");

for (i = 0; i < categoriesArray.length; i++) {
  var categoryElement = document.querySelector("." + categoriesArray[i]);
  var category = categoryElement.classList[1];

  // console.log(data[category]);
  // console.log(itemsArray);
  // console.log(category.classList[1]);
  categoryElement.addEventListener("click", () => {
    gameScreen.style.display = "flex";
    categoriesContainer.style.display = "none";

    var words = data[category];
    // console.log(data[category]);

    // All words to lowercase
    // words = words.concat(words);
    words = words.map((word) => word.toLowerCase());
    words = words.sort((a, b) => 0.5 - Math.random());

    addLevelSelector();
    gameStart(words, category);
  });
}

// var getRandomNum = () => Math.floor(Math.random() * words.length);

// Change the word
// function getRandomWord(words) {
//   var word = words.pop();
//   return word;
// }

function addLevelSelector() {
  var levelSelector = document.querySelector("select#level-selector");
  levelSelector.style.backgroundColor = "lightgreen";
  var cover = document.querySelector("#cover");
  // console.log(levelSelector.value);
  levelSelector.addEventListener("change", () => {
    var letterBoxes = document.querySelectorAll(".letter");
    // console.log(letterBoxes.length);
    if (letterBoxes.length > 0) {
      letterBoxes[0].focus();
      if (levelSelector.value === "EASY") {
        cover.style.display = "none";
        levelSelector.style.backgroundColor = "lightcyan";
        newPoints.innerHTML = "+3";
      }
      if (levelSelector.value === "DIFFICULT") {
        cover.style.display = "block";
        levelSelector.style.backgroundColor = "lightpink";
        newPoints.innerHTML = "+5";
      }
    }
  });
}

// Check if entered word is correct and generate new word
function checkScore(words, score, category) {
  // console.log("checkScore:", word);
  // console.log("checkScore:", score);
  scoreDiv.classList.remove("show-new-score");
  var levelSelector = document.querySelector("#level-selector");

  if (score.every((e) => e === true)) {
    // console.log(totalScore);
    if (levelSelector.value === "EASY") {
      totalScore += 3;
      // scoreDiv.style.opacity = 0.2;
      scoreDiv.innerHTML = totalScore;
      newPoints.innerHTML = "+3";
    }
    if (levelSelector.value === "DIFFICULT") {
      totalScore += 5;
      scoreDiv.innerHTML = totalScore;
      newPoints.innerHTML = "+5";
    }
    // console.log("-----------");
    // console.log(words.length);
    // console.log("-----------");
    if (words.length === 0) {
      // location.reload();
      gameScreen.style.display = "none";
      categoriesContainer.style.display = "flex";
      levelSelector.disable = false;
      // go to homepage and darken complete category
    }

    if (words.length > 0) {
      // console.log("words.length > 0");
      var word = words.pop();

      // console.log("new word:", word);
      // var letterBoxes = document.querySelectorAll(".letter");
      var score = Array(word.length).fill(false);

      // console.log("showNewWord called - A");
      showNewWord(word, category);
      checkLetters(word, words, score, category);
    } else {
      var passButton = document.querySelector("#pass-button");
      passButton.style.display = "none";
    }
    // levelSelector.disabled = false;
    // console.log("-----------------");

    // var totalScore = document.querySelector("#total-score");
    // scoreDiv.style.opacity = "0";
    // scoreDiv.style.opacity = "1";
    scoreDiv.style.opacity = "1";
    scoreDiv.classList.add("show-new-score");
    // console.log(scoreDiv.classList);

    // console.log(scoreDiv.classList);
  }
}

// Show new word
function showNewWord(word, category) {
  // console.log("showNewWord - word:", word);
  // console.log("showNewWord - words:", words);
  // console.log("showNewWord - score:", score);
  var levelSelector = document.querySelector("#level-selector");
  // console.log(levelSelector.disabled);
  levelSelector.disabled = false;

  var imgDiv = document.querySelector("#image");
  imgDiv.style.display = "block";
  var img = document.querySelector("#image img");

  img.src = "./assets/images/" + category + "/" + word + ".png";

  // Clear boxes when new word appears
  if (lettersContainer) {
    lettersContainer.innerHTML = "";
  }

  // Create input boxes for each letter of the word

  word.split("").forEach(() => {
    var input = document.createElement("input");
    input.className = "letter";
    input.type = "text";
    input.maxLength = 1;
    lettersContainer.appendChild(input);
  });
  var letterBoxes = document.querySelectorAll(".letter");

  letterBoxes[0].focus();
  // console.log("pre:", word, words, score);
  // checkLetters(word, words, score);
  var score = Array(letterBoxes.length).fill(false);
  return score;
}

// Add Score
var totalScore = 0;
var scoreDiv = document.querySelector("#total-score");
var newPoints = document.querySelector("#new-points");
var scoreContainer = document.querySelector("#score-container");

//////// START GAME ////////////////////
// Show new word on start button click
// startButton.addEventListener("click", function () {

function gameStart(words, category) {
  // console.log("gameStart - words:", words);
  // startButton.style.display = "none";
  newPoints.innerHTML = "+3";
  scoreContainer.style.display = "block";

  scoreDiv.innerHTML = totalScore;

  var passButton = document.querySelector("#pass-button");
  passButton.style.display = "block";

  // Set new word on pass
  // ??????????
  passButton.onclick = () => {
    if (words.length === 0) {
      // var passButton = document.querySelector("#pass-button");
      gameScreen.style.display = "none";
      categoriesContainer.style.display = "flex";
      // score = undefined;
      // console.log("passButton && words.length = 0) - word:", word);
      // console.log("passButton && words.length = 0) - words:", words);
      // console.log("passButton && words.length = 0) - score:", score);
    } else {
      var word = words.pop();
      // console.log("showNewWord called - B");
      showNewWord(word, category);
      // var score = Array(letterBoxes.length).fill(false);
      // console.log(score);
      checkLetters(word, words, score, category);
    }
  };
  // ?????????

  /////

  var word = words.pop();
  var score = Array(word.length).fill(false);

  // console.log("gameStart:", score);
  showNewWord(word, category);

  /////
  checkLetters(word, words, score, category);
}
// }

////////////////////////////////////////

var lettersContainer = document.querySelector("#lettersContainer");
lettersContainer.innerHTML = "";

// Mark entered letters green or red
function markLetters(id, word, words, score, category) {
  // console.log("markLetters:", word);
  // console.log("markLetters:", score);

  var letterBoxes = document.querySelectorAll(".letter");
  // If the entered letter is correct
  var inputLetter = letterBoxes[id].value;

  if (inputLetter === word.toLowerCase()[id]) {
    // Mark letter score as correct
    // console.log(score, id);
    score[id] = true;
    // console.log(score);
    checkScore(words, score, category);
    letterBoxes[id].classList.add("correct-letter");
    letterBoxes[id].classList.remove("wrong-letter");
    letterBoxes[id].readOnly = "true";
    letterBoxes[id].style.outline = "none";
  } else {
    letterBoxes[id].classList.add("wrong-letter");
  }
}

function checkLetters(word, words, score, category) {
  // console.log("checkLetters - word:", word);
  // console.log("checkLetters - words:", words);
  // console.log("checkLetters - score:", score);

  // Add event listeners to each letterBox
  var letterBoxes = document.querySelectorAll(".letter");
  for (var i = 0; i < word.length; i++) {
    //Select whole text when clicked
    letterBoxes[i].addEventListener("click", function () {
      letterBoxes[i].onclick = this.select();
    });

    scoreDiv.style.opacity = "1";
    // Mark if entered text is correct
    letterBoxes[i].addEventListener("keyup", function (event) {
      if (event.key >= "a" && event.key <= "z") {
        // console.log("keyup:start - word:", word);
        // console.log("keyup:start - words:", words);
        // console.log("keyup:start - score:", score);

        checkScore(words, score, category);
        markLetters(i, word, words, score, category);
        // console.log("F:", word);

        // If wrong letter is entered, mark red and move to next unanswered or incorrect letter
        // Applied after marking green or red and cursor remains in same input before moving the focus
        function setFocus() {
          var indexOfIncorrectLetters = [];
          // Get the index of all letters that are not correct
          function getIndexOfIncorrectLetters() {
            // var letterBoxes = document.querySelectorAll(".letter");
            // console.log(
            //   "getIndexOfIncorrectLetters - letterBoxes:",
            //   letterBoxes
            // );
            // console.log("getIndexOfIncorrectLetters: - word:", word);
            // Collect the classes of each letterBoxes
            var classArray = [];
            for (var j = 0; j < word.length; j++) {
              var classValue = letterBoxes[j].classList.value;
              classArray.push(classValue);
            }
            // Get index of incorrect letters
            classArray.forEach((value, index) => {
              if (!value.includes("correct-letter")) {
                indexOfIncorrectLetters.push(index);
              }
            });
            var levelSelector = document.querySelector("#level-selector");
            // console.log(word);
            if (indexOfIncorrectLetters.length < word.length) {
              levelSelector.disabled = true;
            } else {
              levelSelector.disabled = false;
            }
          }

          getIndexOfIncorrectLetters();

          // If some letters are not correct
          if (indexOfIncorrectLetters.length >= 1) {
            letterBoxes[indexOfIncorrectLetters[0]].select();
          } else {
            levelSelector.disabled = false;
          }
        }

        var levelSelector = document.querySelector("#level-selector");
        setFocus(levelSelector);
      }
      // console.log("keyup:end - word:", word);
      // console.log("keyup:end - words:", words);
      // console.log("keyup:end - score:", score);
      // !!! score array doesn't update
    });
  }
}
