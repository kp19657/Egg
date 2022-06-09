let typing = "";
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let score = 0;
let gameLives;
let gameOver = false;
let endGame = document.querySelector(".end-game");
let inputBox = document.getElementById("input-box");

// function to randomly create eggs at different horizontal positions
function createEgg() {
  let div = document.createElement("div");
  div.className = "egg";
  let randspd = Math.ceil(Math.random() * 10) + 2;
  div.style.animationDuration = randspd + "s";
  let rand1 = Math.ceil(Math.random() * 15);
  let rand2 = Math.ceil(Math.random() * 15);
  let answer = rand1 + rand2;
  randNum = Math.ceil(Math.random() * 9);
  div.setAttribute("answer", answer);
  div.innerText = `${rand1}+${rand2}`;

  let rand = Math.floor(Math.random() * (windowWidth - 101));
  div.style.left = rand + "px";

  div.addEventListener("animationend", function (e) {
    e.target.style.top = windowHeight - 101 + "px";
    e.target.setAttribute("answer", "dead");
    gameLives--;
    document.querySelector(".lives").innerText = gameLives;
    if (gameLives === 0) {
      gameOver = true;
    }
    e.target.innerText = "dead";
  });

  document.body.appendChild(div);
}

// function to restart the game
function restartGame() {
  let forRemoving = document.querySelectorAll(".egg");
  gameOver = false;
  for (let i = 0; i < forRemoving.length; i++) {
    forRemoving[i].remove();
  }
  score = 0;
  document.querySelector(".score").innerText = score;
  gameLives = 5;
  document.querySelector(".lives").innerText = gameLives;
}

document.querySelector(".start-btn").addEventListener("click", function (e) {
  startGame();
  document.querySelector(".game-menu").style.display = "none";
});

document.querySelector(".restart-btn").addEventListener("click", function (e) {
  startGame();
  document.querySelector(".end-game").style.display = "none";
  document.querySelector(".score-board").style.display = "flex";
});

// function to start the game
function startGame() {
  restartGame();
  let timeout = 0;
  let loop = setInterval(function () {
    timeout = Math.floor(Math.random() * 600 - 100);

    if (gameOver === false) {
      createEgg();
    } else {
      clearInterval(loop);
      endGame.style.display = "flex";
      document.querySelector(".end-score").innerText = score;
      document.querySelector(".score-board").style.display = "none";
    }
  }, 800 + timeout);
}

// accept keyboard inputs
document.addEventListener("keydown", function (e) {
  let numerical = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Backspace",
    "Enter",
  ];

  if (numerical.includes(e.key)) {
    if (e.key === "Backspace") {
      let temp = typing.split("");
      temp.pop();
      typing = temp.join("");
    } else if (e.key === "Enter") {
      let eggCheckerAll = document.querySelectorAll(".egg");
      eggCheckerAll.forEach(function (egg) {
        let answerCheck = egg.getAttribute("answer");
        if (answerCheck === typing) {
          egg.remove();
          score++;
          document.querySelector(".score").innerText = score;
        }
      });
      typing = "";
    } else {
      typing += e.key;
    }
  }
  document.querySelector("#input-box").innerText = typing;
});
