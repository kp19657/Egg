// for (let i = 0; i < difficulty; i++) {
//   let firstNumber = Math.random() * difficulty
//   let secondNumber = math random
//   let question = `${firstNumber}` + `${secondNumber}`
//   let annwer = firstNumber + secondNumber
//   questionAr.push(qestion)
//   answerArr.push(answer)
// }

let eggNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let windowWidth = window.innerWidth;
let body = document.body;
let windowHeight = window.innerHeight;
let score = 0;
let gameLives = 3;
let gameOver = false;
let endGame = document.querySelector(".end-game");
// let allEggs = document.querySelectorAll(".egg");

function createEgg() {
  let div = document.createElement("div");
  div.className = "egg";
  div.innerText = eggNumber[Math.floor(Math.random() * eggNumber.length)];
  // div.setAttribute("answer", 9)

  let rand = Math.floor(Math.random() * (windowWidth - 101));
  div.style.left = rand + "px";

  function eggDrop(elem) {
    let id = null;
    let pos = 0;
    let randSpeed = Math.floor(Math.random() * 25);

    clearInterval(id);

    id = setInterval(frame, randSpeed);

    function frame() {
      if (pos === windowHeight - 101) {
        clearInterval(id);
        elem.innerText = "dead";
        gameLives--;
        document.querySelector(".lives").innerText = gameLives;
        if (gameLives === 0) {
          gameOver = true;
        }
      } else {
        pos++;
        elem.style.top = pos + "px";
      }
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === div.innerText) {
        div.innerText = "saved";
        div.remove();
        clearInterval(id);
        score++;
        document.querySelector(".score").innerText = score;
      }
    });
  }

  document.body.appendChild(div);
  eggDrop(div);
}

function restartGame() {
  let forRemoving = document.querySelectorAll(".egg");
  gameOver = false;
  for (let i = 0; i < forRemoving.length; i++) {
    forRemoving[i].remove();
  }
  score = 0;
  document.querySelector(".score").innerText = score;
  gameLives = 3;
  document.querySelector(".lives").innerText = gameLives;
}

document.querySelector(".start-btn").addEventListener("click", function (e) {
  startGame();
  document.querySelector(".game-menu").style.display = "none";
});

document.querySelector(".restart-btn").addEventListener("click", function (e) {
  startGame();
  // document.querySelector(".end-game").style.display = "none";
  // document.querySelector(".score-board").style.display = "flex";
  location.reload();
});

function startGame() {
  restartGame();
  let timeout = 0;
  let loop = setInterval(function () {
    timeout = Math.floor(Math.random() * 600 - 100);

    if (gameOver === false) {
      createEgg();
    } else {
      // pauseEggs();
      clearInterval(loop);
      endGame.style.display = "flex";
      document.querySelector(".end-score").innerText = score;
      document.querySelector(".score-board").style.display = "none";
    }
  }, 800 + timeout);
}
