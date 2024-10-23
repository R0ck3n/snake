const canvas = document.querySelector("#board-game");
const ctx = canvas.getContext("2d");
const box = 20;
let food = getRandomPosition();

const snake = [{
  x: canvas.width / 2,
  y: canvas.height / 2,
}];

let velocityX = 0;
let velocityY = 0;

const snakeHeadImg = new Image();
snakeHeadImg.src = "../../public/snake_green_head_32.png";

const snakeBodyImg = new Image();
snakeBodyImg.src = "../../public/snake_green_blob_32.png";

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      // Dessiner la tête du serpent
      ctx.drawImage(snakeHeadImg, snake[i].x, snake[i].y, box, box);
    } else {
      // Dessiner le corps du serpent
       ctx.drawImage(snakeBodyImg, snake[i].x, snake[i].y, box, box);
    }

  }
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);
}

function updateMove() {
  // Enregistrer les anciennes positions de la tête
  const previousHeadX = snake[0].x;
  const previousHeadY = snake[0].y;
  
  // Mettre à jour la position de la tête
  snake[0].x += velocityX;
  snake[0].y += velocityY;

  // Mettre à jour les segments du corps pour qu'ils suivent la tête
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }

  // Mettre à jour la position du premier segment avec l'ancienne position de la tête
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
    return;
  }

  setTimeout(gameLoop, 100); // Boucle de jeu avec un délai pour gérer le rythme
}

function changeDirection(ev) {
  ev.preventDefault();
  const key = ev.keyCode;

  if (key === 38 && velocityY === 0) {
    velocityX = 0;
    velocityY = -box; // Déplacement par la taille du bloc
  } else if (key === 40 && velocityY === 0) {
    velocityX = 0;
    velocityY = box; // Déplacement par la taille du bloc
  } else if (key === 37 && velocityX === 0) {
    velocityX = -box; // Déplacement par la taille du bloc
    velocityY = 0;
  } else if (key === 39 && velocityX === 0) {
    velocityX = box; // Déplacement par la taille du bloc
    velocityY = 0;
  }
}

function checkCollision() {
  // Vérifie si le serpent sort du canvas
  if (
    snake[0].x >= canvas.width ||
    snake[0].x < 0 ||
    snake[0].y >= canvas.height ||
    snake[0].y < 0
  ) {
    return true;
  }

  // Détection de collision avec le corps du serpent
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }

  // Détection de collision avec la nourriture
  if (snake[0].x === food.x && snake[0].y === food.y) {
    // Ajouter un nouveau segment à la fin du serpent
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    
    // Générer une nouvelle position pour la nourriture
    food = getRandomPosition();
  }

  return false;
}

function getRandomPosition() {
  const x = Math.floor(Math.random() * canvas.width / box) * box;
  const y = Math.floor(Math.random() * canvas.height / box) * box;
  return { x, y };
}

document.addEventListener("keydown", changeDirection);

updateCanvas();
gameLoop();
