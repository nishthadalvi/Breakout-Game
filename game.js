//Set up canvas
const CANVAS = document.getElementById("breakout");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.style.border = "5px solid #787777";

//Game variables and constants
const PADDLE_WIDTH = 70;
const PADDLE_MARGIN_BOTTOM = 5;
const PADDLE_HEIGHT = 10;
const BALL_RADIUS = 8;
var LIFE = 3;
var SCORE = 0;
const SCOREUNIT = 10;
var LEVEL = 1;
const MAX_LEVEL = 5;
var GAME_OVER = false;
var leftArrow = false;
var rightArrow = false

//Create paddle
const paddle = {
    x : CANVAS.width/2 - PADDLE_WIDTH/2,
    y : CANVAS.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx : 5
}

//Draw paddle
function drawPaddle(){
    CONTEXT.fillStyle = "#96918f";
    CONTEXT.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

//Control paddle
document.addEventListener("keydown", function(event){
    if(event.keyCode == 37){
        leftArrow = true;
    } else if(event.keyCode == 39){
        rightArrow = true;
    }
});

document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        leftArrow = false;
    } else if(event.keyCode == 39){
        rightArrow = false;
    }
});

//Move paddle
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width <= CANVAS.width){
        paddle.x += paddle.dx;
    } else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

//Create Ball
const ball = {
    x : CANVAS.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 4,
    dx : 3 * (Math.random() * 2 -1),
    dy : -3
}

//Draw ball
function drawBall(){
    CONTEXT.beginPath();
    CONTEXT.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    CONTEXT.fillStyle = "#ffffff";
    CONTEXT.fill();

    CONTEXT.closePath();
}

//Move ball
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//Ball stays within walls
function ballLimits(){
    if(ball.x + ball.radius > CANVAS.width || ball.x - ball.radius < 0){
        ball.dx = -ball.dx;
    }

    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }

    if(ball.y + ball.radius > CANVAS.height){
        LIFE--; // lose a life
        resetBall();
    }
}

//Reset the ball
function resetBall(){
    ball.x = CANVAS.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 -1);
    ball.dy = -3;
}

//Ball hits paddle
function ballHitsPaddle(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y +
        paddle.height && ball.y > paddle.y){

            let collidePoint = ball.x - (paddle.x + paddle.width/2);
            collidePoint = collidePoint/(paddle.width/2);
            let angle = collidePoint * Math.PI/3
            ball.dx = ball.speed * Math.sin(angle);
            ball.dy = -ball.speed * Math.cos(angle);
        }
}

//Create bricks
var brickRowCount = 1;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 15;
var brickOffsetTop = 30;
var brickOffsetLeft = 85;
var bricks = [];

function createBricks(){
    for(var r=0; r<1; r++){
        bricks[r] = [];
        for(var c=0; c<brickColumnCount; c++){
            bricks[r][c] = { x: 0, y: 0, status: true};
        }
    }
        for(var r=1; r<brickRowCount; r++){
            bricks[r] = [];
            for(var c=0; c<brickColumnCount; c++){
                bricks[r][c] = { x: 0, y: 0, status: true, hitCount: 0};
            }
        }
}

createBricks();


//Draw bricks
function drawBricks() {
    for(var r=0; r<1; r++) {
        for(var c=0; c<brickColumnCount; c++) {
            if(bricks[r][c].status) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[r][c].x = brickX;
                bricks[r][c].y = brickY;
                CONTEXT.beginPath();
                CONTEXT.rect(brickX, brickY, brickWidth, brickHeight);
                CONTEXT.fillStyle = "#a33e0f";
                CONTEXT.fill();
                CONTEXT.closePath();
            }
        }
    }

    if(LEVEL >= 2){
        for(var r=1; r<brickRowCount; r++) {
            for(var c=0; c<brickColumnCount; c++) {
                if(bricks[r][c].status) {
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[r][c].x = brickX;
                    bricks[r][c].y = brickY;
                    CONTEXT.beginPath();
                    CONTEXT.rect(brickX, brickY, brickWidth, brickHeight);
                    CONTEXT.fillStyle = "#e37a3d";
                    CONTEXT.fill();
                    CONTEXT.closePath();
                }
            }
        }
    }

    if(LEVEL >= 3){
        for(var r=2; r<brickRowCount; r++) {
            for(var c=0; c<brickColumnCount; c++) {
                if(bricks[r][c].status) {
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[r][c].x = brickX;
                    bricks[r][c].y = brickY;
                    CONTEXT.beginPath();
                    CONTEXT.rect(brickX, brickY, brickWidth, brickHeight);
                    CONTEXT.fillStyle = "#faf14d";
                    CONTEXT.fill();
                    CONTEXT.closePath();
                }
            }
        }
    }

    if(LEVEL >= 4){
        for(var r=3; r<brickRowCount; r++) {
            for(var c=0; c<brickColumnCount; c++) {
                if(bricks[r][c].status) {
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[r][c].x = brickX;
                    bricks[r][c].y = brickY;
                    CONTEXT.beginPath();
                    CONTEXT.rect(brickX, brickY, brickWidth, brickHeight);
                    CONTEXT.fillStyle = "#399e43";
                    CONTEXT.fill();
                    CONTEXT.closePath();
                }
            }
        }
    }

    if(LEVEL == 5){
        for(var r=4; r<brickRowCount; r++) {
            for(var c=0; c<brickColumnCount; c++) {
                if(bricks[r][c].status) {
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[r][c].x = brickX;
                    bricks[r][c].y = brickY;
                    CONTEXT.beginPath();
                    CONTEXT.rect(brickX, brickY, brickWidth, brickHeight);
                    CONTEXT.fillStyle = "#83399e";
                    CONTEXT.fill();
                    CONTEXT.closePath();
                }
            }
        }
    }
}

function ballBrickCollision(){
    for (var r = 0; r < 1; r++) {
        for (var c = 0; c < brickColumnCount; c++) {
            let b = bricks[r][c];
            if (b.status) {
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brickWidth && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brickHeight) {
                    ball.dy = -ball.dy;
                    b.status = false;
                    SCORE+=10;
                }
            }
        }
    }

    if(LEVEL >= 2){
        for (var r = 1; r < 2; r++) {
            for(var c = 0; c < brickColumnCount; c++) {
                let b = bricks[r][c];
                if (b.status && b.hitCount < 1) {
                    if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brickWidth && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brickHeight) {
                        ball.dy = -ball.dy;
                        b.hitCount++;
                    }
                }
                else if (b.status){
                    if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brickWidth && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brickHeight) {
                        ball.dy = -ball.dy;
                        b.hitCount++;
                        b.status = false;
                        SCORE+=20;
                    }
                }
            }
        }
    }

    if(LEVEL >= 3){
        for (var r = 2; r < 3; r++) {
            for(var c = 0; c < brickColumnCount; c++) {
                let b = bricks[r][c];
                if (b.status && b.hitCount < 2) {
                    if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brickWidth && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brickHeight) {
                        ball.dy = -ball.dy;
                        b.hitCount++;
                    }
                }
                else if (b.status){
                    if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brickWidth && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brickHeight) {
                        ball.dy = -ball.dy;
                        b.hitCount++;
                        b.status = false;
                        SCORE+=30;
                    }
                }
            }
        }
    }

    if(LEVEL >= 4){
        for (var r = 3; r < 4; r++) {
            for(var c = 0; c < brickColumnCount; c++) {
                let b = bricks[r][c];
                if (b.status && b.hitCount < 3) {
                    if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brickWidth && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brickHeight) {
                        ball.dy = -ball.dy;
                        b.hitCount++;
                    }
                }
                else if (b.status){
                    if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brickWidth && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brickHeight) {
                        ball.dy = -ball.dy;
                        b.hitCount++;
                        b.status = false;
                        SCORE+=40;
                    }
                }
            }
        }
    }

    if(LEVEL == 5){
        for (var r = 4; r < 5; r++) {
            for(var c = 0; c < brickColumnCount; c++) {
                let b = bricks[r][c];
                if (b.status && b.hitCount < 4) {
                    if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brickWidth && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brickHeight) {
                        ball.dy = -ball.dy;
                        b.hitCount++;
                    }
                }
                else if (b.status){
                    if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brickWidth && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brickHeight) {
                        ball.dy = -ball.dy;
                        b.hitCount++;
                        b.status = false;
                        SCORE+=50;
                    }
                }
            }
        }
    }


}

//Game stats
function showGameStats(text, textX, textY){
    CONTEXT.fillStyle = "#ffffff";
    CONTEXT.font = "20px Germania One";
    CONTEXT.fillText(text, textX,textY);
}

//DRAW FUNCTION
function draw(){
    drawPaddle(); 
    drawBall();
    drawBricks();
    showGameStats("Score: " + SCORE, 20, 20);
    showGameStats("Lives: " + LIFE, CANVAS.width - 70, 20);
    showGameStats("Level " + LEVEL, CANVAS.width/2 - 15, 20);
}

//UPDATE FUNCTION
function update(){
    movePaddle();
    moveBall();
    ballLimits();
    ballHitsPaddle();
    ballBrickCollision();
    gameOver();
    levelUp();
}

//Game over
function gameOver(){
    if(LIFE <= 0){
        showYouLose();
        GAME_OVER = true;
    }
}

//Level Up
function levelUp(){
    let isLevelDone = true;
    for(var r=0; r<brickRowCount; r++) {
        for(var c=0; c<brickColumnCount; c++) {
            isLevelDone = isLevelDone && !bricks[r][c].status;
        }
    }

    if(isLevelDone){
        if(LEVEL >= MAX_LEVEL){
            showYouWon();
            GAME_OVER = true;
            start = true;
            return;
        }
        else{
            brickRowCount++;
            createBricks();
            ball.speed+= 0.5;
            resetBall();
            LEVEL++;
        }
    }
}

function loop(){
    CONTEXT.fillStyle = "#000000";
    CONTEXT.fillRect(0,0,600,400);
    draw();

    update();

    if(!GAME_OVER){
        requestAnimationFrame(loop);
    }
    
}
loop();

//Game Over 
const gameover = document.getElementById("gameover");
const youwon = document.getElementById("youwon");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");

//Click play again
restart.addEventListener("click", function(){
    location.reload();
});

//Show you win
function showYouWon(){
    gameover.style.display = "block";
}

//Show you lose
function showYouLose(){
    gameover.style.display = "block";
}
