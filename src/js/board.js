const urlAPI = "http://127.0.0.1:8000/";
const params = new URLSearchParams(window.location.search);
const lvl = parseInt(params.get("lvl"));
const movedifficulty = [200, 150, 100];
const foodTimerDifficulty = [6000, 3000, 2000];
const resetBtn = document.querySelector("#reset-btn");
const score = document.getElementById("score");
const startButton = document.getElementById("start-btn");
const leaderboardList = document.querySelector(".leaderboard_list");
const canvas = document.querySelector("#board-game");
const ctx = canvas.getContext("2d");
const box = 20;
let food = getRandomPosition();
let lastKey;
let isGameStart = false;
let user;
let foodTimer;
let proControls = false;
const checkboxControls = document.querySelector("#control-options");

checkboxControls.addEventListener("change", () => {
  proControls = checkboxControls.checked;
});

const snake = [
  {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
];

score.textContent = snake.length - 1;

let velocityX = 0;
let velocityY = 0;

const snakeHeadImg = new Image();
snakeHeadImg.src = "../../public/snake_green_head_32.png";

const snakeBodyImg = new Image();
snakeBodyImg.src = "../../public/snake_green_blob_32.png";

const appleImg = new Image();
appleImg.src = "../../public/apple_red_32.png";

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.drawImage(snakeHeadImg, snake[i].x, snake[i].y, box, box);
    } else {
      ctx.drawImage(snakeBodyImg, snake[i].x, snake[i].y, box, box);
    }
  }
}

function drawFood() {
  ctx.drawImage(appleImg, food.x, food.y, box, box);
}

function updateMove() {
  const previousHeadX = snake[0].x;
  const previousHeadY = snake[0].y;

  snake[0].x += velocityX;
  snake[0].y += velocityY;

  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }

  if (snake.length > 1) {
    snake[1].x = previousHeadX;
    snake[1].y = previousHeadY;
  }
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
}

function gameLoop() {
  updateMove();
  updateCanvas();

  if (checkCollision()) {
    alert("Game Over");
    const user = prompt("Veuillez entrer votre nom : ");
    storeUserScoreInLocalStorage(user, snake.length - 1);
    emptyList();
    displayScoresIntoLeaderboard();
    return;
  }

  setTimeout(gameLoop, movedifficulty[lvl]);
}

function changeDirection(ev) {
  let key = ev.keyCode;

  // haut : 38
  // bas : 40
  // Gauche : 37
  // droite : 39

  if (isGameStart) {
    if (proControls) {
      if (lastKey === 37 && key === 37) {
        key = 40;
      } else if (lastKey === 40 && key === 37) {
        key = 39;
      } else if (lastKey === 39 && key === 37) {
        key = 38;
      } else if (lastKey === 39 && key === 39) {
        key = 40;
      } else if (lastKey === 40 && key === 39) {
        key = 37;
      } else if (lastKey === 37 && key === 39) {
        key = 38;
      }
    }

    if (key === 38 && velocityY === 0) {
      velocityX = 0;
      velocityY = -box;
    } else if (key === 40 && velocityY === 0) {
      velocityX = 0;
      velocityY = box;
    } else if (key === 37 && velocityX === 0) {
      velocityX = -box;
      velocityY = 0;
    } else if (key === 39 && velocityX === 0) {
      velocityX = box;
      velocityY = 0;
    }
  } else if (key === 32) {
    isGameStart = true;
    resetFoodTimer();
    const random = Math.floor(Math.random() * 4) + 1;

    switch (random) {
      case 1:
        velocityX = box;
        break;
      case 2:
        velocityX = -box;
        break;
      case 3:
        velocityY = box;
        break;
      case 4:
        velocityY = -box;
        break;
      default:
        velocityX = box;
        break;
    }
  }

  lastKey = key;
}

function checkCollision() {
  if (
    snake[0].x >= canvas.width ||
    snake[0].x < 0 ||
    snake[0].y >= canvas.height ||
    snake[0].y < 0
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }

  const distanceX = Math.abs(snake[0].x - food.x);
  const distanceY = Math.abs(snake[0].y - food.y);
  if (distanceX < box && distanceY < box) {
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    score.textContent = snake.length - 1;
    food = getRandomPosition();
    resetFoodTimer(); // Réinitialiser le timer pour la nourriture
  }

  return false;
}

function getRandomPosition() {
  const x = Math.floor((Math.random() * canvas.width) / box) * box;
  const y = Math.floor((Math.random() * canvas.height) / box) * box;
  return { x, y };
}

function resetFoodTimer() {
  clearTimeout(foodTimer);
  foodTimer = setTimeout(() => {
    food = getRandomPosition();
    resetFoodTimer();
  }, foodTimerDifficulty[lvl]); // timer reset food 3s
}

document.addEventListener("keydown", changeDirection);
startButton.addEventListener("click", () => {
  isGameStart = true;
  resetFoodTimer();
  const random = Math.floor(Math.random() * 4) + 1;

  switch (random) {
    case 1:
      velocityX = box;
      break;
    case 2:
      velocityX = -box;
      break;
    case 3:
      velocityY = box;
      break;
    case 4:
      velocityY = -box;
      break;
    default:
      velocityX = box;
      break;
  }

  resetFoodTimer(); // Démarrer le timer pour la nourriture au début du jeu
});

function storeUserScoreInLocalStorage(name, score) {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({ name, score });
  localStorage.setItem("scores", JSON.stringify(scores));
}

function getAllScoresFromLocalStorage() {
  return JSON.parse(localStorage.getItem("scores")) || [];
}

function displayScoresIntoLeaderboard() {
  const scores = getAllScoresFromLocalStorage();
  const orderedScore = order(scores);

  if (scores.length === 0) {
    leaderboardList.textContent = "No Scores";
  }

  orderedScore.forEach((score) => {
    const li = document.createElement("li");
    li.textContent = score.name + ": " + score.score;
    leaderboardList.appendChild(li);
  });
}

function order(list) {
  return list.sort((a, b) => b.score - a.score).slice(0, 5);
}

function emptyList() {
  leaderboardList.innerHTML = "";
}

resetBtn.addEventListener("click", () => {
  window.location.reload();
});

displayScoresIntoLeaderboard();
updateCanvas();
gameLoop();
