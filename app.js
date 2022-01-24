const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 5;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;


let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const appleSound = new Audio("apple_sound.mp3");
const gameIsOverSound = new Audio("game_is_over.mp3");
const nextLevelSound = new Audio('next_level_sound.mp3');

//game loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;        
    }
    nextLevelSound.loop = false;
        nextLevelSound.play();
    clearScreen();  
    checkAppleCollision();
    drawApple();
    drawSnake();
    
    if(score === 0){
        speed = 5;
        ctx.fillStyle = "black";
        ctx.font = "40px Verdana";
        ctx.fillText("Start!", canvas.width / 2.5, canvas.height / 2.5)
    }
    if(score>0){
        speed = 5;
    }
    if(score === 5){
        speed = 7;
        ctx.fillStyle = "black";
        ctx.font = "40px Verdana";
        ctx.fillText("Beginner!", canvas.width / 3.5, canvas.height / 2)
    }
    if(score>5){
        speed = 7;
    }
    if(score === 10){
        speed = 9;
        ctx.fillStyle = "black";
        ctx.font = "40px Verdana";
        ctx.fillText("Middle !", canvas.width / 3.5, canvas.height / 2)
    }
    if(score>10){
        speed = 9;
    }
    if(score === 17){
        speed = 12;
        ctx.fillStyle = "black";
        ctx.font = "40px Verdana";
        ctx.fillText("Advanced!", canvas.width / 4, canvas.height / 2)
    }
    if(score>17){
        speed = 12;
    }


    drawScore();
    setTimeout(drawGame, 1000/ speed);
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity ===0 && xVelocity ===0){
        return false;
    }

    //walls  left
    if (headX < 0 ){
        gameOver = true;
    }
    //walls  right
    else if(headX === tileCount){
        gameOver = true;
    }
    //walls  top
    else if(headY < 0 ){
        gameOver = true;
    }
    //walls  bottom
    else if(headY === tileCount){
        gameOver = true
    }

    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }
    

    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "55px Verdana";
        gameIsOverSound.play();
        nextLevelSound.pause();
        ctx.fillText("Game Over!", canvas.width / 9, canvas.height / 1.5)
    }
 
    return gameOver;
}

function drawScore (){
    ctx.fillStyle="black";
    ctx.font = "15px Verdana";
    ctx.fillText("Score " + score, canvas.width-390, 20);
}

function clearScreen(){
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
function drawSnake(){
    
    ctx.fillStyle = 'blue';
    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new SnakePart(headX, headY)); // put an item at the end of the list next to head
    if(snakeParts.length > tailLength){
        snakeParts.shift(); //remove the furthers item from the snake parts if have more than our tail size
    }
    ctx.fillStyle = "orange"
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize)
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX* tileCount, appleY*tileCount, tileSize, tileSize)

}


function checkAppleCollision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        appleSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1 )
        return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if(event.keyCode == 40 ){
        if(yVelocity == -1 )
        return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if(event.keyCode == 37 ){
        if(xVelocity == 1 )
        return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if(event.keyCode == 39 ){
        if(xVelocity == -1 )
        return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();