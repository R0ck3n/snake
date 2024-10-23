const canvas = document.querySelector("#board-game");
const ctx = canvas.getContext("2d");

const box = 20;
const snakeHead = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

function getRandomDirection() {
  const directions = ["right", "left", "up", "down"];
  return directions[Math.floor(Math.random() * directions.length)];
}

let direction = getRandomDirection();
let velocityX = 0;
let velocityY = 0;

switch (direction) {
  case "right":
    velocityX = box / 10;
    velocityY = 0;
    break;
  case "left":
    velocityX = -box / 10;
    velocityY = 0;
    break;
  case "up":
    velocityX = 0;
    velocityY = -box / 10;
    break;
  case "down":
    velocityX = 0;
    velocityY = box / 10;
    break;
}

const snakeHeadImg = new Image();
snakeHeadImg.src = "../../public/snake_green_head_32.png";

function drawImage() {
  ctx.drawImage(snakeHeadImg, snakeHead.x, snakeHead.y, box, box);
}

function drawSquare(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function updateMove() {
  snakeHead.x += velocityX;
  snakeHead.y += velocityY;
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawImage();
}

function gameLoop() {
  if (checkCollision()) {
    alert("Game Over");
    return;
  } else {
    updateCanvas();
    updateMove();
  }
  requestAnimationFrame(gameLoop);
}

function changeDirection(ev) {
  ev.preventDefault();
  const key = ev.keyCode;

  if (key === 38 && velocityY === 0) {
    velocityX = 0;
    velocityY = -box / 10;
  } else if (key === 40 && velocityY === 0) {
    velocityX = 0;
    velocityY = box / 10;
  } else if (key === 37 && velocityX === 0) {
    velocityX = -box / 10;
    velocityY = 0;
  } else if (key === 39 && velocityX === 0) {
    velocityX = box / 10;
    velocityY = 0;
  }
}

function checkCollision() {
  if (
    snakeHead.x + box - 1 >= canvas.width ||
    snakeHead.x < -1 ||
    snakeHead.y + box - 1 >= canvas.height ||
    snakeHead.y < -1
  ) {
    return true;
  }

  return false;
}

document.addEventListener("keydown", changeDirection);

updateCanvas();
gameLoop();
