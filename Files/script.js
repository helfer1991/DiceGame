"use strict";

//selection of HTML elements
const elementScore1 = document.getElementById("score--0");
const elementScore2 = document.getElementById("score--1");
const elementPlayer1 = document.querySelector(".player--0");
const elementPlayer2 = document.querySelector(".player--1");
const elementCurrentScore1 = document.getElementById("current--0");
const elementCurrentScore2 = document.getElementById("current--1");
const elementDice = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

// stats at the beginning of the game
const resetScore = 0;
let playersScore = [0, 0];
let currentScore;
let gameState;
let activePlayer;

const resettingScores = () => {
  playersScore = [0, 0]; //scores of each player
  currentScore = resetScore;
  gameState = true; // to have the state of the system
  activePlayer = 0;

  elementScore1.textContent = resetScore;
  elementScore2.textContent = resetScore;
  elementCurrentScore1.textContent = resetScore;
  elementCurrentScore2.textContent = resetScore;
};

const resettingHtmlClasses = (className1, className2) => {
  elementPlayer1.classList.remove(className1);
  elementPlayer2.classList.remove(className1);
  elementPlayer1.classList.add(className2);
  elementPlayer2.classList.remove(className2);
  elementDice.classList.add("hidden"); // hide dice
};

resettingScores();
resettingHtmlClasses("player--winner", "player--active");

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = resetScore;

  currentScore = resetScore;
  activePlayer = activePlayer === 0 ? 1 : 0; // to change the active player

  elementPlayer1.classList.toggle("player--active");
  elementPlayer2.classList.toggle("player--active");
};

// Rolling the dice
rollBtn.addEventListener("click", () => {
  if (gameState) {
    // generate random dice roll
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    // display dice
    elementDice.classList.remove("hidden"); // to show the dice image
    elementDice.src = `dice-${diceNumber}.png`; // to get the right image

    //check if the number was 1 to switch to the next player
    if (diceNumber === 1) {
      switchPlayer();
    } else {
      currentScore += diceNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
  }
});

// Holding the score. new event handler

holdBtn.addEventListener("click", () => {
  if (gameState) {
    // increase active player's score with current score
    playersScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      playersScore[activePlayer];

    // if active player's score is >= 100 to finish the game...
    if (playersScore[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      elementDice.classList.add("hidden");
      gameState = false;
    } else {
      // inactive player's turn...
      switchPlayer();
    }
  }
});

// resetting the game, new event handler

newBtn.addEventListener("click", () => {
  resettingScores();
  resettingHtmlClasses("player--winner", "player--active");
});
