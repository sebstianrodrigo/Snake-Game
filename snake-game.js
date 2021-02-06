const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
let speed = 8;//initial speed

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 4;
let headY = 4;
const snakeParts = [];//Array to include snakesParts
let tailLength = 2; 

let appleX = 10;
let appleY = 10;

let xVelocity=0;
let yVelocity=0;

let score = 0;

//Inside 
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return ;
    }
    clearScreen();
    
    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();
    
    if(score > 5){
        speed = 9;
    }
    if(score > 10){
        speed = 11;
    }

    setTimeout(drawGame, 1000/ speed);
} 

function isGameOver(){
    let gameOver = false;

    if(yVelocity ===0 && xVelocity ===0){
        return false;
    }
    
    //Game over conditions
    if(headX < 0 ){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true
    }
    else if( headY < 0){
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true
    }

    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "50px Verdana";

        if (gameOver) {
            ctx.fillStyle = "black";
            ctx.font = "50px Verdana";
            ctx.fillText("GAME OVER", canvas.width /8, canvas.height / 2);//Position of the Text
          }
        ctx.fillText("GAME OVER", canvas.width /8, canvas.height / 2);//Positoon of the Text
      }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "black";
    ctx.font = "18px impact"
    ctx.fillText("Score: " + score, canvas.width-80, 20);
}

function clearScreen(){
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
   
    ctx.fillStyle = 'rgb(71, 117, 2)';
    
    for(let i =0; i < snakeParts.length; i++){
        let part =  snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength){ 
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY* tileCount, tileSize,tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize)
    ctx.lineWidth=4;//Border to show a small square red
    ctx.strokeStyle="#fff";
    ctx.strokeRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize)
}

function checkAppleCollision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        
    }
}
document.body.addEventListener('keydown', keyDown);
//Directions
function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
       //right
       if(event.keyCode == 39){
        if(xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }
    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
}
drawGame();