const canvas = document.querySelector('#board-game')
const ctx = canvas.getContext("2d");


const box = 20;



const snake = {
    position : {
        x : (canvas.width / 2) - box /2 ,
        y: (canvas.height / 2) - box /2
    }
}

/** Dessine un carré sur le canvas */
function drawSquare (x,y,size, color) {

    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

drawSquare(snake.position.x,snake.position.y, box, 'white');