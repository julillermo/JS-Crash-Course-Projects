/**@type {HTMLCanvasElement} */
let canvas = document.querySelector("#canvas");
/**@type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, width, height);

// THE BALL
const BALL_SIZE = 5;
let ballPosition = { x: 20, y: 30 };
ctx.fillStyle = "white";
ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);

let xSpeed = 4;
let ySpeed = 2;

// THE PADDLE
const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let rightPaddleTop = 30;

document.addEventListener("mousemove", (e) => {
  rightPaddleTop = e.y - canvas.offsetTop;
});

function draw() {
  // Fill the canvas with black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // Everything else will be white
  ctx.fillStyle = "white";

  // Draw the ball
  ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);

  // Draw the paddles
  ctx.fillRect(PADDLE_OFFSET, leftPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(
    width - PADDLE_WIDTH - PADDLE_OFFSET,
    rightPaddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
}

function update() {
  ballPosition.x += xSpeed;
  ballPosition.y += ySpeed;
}

function checkPaddleCollision(ball, paddle) {
  // Check if the paddle and ball overlap vertically and horizontally
  return (
    ball.left < paddle.right &&
    ball.right > paddle.left &&
    ball.top < paddle.bottom &&
    ball.bottom > paddle.top
  );
}

function adjustAngle(distanceFromTop, distanceFromBottom) {
  if (distanceFromTop < 0) {
    // If ball hit near top of paddle, reduce ySpeed
    ySpeed -= 0.5;
  } else if (distanceFromBottom < 0) {
    // If ball hit near bottom of paddle, increase ySpeed
    ySpeed += 0.5;
  }
}

function checkCollision() {
  let ball = {
    left: ballPosition.x,
    right: ballPosition.x + BALL_SIZE,
    top: ballPosition.y,
    bottom: ballPosition.y + BALL_SIZE,
  };

  let leftPaddle = {
    left: PADDLE_OFFSET,
    right: PADDLE_OFFSET + PADDLE_WIDTH,
    top: leftPaddleTop,
    bottom: leftPaddleTop + PADDLE_HEIGHT,
  };
  let rightPaddle = {
    left: width - PADDLE_WIDTH - PADDLE_OFFSET,
    right: width - PADDLE_WIDTH,
    top: rightPaddleTop,
    bottom: rightPaddleTop + PADDLE_HEIGHT,
  };

  if (checkPaddleCollision(ball, leftPaddle)) {
    // Left paddle collision happend
    xSpeed = Math.abs(xSpeed);
  }
  if (checkPaddleCollision(ball, rightPaddle)) {
    // Right paddle collision happend
    xSpeed = -Math.abs(xSpeed);
  }

  if (ball.left < 0 || ball.right > width) {
    xSpeed = -xSpeed;
  }
  if (ball.top < 0 || ball.bottom > height) {
    ySpeed = -ySpeed;
  }
}

function gameLoop() {
  draw();
  update();
  checkCollision();

  // Call this function again after a timout
  setTimeout(gameLoop, 30);
}

gameLoop();
