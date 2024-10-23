const canvas = document.querySelector("#board-game");
const ctx = canvas.getContext("2d");
const box = 20;
let food = getRandomPosition()

const snake = [{
  x: canvas.width / 2,
  y: canvas.height / 2,
}];

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

const snakeBodyImg = new Image();
snakeBodyImg.src = "../../public/snake_green_blob_32.png";


function drawImage() {
  ctx.drawImage(snakeHeadImg, snake[0].x, snake[0].y, box, box);
}

function drawSquare(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x,food.y, box, box);
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    if (i===0) {
      ctx.drawImage(snakeHeadImg, snake[i].x, snake[i].y, box, box);
    }else {
      console.log(snake[i].x,snake[i].y);
      
      ctx.drawImage(snakeBodyImg, snake[i-1].x, snake[i-1].y, box, box);
    }
    
  }
}

function updateMove() {
  snake[0].x += velocityX;
  snake[0].y += velocityY;
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake()
  drawFood()
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
  // Vérifie si le serpent sort du canvas
  if (
    snake[0].x + box - 1 >= canvas.width ||
    snake[0].x < -1 ||
    snake[0].y + box - 1 >= canvas.height ||
    snake[0].y < -1
  ) {
    return true;
  }

  // Détection de collision avec la pomme
  const snakeLeft = snake[0].x;
  const snakeRight = snake[0].x + box;
  const snakeTop = snake[0].y;
  const snakeBottom = snake[0].y + box;

  const foodLeft = food.x;
  const foodRight = food.x + box;
  const foodTop = food.y;
  const foodBottom = food.y + box;

  // Vérifie si les rectangles se chevauchent
  if (
    snakeRight > foodLeft &&
    snakeLeft < foodRight &&
    snakeBottom > foodTop &&
    snakeTop < foodBottom
  ) {
    food = getRandomPosition();
    snake.push({})
    // ajouter score ici
  }

  return false;
}


function getRandomPosition() {
const x = Math.floor(Math.random() * canvas.width / box) * box
const y = Math.floor(Math.random() * canvas.height / box) * box

  return {x,y};
}

console.log(food.x,food.y);





document.addEventListener("keydown", changeDirection);

updateCanvas();
gameLoop();
