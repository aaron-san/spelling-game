let title = document.querySelector("#title");
title.addEventListener("click", () => {
  let gameScreen = document.querySelector("#game-screen");
  gameScreen.style.display = "none";
  let categoriesContainer = document.querySelector(".categories-container");
  categoriesContainer.style.display = "flex";
});

let categoriesContainer = document.querySelector(".categories-container");

let data = {
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
let categories = Array.from(categoriesContainer.children);

let categoriesArray = [];
categories.forEach((el) => {
  categoriesArray.push(el.classList[1]);
});
// console.log(categoriesArray);

// let animalsCategory = document.querySelector(".animals");
// let sportCategory = document.querySelector(".sports");
// let foodCategory = document.querySelector(".food");
// let fruitCategory = document.querySelector(".fruits");

let gameScreen = document.querySelector("#game-screen");

for (i = 0; i < categoriesArray.length; i++) {
  let categoryElement = document.querySelector("." + categoriesArray[i]);
  let category = categoryElement.classList[1];

  // console.log(data[category]);
  // console.log(itemsArray);
  // console.log(category.classList[1]);
  categoryElement.addEventListener("click", () => {
    gameScreen.style.display = "flex";
    categoriesContainer.style.display = "none";

    let words = data[category];
    // console.log(data[category]);

    // All words to lowercase
    // words = words.concat(words);
    words = words.map((word) => word.toLowerCase());
    words = words.sort((a, b) => 0.5 - Math.random());

    addLevelSelector();
    gameStart(words, category);
  });
}

// let getRandomNum = () => Math.floor(Math.random() * words.length);

// Change the word
// function getRandomWord(words) {
//   let word = words.pop();
//   return word;
// }

function addLevelSelector() {
  let levelSelector = document.querySelector("select#level-selector");
  levelSelector.style.backgroundColor = "lightgreen";
  let cover = document.querySelector("#cover");
  // console.log(levelSelector.value);
  levelSelector.addEventListener("change", () => {
    let letterBoxes = document.querySelectorAll(".letter");
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
  let levelSelector = document.querySelector("#level-selector");

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
      let word = words.pop();

      // console.log("new word:", word);
      // let letterBoxes = document.querySelectorAll(".letter");
      let score = Array(word.length).fill(false);

      // console.log("showNewWord called - A");
      showNewWord(word, category);
      checkLetters(word, words, score, category);
    } else {
      let passButton = document.querySelector("#pass-button");
      passButton.style.display = "none";
    }
    // levelSelector.disabled = false;
    // console.log("-----------------");

    // let totalScore = document.querySelector("#total-score");
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
  let levelSelector = document.querySelector("#level-selector");
  // console.log(levelSelector.disabled);
  levelSelector.disabled = false;

  let imgDiv = document.querySelector("#image");
  imgDiv.style.display = "block";
  let img = document.querySelector("#image img");

  img.src = "./assets/images/" + category + "/" + word + ".png";

  // Clear boxes when new word appears
  if (lettersContainer) {
    lettersContainer.innerHTML = "";
  }

  // Create input boxes for each letter of the word

  word.split("").forEach(() => {
    let input = document.createElement("input");
    input.className = "letter";
    input.type = "text";
    input.maxLength = 1;
    lettersContainer.appendChild(input);
  });
  let letterBoxes = document.querySelectorAll(".letter");

  letterBoxes[0].focus();
  // console.log("pre:", word, words, score);
  // checkLetters(word, words, score);
  let score = Array(letterBoxes.length).fill(false);
  return score;
}

// Add Score
let totalScore = 0;
let scoreDiv = document.querySelector("#total-score");
let newPoints = document.querySelector("#new-points");
let scoreContainer = document.querySelector("#score-container");

//////// START GAME ////////////////////
// Show new word on start button click
// startButton.addEventListener("click", function () {

function gameStart(words, category) {
  // console.log("gameStart - words:", words);
  // startButton.style.display = "none";
  newPoints.innerHTML = "+3";
  scoreContainer.style.display = "block";

  scoreDiv.innerHTML = totalScore;

  let passButton = document.querySelector("#pass-button");
  passButton.style.display = "block";

  // Set new word on pass
  passButton.onclick = () => {
    if (words.length === 0) {
      // let passButton = document.querySelector("#pass-button");
      gameScreen.style.display = "none";
      categoriesContainer.style.display = "flex";
      // score = undefined;
      // console.log("passButton && words.length = 0) - word:", word);
      // console.log("passButton && words.length = 0) - words:", words);
      // console.log("passButton && words.length = 0) - score:", score);
    } else {
      let word = words.pop();
      // console.log("showNewWord called - B");
      showNewWord(word, category);
      // let score = Array(letterBoxes.length).fill(false);
      // console.log(score);
      checkLetters(word, words, score, category);
    }
  };
  // ?????????

  /////

  let word = words.pop();
  let score = Array(word.length).fill(false);

  // console.log("gameStart:", score);
  showNewWord(word, category);

  /////
  checkLetters(word, words, score, category);
}
// }

////////////////////////////////////////

let lettersContainer = document.querySelector("#lettersContainer");
lettersContainer.innerHTML = "";

// Mark entered letters green or red
function markLetters(id, word, words, score, category) {
  // console.log("markLetters - word:", word);
  // console.log("markLetters - words:", words);
  // console.log("markLetters - score:", score);

  let letterBoxes = document.querySelectorAll(".letter");
  // If the entered letter is correct
  let inputLetter = letterBoxes[id].value;

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
  let letterBoxes = document.querySelectorAll(".letter");
  for (let i = 0; i < word.length; i++) {
    //Select whole text when clicked
    // console.log(letterBoxes[i]);
    letterBoxes[i].addEventListener("click", function () {
      letterBoxes[i].select();
    });

    scoreDiv.style.opacity = "1";
    // Mark if entered text is correct
    letterBoxes[i].addEventListener("keyup", function (event) {
      if (event.key >= "a" && event.key <= "z") {
        // console.log("keyup:start - word:", word);
        // console.log("keyup:start - words:", words);
        // console.log("keyup:start - score:", score);
        // console.log("keyup:start - category:", category);

        checkScore(words, score, category);
        markLetters(i, word, words, score, category);
        // console.log("F:", word);

        // If wrong letter is entered, mark red and move to next unanswered or incorrect letter
        // Applied after marking green or red and cursor remains in same input before moving the focus
        function setFocus() {
          let indexOfIncorrectLetters = [];
          // Get the index of all letters that are not correct
          function getIndexOfIncorrectLetters() {
            // let letterBoxes = document.querySelectorAll(".letter");
            // console.log(
            //   "getIndexOfIncorrectLetters - letterBoxes:",
            //   letterBoxes
            // );
            // console.log("getIndexOfIncorrectLetters: - word:", word);
            // Collect the classes of each letterBoxes
            let classArray = [];
            for (let j = 0; j < word.length; j++) {
              let classValue = letterBoxes[j].classList.value;
              classArray.push(classValue);
            }
            // Get index of incorrect letters
            classArray.forEach((value, index) => {
              if (!value.includes("correct-letter")) {
                indexOfIncorrectLetters.push(index);
              }
            });
            let levelSelector = document.querySelector("#level-selector");
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

        let levelSelector = document.querySelector("#level-selector");
        setFocus(levelSelector);
      }
      // console.log("keyup:end - word:", word);
      // console.log("keyup:end - words:", words);
      // console.log("keyup:end - score:", score);
      // !!! score array doesn't update
    });
  }
}
