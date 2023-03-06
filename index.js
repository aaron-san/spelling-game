import words from "./assets/words.json" assert { type: "json" };
let data = words.data;

let title = document.querySelector("#title");
title.addEventListener("click", () => {
  clearPage();
  clearWordContainer();
});

// Make deep copy
const dataClone = JSON.parse(JSON.stringify(data));

// Get the categories from the DOM elements
let categories = document.querySelectorAll(".category");
// let categories = Array.from(categoriesContainer.children);

let categoriesArray = [];
categories.forEach((el) => {
  categoriesArray.push(el.classList[1]);
});

// function removeAllChildren(parent) {
//   while (parent.firstChild) {
//     parent.remove
//   }
// }

for (let i = 0; i < categoriesArray.length; i++) {
  let categoryElement = document.querySelector("." + categoriesArray[i]);
  let category = categoryElement.classList[1];

  categoryElement.addEventListener("click", () => {
    let mainContainer = document.querySelector("#main-container");
    mainContainer.style.display = "flex";
    let categoriesContainer = document.querySelector(".categories-container");
    categoriesContainer.style.display = "none";

    let words = JSON.parse(JSON.stringify(data[category]));

    let correctWordCount = 0;
    // All words to lowercase
    // words = words.concat(words);
    // words = words.map((word) => word.toLowerCase());

    // Randomize (shuffle) word order
    words = words.sort((a, b) => 0.5 - Math.random());

    gameStart(words, category, correctWordCount);
  });
}

let bar = document.createElement("div");
const progressBar = (totalComplete, totalLength) => {
  bar.style.width = (totalComplete / totalLength) * 100 + "%";
  bar.style.height = "20px";
  bar.style.background = "blue";
  bar.style.opacity = "0.3";
  bar.style.left = "0";
  bar.style.alignSelf = "start";
  bar.style.borderRadius = "0 0 5px 5px";
  // bar.style.margin = "0";

  const container = document.querySelector(".container");
  container.prepend(bar);
};
// progressBar();

let clearImage = () => {
  let imgTag = document.querySelector("#image img");
  imgTag.classList.add("fadeOut");
  setTimeout(() => (imgTag.src = ""), 500);
};

const removeChilds = (parent) => {
  while (parent.lastChild) {
    console.log(parent.lastChild);
    parent.removeChild(parent.lastChild);
  }
};

let clearWordContainer = () => {
  let wordsContainer = document.querySelector(".words-container");
  // console.log(wordsContainer);
  wordsContainer.classList.add("fadeOut");
  // for (c of wordsContainer) {
  //   c.classList.add("fadeOut");
  // }

  setTimeout(() => {
    removeChilds(wordsContainer);
    // console.log("container remove");
  }, 500);
};

// let getRandomNum = () => Math.floor(Math.random() * words.length);

function addLevelSelector(word, words, category) {
  let levelSelector = document.querySelector("select#level-selector");
  let optionArray = document.querySelectorAll("option");

  for (let option of optionArray) {
    option.style.backgroundColor = "#fff";
  }

  // let cover = document.querySelector("#cover");
  levelSelector.addEventListener("change", () => {
    let mainContainer = document.querySelector("#main-container");
    mainContainer.style.display = "none";
    let categoriesContainer = document.querySelector(".categories-container");
    categoriesContainer.style.display = "flex";

    // Remove current word from container
    clearImage();
    clearWordContainer();

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
function checkScore(words, score, category, correctWordCount) {
  scoreDiv.classList.remove("show-new-score");
  let levelSelector = document.querySelector("#level-selector");

  // If every letter is correct
  if (score.every((e) => e === true)) {
    correctWordCount += 1;
    if (levelSelector.value === "EASY") {
      totalScore += 0.10001;
      //--------------------------------
      // For Daughter
      // totalScore += 3;
      //--------------------------------
      scoreDiv.innerHTML = Math.floor(totalScore);
      // newPoints.innerHTML = "+3";
    }
    if (levelSelector.value === "DIFFICULT") {
      totalScore += 0.15001;
      scoreDiv.innerHTML = Math.floor(totalScore);
      // newPoints.innerHTML = "+6";
      let letterTextNode = document.querySelectorAll(".letter-text");
      for (let i = 0; i < letterTextNode.length; i++) {
        letterTextNode[i].style.display = "none";
      }
    }

    // console.log(words.length);
    if (words.length === 0) {
      clearPage();

      levelSelector.disable = false;

      // console.log("page cleared");
      // console.log(words);

      // go to homepage and darken complete category
      if (correctWordCount == dataClone[category].length) {
        let categoryNode = document.querySelector("." + category);
        categoryNode.id = "complete-category";

        let num = document.querySelector("." + category + " span");
        num.remove();
      }
      clearImage();
      clearWordContainer();
      // console.log("cleared");
    }

    if (words.length > 0) {
      let word = words.pop();

      // let letterInput = document.querySelectorAll(".letter");
      let score = Array(word.replaceAll(" ", "").length).fill(false);

      // Remove and reset word container
      clearImage();
      clearWordContainer();

      delayedShowNewWord(word, words, category, dataClone, correctWordCount);
    } else {
      // Remove current word from container
      clearWordContainer();
      let passButton = document.querySelector("#pass-button");
      passButton.style.display = "none";
    }
    // correctWordCount = 0;
  }
}

let wordsContainer = document.createElement("div");
wordsContainer.classList.add("words-container");

// Show new word

function showNewWord(word, words, category, dataClone) {
  // Reset faded-out image
  let imgTag = document.querySelector("#image img");
  imgTag.classList.remove("fadeOut");

  // Reset faded-out word container
  wordsContainer.classList.remove("fadeOut");

  let completion = document.querySelector(".completion");
  let totalLength = dataClone[category].length;
  let currentNum = totalLength - words.length;
  completion.innerText = `${currentNum} / ${totalLength} 語`;
  let totalComplete = currentNum - 1;

  progressBar(totalComplete, totalLength);

  let levelSelector = document.querySelector("#level-selector");
  levelSelector.disabled = false;

  let imgDiv = document.querySelector("#image");
  imgDiv.classList.add("success");
  imgDiv.style.display = "flex";
  let img = document.querySelector("#image img");

  img.src = "./assets/images/" + category + "/" + word + ".png";

  // Loop over each word
  let componentWords = word.split(" ");
  // ["summer", "festival"]

  componentWords.forEach((word) => {
    // ["summer"]
    let wordContainer = document.createElement("span");
    wordContainer.classList.add("word-container");
    let mainContainer = document.querySelector("#main-container");
    wordsContainer.appendChild(wordContainer);

    //Letter container contains the text and the input box below it
    // Iterate over letters
    let lettersArray = word.split("");
    lettersArray.forEach((letter) => {
      // ["s", "u", "m", "m", "e", "r"]
      //--------------------------------
      // For Daughter
      // letter = letter.toUpperCase();
      //--------------------------------
      let letterContainer = document.createElement("div");
      letterContainer.classList.add("letter-container");
      //Printed letter
      let letterText = document.createElement("div");
      letterText.classList.add("letter-text");
      if (levelSelector.value === "EASY") {
        letterText.innerText = letter;
      }

      //Create input boxes for each letter of word
      let letterInput = document.createElement("input");
      letterInput.classList.add("letter-input");
      letterInput.type = "text";
      // letterInput.autocapitalize = "none";
      // letterInput.classList.add("success");
      // letterText.classList.add("success");
      letterInput.maxLength = 1;

      // Add letterText and letterInput column for each letter
      letterContainer.appendChild(letterText);
      letterContainer.appendChild(letterInput);
      wordContainer.appendChild(letterContainer);
    });
    // wordsContainer.appendChild(wordContainer);
    // mainContainer.appendChild(wordContainer);
    mainContainer.appendChild(wordsContainer);
  });

  // Create input boxes for each letter of the word

  let letterInput = document.querySelectorAll(".letter-input");

  letterInput[0].focus();
  // checkLetters(word, words, score);
  let score = Array(letterInput.length).fill(false);
  return score;
  // }, 2000);
}

function delayedShowNewWord(
  word,
  words,
  category,
  dataClone,
  correctWordCount
) {
  const delay = 500; //500 milliseconds
  setTimeout(() => showNewWord(word, words, category, dataClone), delay);
  setTimeout(() => {
    let score = Array(word.replaceAll(" ", "").length).fill(false);
    checkLetters(word, words, score, category, correctWordCount);
  }, delay + 100);
}

// Add Score
let totalScore = 0;
let scoreDiv = document.querySelector("#total-score");
scoreDiv.innerHTML = 0;
// let newPoints = document.querySelector("#new-points");
// let scoreContainer = document.querySelector("#score-container");

let clearPage = () => {
  let mainContainer = document.querySelector("#main-container");
  mainContainer.style.display = "none";
  let categoriesContainer = document.querySelector(".categories-container");
  categoriesContainer.style.display = "flex";
  let scoreContainer = document.querySelector("#score-container");
  scoreContainer.style.display = "block";
  // let wordContainer = document.querySelectorAll(".word-container");
  clearWordContainer();
  // console.log("page cleared");
  // console.log(data);
};

//////// START GAME ////////////////////
// Show new word on start button click
function gameStart(words, category, correctWordCount) {
  // startButton.style.display = "none";
  // let newPoints = document.querySelector("#new-points");
  // newPoints.style.display = "block";
  // newPoints.innerHTML = "+3";
  let scoreContainer = document.querySelector("#score-container");
  scoreContainer.style.display = "block";

  // scoreDiv.innerHTML = Math.floor(totalScore);

  let passButton = document.querySelector("#pass-button");
  passButton.style.display = "block";

  // Set new word on pass
  passButton.onclick = () => {
    if (words.length === 0) {
      clearPage();
      // let newPoints = document.querySelector("#new-points");
      // newPoints.style.display = "none";
    } else {
      // Clear word containers before new word
      clearImage();
      clearWordContainer();
      let word = words.pop();
      delayedShowNewWord(word, words, category, dataClone, correctWordCount);
    }
  };

  let word = words.pop();
  let score = Array(word.replaceAll(" ", "").length).fill(false);

  addLevelSelector(word, words, category);
  // At start of game
  showNewWord(word, words, category, dataClone);

  checkLetters(word, words, score, category, correctWordCount);
}
// }
// transition: all 3s; */

////////////////////////////////////////

// Mark entered letters green or red
function markLetters(id, word, words, score, category, correctWordCount) {
  // console.log("markLetters - word:", word);
  // console.log("markLetters - words:", words);
  // console.log("markLetters - score:", score);

  let letterText = document.querySelectorAll(".letter-text");
  let letterInput = document.querySelectorAll(".letter-input");
  // If the entered letter is correct
  let inputValue = letterInput[id].value;

  if (
    inputValue.toUpperCase() ===
    word.replaceAll(" ", "").toLowerCase()[id].toUpperCase()
  ) {
    // Mark letter score as correct
    letterInput[id].value = word.replaceAll(" ", "")[id];
    score[id] = true;

    checkScore(words, score, category, correctWordCount);
    letterInput[id].classList.add("correct-letter");
    letterText[id].classList.add("correct-letter-text");
    letterInput[id].classList.remove("wrong-letter");
    letterInput[id].readOnly = "true";
    letterInput[id].style.outline = "none";
  } else {
    letterInput[id].classList.add("wrong-letter");
  }
}

// Mark letters correct / incorrect
function checkLetters(word, words, score, category, correctWordCount) {
  // Add event listeners to each letterInput
  let letterInput = document.querySelectorAll(".letter-input");
  for (let i = 0; i < word.length; i++) {
    //Select whole text when clicked
    if (letterInput[i] !== undefined) {
      letterInput[i].addEventListener("click", function () {
        letterInput[i].select();
      });

      scoreDiv.style.opacity = "1";
      // Mark if entered text is correct
      letterInput[i].addEventListener("keyup", function (event) {
        if (event.key >= "A" && event.key <= "z") {
          checkScore(words, score, category, correctWordCount);
          markLetters(i, word, words, score, category, correctWordCount);

          // If wrong letter is entered, mark red and move to next unanswered or incorrect letter
          // Applied after marking green or red and cursor remains in same input before moving the focus
          function setFocus() {
            let indexOfIncorrectLetters = [];
            // Get the index of all letters that are not correct
            function getIndexOfIncorrectLetters() {
              // Collect the classes of each letterInput
              let classArray = [];
              // console.log(word.join(""));
              // for (let j = 0; j < word.replaceAll(" ", "").length; j++) {
              // console.log(letterInput);
              for (let j = 0; j < word.replaceAll(" ", "").length; j++) {
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

              if (
                indexOfIncorrectLetters.length < word.replaceAll(" ", "").length
              ) {
                levelSelector.disabled = true;
                // document.body.style.background = "green";
              } else {
                levelSelector.disabled = false;
              }
              if (indexOfIncorrectLetters.length === 0) {
                //   document.body.style.background = "black";
                // setTimeout(showSuccess, 2000);
                // setTimeout(hideSuccess, 1000);
                // Add success Checkmark
                // function addCheckmark() {
                //   let checkmark = document.createElement("div");
                //   checkmark.classList.add("checkmark");
                //   checkmark.innerText = "OK!";
                // }
                // addCheckmark();
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
      });
    }
  }
}
