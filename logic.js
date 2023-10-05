const game = document.querySelector(".gameBoard");
const egg = document.querySelector(".egg");

let counter = 0;

let snake = [{ x: 0, y: 0 }];
let eggX = 0;
let eggY = 0;
let direction = "right";

function updateEggPosition() {
  eggX = Math.floor(Math.random() * ((game.clientWidth - 10) / 30)) * 30;
  eggY = Math.floor(Math.random() * ((game.clientHeight - 10) / 30)) * 30;

  console.log(game.clientWidth);

  console.log("X:" + eggX);
  console.log("Y:" + eggY);
  egg.style.top = `${eggY}px`;
  egg.style.left = `${eggX}px`;
}

function moveSnake() {
  let newHead = {
    x: snake[0].x,
    y: snake[0].y,
  };

  if (direction === "right") {
    newHead.x += 30;
  } else if (direction === "left") {
    newHead.x -= 30;
  } else if (direction === "down") {
    newHead.y += 30;
  } else if (direction === "up") {
    newHead.y -= 30;
  }

  if (newHead.x === eggX && newHead.y === eggY) {
    counter++;
    updateScore();
    updateEggPosition();
    snake.push({});
    let snakeSegment = document.createElement("div");
    snakeSegment.className = "snake";
    game.insertAdjacentElement("beforeend", snakeSegment);
  }

  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }

  snake[0] = { ...newHead };

  // Check that snake is in game board
  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x > game.clientWidth - 10 ||
    newHead.y > game.clientHeight - 10
  ) {
    endGame();
    return;
  }

  // Check that the snake doesnt eat itself, skip index 0
  snake.forEach((segment, index) => {
    if (index === 0) {
      return;
    }
    if (newHead.x === segment.x && newHead.y === segment.y) {
      endGame();
      return;
    }
  });

  // Update snake positions
  let snakeSegments = document.querySelectorAll(".snake");
  snakeSegments.forEach((segment, index) => {
    segment.style.left = `${snake[index].x}px`;
    segment.style.top = `${snake[index].y}px`;
  });

  if (counter >= 35) {
    clearInterval(gameSpeed);
    gameSpeed = setInterval(moveSnake, 50);
  } else if (counter >= 25) {
    clearInterval(gameSpeed);
    gameSpeed = setInterval(moveSnake, 60);
  } else if (counter >= 15) {
    clearInterval(gameSpeed);
    gameSpeed = setInterval(moveSnake, 80);
  } else if (counter >= 5) {
    clearInterval(gameSpeed);
    gameSpeed = setInterval(moveSnake, 100);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "w" && direction != "down") {
    direction = "up";
  } else if (e.key === "a" && direction != "right") {
    direction = "left";
  } else if (e.key === "s" && direction != "up") {
    direction = "down";
  } else if (e.key === "d" && direction != "left") {
    direction = "right";
  }
});

updateEggPosition();

let gameSpeed = setInterval(moveSnake, 120);

function updateScore() {
  document.querySelector(".counter").innerHTML = counter;
}

function endGame() {
  clearInterval(gameSpeed);
}

console.log(direction);
