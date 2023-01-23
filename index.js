let title = document.querySelector("#title");
title.addEventListener("click", () => {
  let wordContainer = document.querySelector("#word-container");
  wordContainer.style.display = "none";
  let categoriesContainer = document.querySelector(".categories-container");
  categoriesContainer.style.display = "flex";
});

let categoriesContainer = document.querySelector(".categories-container");

let scoreContainer = document.querySelector("#score-container");
scoreContainer.style.display = "block";
scoreContainer.style.top = "100px";

let newPoints = document.querySelector("#new-points");
newPoints.style.display = "none";

let data = {
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
  fruits: [
    "apple",
    "banana",
    "cherry",
    "grapes",
    "kiwifruit",
    "lemon",
    "melon",
    "orange",
    "peach",
    "pineapple",
    "strawberry",
    "tomato",
    "watermelon",
  ],
  sports: [
    "badminton",
    "baseball",
    "basketball",
    "dodgeball",
    "skating",
    "skiing",
    "soccer",
    "softball",
    "swimming",
    "tabletennis",
    "tennis",
    "trackandfield",
    "volleyball",
  ],
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
  weather: ["cloudy", "rainy", "snowy", "sunny"],
  feelings: [
    "busy",
    "cold",
    "fine",
    "good",
    "great",
    "happy",
    "hot",
    "hungry",
    "sad",
    "sleepy",
    "thirsty",
    "tired",
  ],
  schoolevents: [
    "choruscontest",
    "dramafestival",
    "entranceceremony",
    "fieldtrip",
    "firedrill",
    "graduationceremony",
    "musicfestival",
    "schoolfestival",
    "schooltrip",
    "sportsday",
    "summervacation",
    "swimmingmeet",
    "volunteerday",
  ],
  actions1: [
    "bake",
    "buy",
    "drink",
    "cook",
    "clean",
    "dance",
    "draw",
    "eat",
    "go",
    "jump",
    "listen",
    "read",
    "ride",
    "run",
    "sing",
    "skate",
    "speak",
    "stop",
    "study",
    "swim",
    "talk",
    "teach",
    "travel",
    "turn",
    "write",
  ],
};

// Get the categories from the DOM elements
let categories = document.querySelectorAll(".category");
// let categories = Array.from(categoriesContainer.children);
// console.log(categories);

let categoriesArray = [];
categories.forEach((el) => {
  categoriesArray.push(el.classList[1]);
});
// console.log(categoriesArray);

// let animalsCategory = document.querySelector(".animals");
// let sportCategory = document.querySelector(".sports");
// let foodCategory = document.querySelector(".food");
// let fruitCategory = document.querySelector(".fruits");

let wordContainer = document.querySelector("#word-container");

for (i = 0; i < categoriesArray.length; i++) {
  let categoryElement = document.querySelector("." + categoriesArray[i]);
  let category = categoryElement.classList[1];

  // console.log(data[category]);
  // console.log(itemsArray);
  // console.log(category.classList[1]);
  categoryElement.addEventListener("click", () => {
    wordContainer.style.display = "flex";
    categoriesContainer.style.display = "none";

    let words = data[category];
    // console.log(data[category]);

    // All words to lowercase
    // words = words.concat(words);
    words = words.map((word) => word.toLowerCase());
    words = words.sort((a, b) => 0.5 - Math.random());

    gameStart(words, category);
  });
}

// let getRandomNum = () => Math.floor(Math.random() * words.length);

// Change the word
// function getRandomWord(words) {
//   let word = words.pop();
//   return word;
// }

function addLevelSelector(word) {
  let levelSelector = document.querySelector("select#level-selector");
  levelSelector.style.backgroundColor = "lightgreen";
  // let cover = document.querySelector("#cover");
  // console.log(levelSelector.value);
  levelSelector.addEventListener("change", () => {
    let letterInput = document.querySelectorAll(".letterInput");
    // let letterTextNode = document.querySelectorAll(".letterText");
    // console.log(letterInput.length);
    if (letterInput.length > 0) {
      letterInput[0].focus();
      if (levelSelector.value === "EASY") {
        let letterTextNode = document.querySelectorAll(".letterText");
        for (let i = 0; i < letterInput.length; i++) {
          letterTextNode[i].styel;
        }
        // cover.style.display = "none";
        levelSelector.style.backgroundColor = "lightcyan";
        newPoints.innerHTML = "+3";
      }
      if (levelSelector.value === "DIFFICULT") {
        // cover.style.display = "block";

        // letterText.style.display = "none";
        let letterTextNode = document.querySelectorAll(".letterText");
        for (let i = 0; i < letterTextNode.length; i++) {
          letterTextNode[i].style.display = "none";
        }

        levelSelector.style.backgroundColor = "lightpink";
        newPoints.innerHTML = "+6";
      }
    }
  });
}

// Check if entered word is correct and generate new word
function checkScore(words, score, category) {
  // console.log("checkScore:", words);
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
      totalScore += 6;
      scoreDiv.innerHTML = totalScore;
      newPoints.innerHTML = "+6";
      let letterTextNode = document.querySelectorAll(".letterText");
      for (let i = 0; i < letterTextNode.length; i++) {
        letterTextNode[i].style.display = "none";
      }
    }
    // console.log("-----------");
    // console.log(words.length);
    // console.log("-----------");
    if (words.length === 0) {
      // location.reload();
      wordContainer.style.display = "none";
      categoriesContainer.style.display = "flex";
      levelSelector.disable = false;
      let scoreContainer = document.querySelector("#score-container");
      scoreContainer.style.display = "block";
      scoreContainer.style.top = "100px";

      let newPoints = document.querySelector("#new-points");
      newPoints.style.display = "none";
      // go to homepage and darken complete category
      let categoryNode = document.querySelector("." + category);
      categoryNode.classList.add("complete-category");
    }

    if (words.length > 0) {
      // console.log("words.length > 0");
      let word = words.pop();

      // console.log("new word:", word);
      // let letterInput = document.querySelectorAll(".letter");
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
  imgDiv.classList.add("success");
  imgDiv.style.display = "block";
  let img = document.querySelector("#image img");

  img.src = "./assets/images/" + category + "/" + word + ".png";

  // Clear boxes when new word appears
  if (lettersContainer) {
    lettersContainer.innerHTML = "";
  }

  // Create input boxes for each letter of the word

  word.split("").forEach((letter) => {
    //Container
    let letterContainer = document.createElement("div");
    letterContainer.classList.add("letterContainer");
    //Printed letter
    let letterText = document.createElement("div");
    letterText.classList.add("letterText");

    //Input letter
    let letterInput = document.createElement("input");
    letterInput.classList.add("letterInput");
    letterInput.type = "text";
    letterInput.autocapitalize = "none";
    letterInput.classList.add("success");
    letterInput.maxLength = 1;

    letterContainer.appendChild(letterText);
    letterContainer.appendChild(letterInput);
    lettersContainer.appendChild(letterContainer);
  });

  let letterText = document.querySelectorAll(".letterText");
  if (levelSelector.value === "EASY") {
    for (let i = 0; i < word.length; i++) {
      letterText[i].innerHTML = word[i];
    }
  }
  // else {
  //   for (let i = 0; i < word.length; i++) {
  //     letterText[i].style.display = "none";
  //   }
  // }

  let letterInput = document.querySelectorAll(".letterInput");

  letterInput[0].focus();
  // console.log("pre:", word, words, score);
  // checkLetters(word, words, score);
  let score = Array(letterInput.length).fill(false);
  return score;
}

// Add Score
let totalScore = 0;
let scoreDiv = document.querySelector("#total-score");
// let newPoints = document.querySelector("#new-points");
// let scoreContainer = document.querySelector("#score-container");

//////// START GAME ////////////////////
// Show new word on start button click
// startButton.addEventListener("click", function () {

function gameStart(words, category) {
  // console.log("gameStart - words:", words);
  // startButton.style.display = "none";
  let newPoints = document.querySelector("#new-points");
  newPoints.style.display = "block";
  newPoints.innerHTML = "+3";
  scoreContainer.style.display = "block";

  scoreDiv.innerHTML = totalScore;

  let passButton = document.querySelector("#pass-button");
  passButton.style.display = "block";

  // Set new word on pass
  passButton.onclick = () => {
    if (words.length === 0) {
      wordContainer.style.display = "none";
      categoriesContainer.style.display = "flex";
      let scoreContainer = document.querySelector("#score-container");
      scoreContainer.style.display = "block";
      scoreContainer.style.top = "100px";

      let newPoints = document.querySelector("#new-points");
      newPoints.style.display = "none";
    } else {
      let word = words.pop();
      showNewWord(word, category);
      // let letterInput = document.querySelectorAll(".letterInput");
      let score = Array(word.length).fill(false);
      checkLetters(word, words, score, category);
    }
  };

  let word = words.pop();
  let score = Array(word.length).fill(false);

  addLevelSelector(word);
  showNewWord(word, category);

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

  let letterInput = document.querySelectorAll(".letterInput");
  // If the entered letter is correct
  let inputValue = letterInput[id].value;

  if (inputValue.toUpperCase() === word.toLowerCase()[id].toUpperCase()) {
    // Mark letter score as correct
    // console.log(score, id);
    letterInput[id].value = word[id];
    score[id] = true;
    // console.log(score);

    checkScore(words, score, category);
    letterInput[id].classList.add("correct-letter");
    letterInput[id].classList.remove("wrong-letter");
    letterInput[id].readOnly = "true";
    letterInput[id].style.outline = "none";
  } else {
    letterInput[id].classList.add("wrong-letter");
  }
}

function checkLetters(word, words, score, category) {
  // console.log("checkLetters - word:", word);
  // console.log("checkLetters - words:", words);
  // console.log("checkLetters - score:", score);

  // Add event listeners to each letterInput
  let letterInput = document.querySelectorAll(".letterInput");
  for (let i = 0; i < word.length; i++) {
    //Select whole text when clicked
    // console.log(letterInput[i]);
    letterInput[i].addEventListener("click", function () {
      letterInput[i].select();
    });

    scoreDiv.style.opacity = "1";
    // Mark if entered text is correct
    letterInput[i].addEventListener("keyup", function (event) {
      if (event.key >= "A" && event.key <= "z") {
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
            // let letterInput = document.querySelectorAll(".letter");
            // console.log(
            //   "getIndexOfIncorrectLetters - letterInput:",
            //   letterInput
            // );
            // console.log("getIndexOfIncorrectLetters: - word:", word);
            // Collect the classes of each letterInput
            let classArray = [];
            for (let j = 0; j < word.length; j++) {
              let classValue = letterInput[j].classList.value;
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
            letterInput[indexOfIncorrectLetters[0]].select();
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
