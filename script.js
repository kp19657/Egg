let eggNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let windowWidth = window.innerWidth;
let body = document.body;
let windowHeight = window.innerHeight;
let score = 0;
let gameLives = 3;
let gameOver = false;
let shadow = document.querySelector(".shadow");
let startBtn = document.querySelector(".start-btn");

function createBubble() {
  let div = document.createElement("div");
  div.className = "egg";
  div.innerText = eggNumber[Math.floor(Math.random() * eggNumber.length)];

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
  for (let i = 0; i < forRemoving.length; i++) {
    forRemoving[i].remove();
  }
  gameOver = false;
  score = 0;
  document.querySelector(".score").innerText = score;
  gameLives = 3;
  document.querySelector(".lives").innerText = gameLives;
}

startBtn.addEventListener("click", function (e) {
  restartGame();
  // document.querySelector(".main-game").style.display = "none";
});

function startGame() {
  restartGame();
  let timeout = 0;
  let loop = setInterval(function () {
    timeout = Math.floor(Math.random() * 600 - 100);
    if (!gameOver) {
      createBubble();
    } else if (noPop !== total) {
      clearInterval(loop);
      shadow.style.display = "flex";
      shadow.querySelector(".loser").style.display = "block";
    } 
  }, 800 + timeout);
}