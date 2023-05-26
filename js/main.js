"use strict";

let cards = [];
let sum = 0;
let tryNumber = 0;
let message = "";
let hasBlackJack = false;
let isAlive = false;

const startGameBtn = document.getElementById("start-game-btn");
const newCardBtn = document.getElementById("new-card-btn");
const messageEl = document.getElementById("message-el");
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const mainBox = document.querySelector(".main-box");

sumEl.innerText = sum;

/*GET RANDOM CARD*/
const getRandomCard = () => {
  let min = 1;
  let max = 14;
  let random = Math.round(Math.random() * (max - min) + min);
  if (random === 1) {
    return 11;
  } else if (random > 10 && random <= 14) {
    return 10;
  } else {
    return random;
  }
};

/*----------------------------
----------RESET GAME-----------
-----------------------------*/
const resetGame = () => {
  cards = [];
  sum = 0;
  isAlive = false;
  tryNumber = 0;
  hasBlackJack = false;
  cardsEl.innerText = "";
  sumEl.innerText = 0;
  messageEl.innerText = "";
  mainBox.classList.add("hide-element");
  startGameBtn.classList.remove("hide-element");
};

/*----------------------------
-------CREATE NEW CARD--------
-----------------------------*/
const newCard = () => {
  tryNumber++;
  isAlive = true;

  if (tryNumber === 1) {
    let card1 = getRandomCard();
    let card2 = getRandomCard();
    cards = [card1, card2];
    sum = card1 + card2;
  } else {
    if (isAlive === true && hasBlackJack === false) {
      let card = getRandomCard();
      sum += card;
      cards.push(card);
    }
  }
  renderGame();
};

/*SHOW ELEMENTS START*/
const showElements = () => {
  mainBox.classList.remove("hide-element");
  startGameBtn.classList.add("hide-element");
  newCardBtn.classList.remove("hide-element");
};

/*----------------------------
----------START GAME----------
-----------------------------*/
const startGame = () => {
  showElements();
};

/*----------------------------
---------RENDER GAMER---------
-----------------------------*/
const renderGame = () => {
  cardsEl.innerText = "";
  for (let i = 0; i < cards.length; i++) {
    if (i === cards.length - 1) {
      cardsEl.innerText += cards[i];
    } else {
      cardsEl.innerText += cards[i] + " -";
    }
  }
  sumEl.innerText = sum;

  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You have got Blackjack!";
    hasBlackJack = true;
    newCardBtn.classList.add("hide-element");
    setTimeout(() => {
      resetGame();
    }, 1800);
  } else {
    message = "You are out of the game!";
    isAlive = false;
    newCardBtn.classList.add("hide-element");
    setTimeout(() => {
      resetGame();
    }, 1800);
  }

  messageEl.innerText = message;
};

/*EVENTS*/
newCardBtn.addEventListener("click", newCard);
startGameBtn.addEventListener("click", startGame);
