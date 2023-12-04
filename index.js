const cardsInfo = [
  {
    data: "koala",
    url: "./images/koala.png",
  },

  {
    data: "sheep",
    url: "./images/sheep.png",
  },

  {
    data: "dolphin",
    url: "./images/killer-dolphin.png",
  },

  {
    data: "anglerfish ",
    url: "./images/anglerfish.png",
  },

  {
    data: "penguin",
    url: "./images/penguin.png",
  },

  {
    data: "octopus",
    url: "./images/octopus.png",
  },

  {
    data: "koala",
    url: "./images/koala.png",
  },

  {
    data: "sheep",
    url: "./images/sheep.png",
  },

  {
    data: "dolphin",
    url: "./images/killer-dolphin.png",
  },

  {
    data: "anglerfish ",
    url: "./images/anglerfish.png",
  },

  {
    data: "penguin",
    url: "./images/penguin.png",
  },

  {
    data: "octopus",
    url: "./images/octopus.png",
  },
];

const game = document.querySelector("#game");
const cards = document.querySelectorAll(".card");
const backFace = document.querySelectorAll(".back-face-image");
const resetButton = document.querySelector(".reset");
const startButton = document.querySelector(".start");
const playButton = document.querySelector(".playAgain");
const movesSpan = document.querySelector(".totalMoves");
const flipSpan = document.querySelector(".goodFlips");
const totalMoves = document.querySelector(".movesResult");
const totalTime = document.querySelector(".timeResult");
const winnerBox = document.querySelector(".winner");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

let firstCard,
  tempInfo,
  tempIndex,
  moves = 0,
  pairCounter = 0,
  totalSeconds = 0,
  myInterval;
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetBoard);
playButton.addEventListener("click", playAgain);

function startGame() {
  assignCards();
  startButton.removeEventListener("click", startGame);
}

function playAgain() {
  winnerBox.style.display = "none";
  game.style.display = "flex";
  resetBoard();
}

function setTime() {
  totalSeconds++;
  seconds.innerHTML = count(totalSeconds % 60);
  minutes.innerHTML = count(parseInt(totalSeconds / 60));
}

function count(time) {
  const timeString = time + "";
  if (timeString.length < 2) {
    return "0" + timeString;
  } else {
    return timeString;
  }
}

function assignCards() {
  tempInfo = [...cardsInfo];
  cards.forEach((card, index) => {
    card.classList.add("flip");
    card.addEventListener("click", flipCard);
    card.setAttribute("id", index + 1);
    tempIndex = Math.floor(Math.random() * tempInfo.length);
    card.setAttribute("data-card", tempInfo[tempIndex].data);
    backFace[index].setAttribute("src", tempInfo[tempIndex].url);
    tempInfo.splice(tempIndex, 1);
    setTimeout(() => {
      card.classList.remove("flip");
    }, 1500);
  });
  setTimeout(() => (myInterval = setInterval(setTime, 1000)), 1500);
}

function flipCard() {
  this.classList.add("flip");
  if (!firstCard) {
    firstCard = this;
  } else {
    if (firstCard.id === this.id) {
      return;
    }
    if (firstCard.dataset.card === this.dataset.card) {
      moves++;
      pairCounter++;
      movesSpan.innerHTML = moves;
      firstCard.removeEventListener("click", flipCard);
      this.removeEventListener("click", flipCard);
      firstCard = null;
    } else {
      moves++;
      movesSpan.innerHTML = moves;
      setTimeout(() => {
        firstCard.classList.remove("flip");
        this.classList.remove("flip");
        firstCard = null;
      }, 700);
    }
  }
  if (pairCounter < cardsInfo.length / 2) {
    winnerBox.style.display = "none";
  } else {
    pairCounter = 0;
    winnerBox.style.display = "flex";
    game.style.display = "none";
    totalMoves.innerHTML = moves;
    totalTime.innerHTML = `${minutes.innerHTML}:${seconds.innerHTML}`;
    clearInterval(myInterval);
  }
}

function resetBoard() {
  startButton.addEventListener("click", startGame);
  moves = 0;
  movesSpan.innerHTML = moves;
  totalSeconds = 0;
  seconds.innerHTML = "00";
  minutes.innerHTML = "00";
  clearInterval(myInterval);
  cards.forEach((card) => {
    card.removeEventListener("click", flipCard);
    card.classList.remove("flip");
  });
}
