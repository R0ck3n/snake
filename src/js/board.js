const canvas = document.querySelector("#board-game");
const ctx = canvas.getContext("2d");

const box = 20;
const snakeHead = {
  x: (canvas.width - box) / 2 ,
  y: (canvas.height - box) / 2 
};
const snakeHeadImg = new Image();
snakeHeadImg.src = '../../public/snake_green_head_32.png'


snakeHeadImg.onload = () => {
    ctx.drawImage(snakeHeadImg, snakeHead.x, snakeHead.y, box, box);
  };


/** Dessine un carré sur le canvas */
function drawSquare(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

//drawSquare(snakeHead.x, snakeHead.y, box, "white");


