let title = document.querySelector("#title");
title.addEventListener("click", () => {
  let mainContainer = document.querySelector("#main-container");
  mainContainer.style.display = "none";
  let categoriesContainer = document.querySelector(".categories-container");
  categoriesContainer.style.display = "flex";
  let wordContainer = document.querySelectorAll(".word-container");
  for (container of wordContainer) {
    container.remove();
  }
});

let categoriesContainer = document.querySelector(".categories-container");

let scoreContainer = document.querySelector("#score-container");
// scoreContainer.style.display = "block";
// scoreContainer.style.top = "100px";

// let newPoints = document.querySelector("#new-points");
// newPoints.style.display = "none";

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
    "chorus contest",
    "drama festival",
    "entrance ceremony",
    "field trip",
    "fire drill",
    "graduation ceremony",
    "music festival",
    "school festival",
    "school trip",
    "sports day",
    "summer vacation",
    "swimming meet",
    "volunteer day",
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

let categoriesArray = [];
categories.forEach((el) => {
  categoriesArray.push(el.classList[1]);
});

let mainContainer = document.querySelector("#main-container");

for (i = 0; i < categoriesArray.length; i++) {
  let categoryElement = document.querySelector("." + categoriesArray[i]);
  let category = categoryElement.classList[1];

  categoryElement.addEventListener("click", () => {
    mainContainer.style.display = "flex";
    categoriesContainer.style.display = "none";

    let words = data[category];

    // All words to lowercase
    // words = words.concat(words);
    words = words.map((word) => word.toLowerCase());
    words = words.sort((a, b) => 0.5 - Math.random());

    gameStart(words, category);
  });
}

// let getRandomNum = () => Math.floor(Math.random() * words.length);

function addLevelSelector(word, words, category) {
  let levelSelector = document.querySelector("select#level-selector");
  let optionArray = document.querySelectorAll("option");

  for (option of optionArray) {
    option.style.backgroundColor = "#fff";
  }

  // let cover = document.querySelector("#cover");
  // console.log(levelSelector.value);
  levelSelector.addEventListener("change", () => {
    let mainContainer = document.querySelector("#main-container");
    mainContainer.style.display = "none";
    let categoriesContainer = document.querySelector(".categories-container");
    categoriesContainer.style.display = "flex";
    let wordContainer = document.querySelectorAll(".word-container");
    for (container of wordContainer) {
      container.remove();
    }

    if (levelSelector.value === "EASY") {
      levelSelector.style.backgroundColor = "lightcyan";
    }
    if (levelSelector.value === "DIFFICULT") {
      levelSelector.style.backgroundColor = "lightpink";
    }
    // }
  });
}

// Check if entered word is correct and generate new word
function checkScore(words, score, category) {
  scoreDiv.classList.remove("show-new-score");
  let levelSelector = document.querySelector("#level-selector");

  if (score.every((e) => e === true)) {
    // console.log(totalScore);
    if (levelSelector.value === "EASY") {
      totalScore += 3;
      scoreDiv.innerHTML = Math.floor(totalScore);
      // newPoints.innerHTML = "+3";
    }
    if (levelSelector.value === "DIFFICULT") {
      totalScore += 0.1;
      scoreDiv.innerHTML = Math.floor(totalScore);
      // newPoints.innerHTML = "+6";
      let letterTextNode = document.querySelectorAll(".letter-text");
      for (let i = 0; i < letterTextNode.length; i++) {
        letterTextNode[i].style.display = "none";
      }
    }

    if (words.length === 0) {
      mainContainer.style.display = "none";
      categoriesContainer.style.display = "flex";
      levelSelector.disable = false;
      let scoreContainer = document.querySelector("#score-container");
      scoreContainer.style.display = "block";

      // let newPoints = document.querySelector("#new-points");
      // newPoints.style.display = "none";
      // go to homepage and darken complete category
      let categoryNode = document.querySelector("." + category);
      // categoryNode.classList.add("complete-category");
      categoryNode.id = "complete-category";
    }

    if (words.length > 0) {
      let word = words.pop();

      // let letterInput = document.querySelectorAll(".letter");
      let score = Array(word.replace(" ", "").length).fill(false);

      // Remove and reset word container
      let wordContainer = document.querySelectorAll(".word-container");
      for (container of wordContainer) {
        container.remove();
      }
      showNewWord(word, category);
      checkLetters(word, words, score, category);
    } else {
      let passButton = document.querySelector("#pass-button");
      passButton.style.display = "none";
      let wordContainer = document.querySelectorAll(".word-container");
      for (container of wordContainer) {
        container.remove();
      }
    }

    scoreDiv.style.opacity = "1";
    scoreDiv.classList.add("show-new-score");
  }
}

// Show new word
function showNewWord(word, category) {
  // console.log("showNewWord - word:", word);
  // console.log("showNewWord - words:", words);
  // console.log("showNewWord - score:", score);
  // console.log("show new word");

  let levelSelector = document.querySelector("#level-selector");
  levelSelector.disabled = false;

  let imgDiv = document.querySelector("#image");
  imgDiv.classList.add("success");
  imgDiv.style.display = "flex";
  let img = document.querySelector("#image img");

  img.src = "./assets/images/" + category + "/" + word + ".png";

  // Loop over each word
  componentWords = word.split(" ");
  // ["summer", "festival"]

  componentWords.forEach((word) => {
    // ["summer"]
    let wordContainer = document.createElement("div");
    wordContainer.classList.add("word-container");
    mainContainer.appendChild(wordContainer);

    //Letter container contains the text and the input box below it
    // Iterate over letters
    let lettersArray = word.split("");
    lettersArray.forEach((letter) => {
      // ["s", "u", "m", "m", "e", "r"]
      letter = letter.toUpperCase();
      let letterContainer = document.createElement("div");
      letterContainer.classList.add("letter-container");
      //Printed letter
      let letterText = document.createElement("div");
      letterText.classList.add("letter-text");
      if (levelSelector.value === "EASY") {
        letterText.innerText = letter;
      }

      //Input letter
      let letterInput = document.createElement("input");
      letterInput.classList.add("letter-input");
      letterInput.type = "text";
      letterInput.autocapitalize = "none";
      letterInput.classList.add("success");
      letterInput.maxLength = 1;

      // Add letterText and letterInput column for each letter
      letterContainer.appendChild(letterText);
      letterContainer.appendChild(letterInput);
      wordContainer.appendChild(letterContainer);
    });
    mainContainer.appendChild(wordContainer);
  });

  // Create input boxes for each letter of the word

  let letterInput = document.querySelectorAll(".letter-input");

  letterInput[0].focus();
  // checkLetters(word, words, score);
  let score = Array(letterInput.length).fill(false);
  return score;
}

// Add Score
let totalScore = 0;
let scoreDiv = document.querySelector("#total-score");
scoreDiv.innerHTML = 0;
// let newPoints = document.querySelector("#new-points");
// let scoreContainer = document.querySelector("#score-container");

//////// START GAME ////////////////////
// Show new word on start button click
// startButton.addEventListener("click", function () {

function gameStart(words, category) {
  // console.log("gameStart - words:", words);
  // startButton.style.display = "none";
  // let newPoints = document.querySelector("#new-points");
  // newPoints.style.display = "block";
  // newPoints.innerHTML = "+3";
  scoreContainer.style.display = "block";

  // scoreDiv.innerHTML = Math.floor(totalScore);

  let passButton = document.querySelector("#pass-button");
  passButton.style.display = "block";

  // Set new word on pass
  passButton.onclick = () => {
    if (words.length === 0) {
      mainContainer.style.display = "none";
      categoriesContainer.style.display = "flex";
      let scoreContainer = document.querySelector("#score-container");
      scoreContainer.style.display = "block";
      // scoreContainer.style.top = "100px";

      // let newPoints = document.querySelector("#new-points");
      // newPoints.style.display = "none";
    } else {
      // Clear word containers before new word
      let wordContainer = document.querySelectorAll(".word-container");
      for (container of wordContainer) {
        container.remove();
      }
      let word = words.pop();
      showNewWord(word, category);
      let score = Array(word.replace(" ", "").length).fill(false);
      checkLetters(word, words, score, category);
    }
  };

  let word = words.pop();
  let score = Array(word.replace(" ", "").length).fill(false);

  addLevelSelector(word, words, category);

  showNewWord(word, category);

  checkLetters(word, words, score, category);
}
// }

////////////////////////////////////////

// Mark entered letters green or red
function markLetters(id, word, words, score, category) {
  // console.log("markLetters - word:", word);
  // console.log("markLetters - words:", words);
  // console.log("markLetters - score:", score);

  let letterInput = document.querySelectorAll(".letter-input");
  // If the entered letter is correct
  let inputValue = letterInput[id].value;

  if (
    inputValue.toUpperCase() ===
    word.replace(" ", "").toLowerCase()[id].toUpperCase()
  ) {
    // Mark letter score as correct
    // console.log(score, id);
    letterInput[id].value = word.replace(" ", "")[id];
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
  let letterInput = document.querySelectorAll(".letter-input");
  for (let i = 0; i < word.length; i++) {
    //Select whole text when clicked
    // console.log(letterInput[i]);
    if (letterInput[i] !== undefined) {
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
              for (let j = 0; j < word.replace(" ", "").length; j++) {
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
              if (
                indexOfIncorrectLetters.length < word.replace(" ", "").length
              ) {
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
}
