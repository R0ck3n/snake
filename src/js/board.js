const canvas = document.querySelector("#board-game");
const ctx = canvas.getContext("2d");

const box = 20;
const snakeHead = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
let direction = "right";

const snakeHeadImg = new Image();
snakeHeadImg.src = "../../public/snake_green_head_32.png";

//snakeHeadImg.onload = () => {
//     ctx.drawImage(snakeHeadImg, snakeHead.x, snakeHead.y, box, box);
//   };

/** Dessine un carré sur le canvas */
function drawSquare(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function updateMove(direction) {
  switch (direction) {
    // haut
    case "up":
      snakeHead.y -= box;
      break;
    // bas
    case "down":
      snakeHead.y += box;
      break;

    // gauche
    case "left":
      snakeHead.x -= box;
      break;

    // droite
    case "right":
      snakeHead.x += box;
      break;
  }
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSquare(snakeHead.x, snakeHead.y, box, "white");
}

function gameInterval() {
  const interval = setInterval(() => {
    if (checkCollision()) {
      clearInterval(interval);
      alert("Game Over");
    } else {
      updateCanvas();

      updateMove(direction);
    }
  }, 100);
}

function changeDirection(ev) {
  ev.preventDefault();
  const key = ev.keyCode;
  switch (key) {
    // haut
    case 38:
      direction = "up";
      break;
    // bas
    case 40:
      direction = "down";
      break;

    // gauche
    case 37:
      direction = "left";
      break;

    // droite
    case 39:
      direction = "right";
      break;
  }
}

function checkCollision() {
  if (
    snakeHead.x >= canvas.width ||
    snakeHead.x < 0 ||
    snakeHead.y >= canvas.height ||
    snakeHead.y < 0
  ) {
    return true;
  }

  return false;
}

document.addEventListener("keydown", changeDirection);

updateCanvas();
gameInterval();
