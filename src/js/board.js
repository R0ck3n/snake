const canvas = document.querySelector("#board-game");
const ctx = canvas.getContext("2d");

const box = 20;
const snakeHead = {
  x: (canvas.width - box) / 2,
  y: (canvas.height - box) / 2,
};
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



function move(key) {


  switch (key) {
    // haut
    case 38:
      snakeHead.y -= box;
      break;
    // bas
    case 40:
        snakeHead.y += box;
      break;

    // gauche
    case 37:
        snakeHead.x  -= box
      break;

    // droite
    case 39:
      snakeHead.x  += box
      break;
  }
}


function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare(snakeHead.x, snakeHead.y, box, "white");
}

function gameInterval () {
    const interval = setInterval(()=>{
        updateCanvas()
    },150)
}

document.addEventListener("keydown", (ev) => {
  ev.preventDefault();
  move(ev.keyCode)
  console.log(ev.keyCode);
});

updateCanvas();
gameInterval();