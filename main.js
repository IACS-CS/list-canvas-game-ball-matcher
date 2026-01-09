/* Main game file: main.js */
/* Game: [Ball Matcher] */
/* Authors: [Adam Tran] */
/* Description: [A game where there are 20 balls with different colors
and the player has to click to chanage all the colors to blue. When the
player makes all the balls blue, the screen tells them how long it took.] */
/* Citations: [List any resources, libraries, tutorials, etc you used here] 
/* Note: Used AI to make the colors of the balls distribute evenly, make
the ball blue when player clicks the ball, and for the game over screen.  */
/* including summaries of prompts and/or interactions you had with the AI */
/* In addition, of course, any AI-generated code should be clearly maked */
/* in comments throughout the code, though of course when using e.g. CoPilot */
/* auto-complete it maye be impractical to mark every line, which is why you */
/* should also include a summary here */

import "./style.css";

import { GameInterface } from "simple-canvas-library";

let gi = new GameInterface();

/* Variables: Top-Level variables defined here are used to hold game state */
let ballsXs = [];
let ballsYs = [];
let velocityXs = [];
let velocityYs = [];
let clickCount = 0;
let gameTimer = 0;
const BALL_COUNT = 20;
const BALL_RADIUS = 15;
const CLICK_RADIUS = 15;
const maxSpeed = 3;
// Draw 20 balls at random positions
// This code was helped written by Github Copilot
for (let i = 0; i < BALL_COUNT; i++) {
  ballsXs.push(Math.random() * 480 + 100);
  ballsYs.push(Math.random() * 480 + 100);
  velocityXs.push(Math.random() * 4 - 1);
  velocityYs.push(Math.random() * 4 - 1);
}
let ballsColors = [];
// This code was helped written by Github Copilot
for (let i = 0; i < BALL_COUNT; i++) {
  // Make the balls use 4 different colors evenly
  let colorPalette = ["red", "green", "blue", "yellow"];
  ballsColors.push(colorPalette[i % 4]);
}

/* Drawing Functions */

/* Example drawing function: you can add multiple drawing functions
that will be called in sequence each frame. It's a good idea to do 
one function per each object you are putting on screen, and you
may then want to break your drawing function down into sub-functions
to make it easier to read/follow */

// If the player clicks on a ball, change the color of that ball to blue
// Show instructions on top of the screen

function checkForClickOnThings({ x, y }) {
  // This code was helped written by Github Copilot
  for (let i = 0; i < ballsXs.length; i++) {
    let ballX = ballsXs[i];
    let ballY = ballsYs[i];
    let distance = Math.sqrt((x - ballX) ** 2 + (y - ballY) ** 2);
    // If the distance between the click and the ball is less than 15 pixels, change the color of the ball to blue
    if (distance < 15) {
      // Make radius bigger
      ballsColors[i] = "blue";
      clickCount++;
    }
  }
}
// Draw all the balls
function drawballs(ctx) {
  for (let i = 0; i < BALL_COUNT; i++) {
    ctx.fillStyle = ballsColors[i];
    ctx.beginPath();
    ctx.arc(ballsXs[i], ballsYs[i], BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }
}
// Make all the balls move
// This code was helped written by ChatGPT
function moveBalls() {
  for (let i = 0; i< BALL_COUNT; i++) {
    ballsXs[i] += velocityXs[i];
    ballsYs[i] += velocityYs[i];
  }
}
// Bounce the balls off the walls 
// This code was helped written by ChatGPT
function bounceballs(width, height) {
  for (let i = 0; i < BALL_COUNT; i++) {
    if (ballsXs[i] < 0 || ballsXs[i] > width) {
      velocityXs[i] *= -1;
    }
    if (ballsYs[i] < 0 || ballsYs[i] > height) {
      velocityYs[i] *= -1;
    }
  }
}
// Check if all balls are blue
// This code was helped written by Github Copilot
function allballsblue() {
  for (let i = 0; i < BALL_COUNT; i++) {
    if (ballsColors[i] !== "blue") {
      return false;
    }
  }
  return true;
}


gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime }) {
  // Update gametimer
  gameTimer += stepTime;
  drawballs(ctx);
  moveBalls();
  bounceballs(width, height);

  // Show instructions on top of the screen
  // This code was helped written by Github Copilot
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Click on the balls to change their color to blue!", 300, 100);
  // Timer to the game
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Time: " + (gameTimer / 1000).toFixed(2) + " Seconds", 560, 70);

  // If all the balls are blue, stop the game and show the time taken
  // This code was helped written by Github Copilot
  if (allballsblue()) {
    gi.stop();
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    // Convert elapsed (milliseconds) to seconds
    let secondsElapsed = (gameTimer / 1000).toFixed(2);
    ctx.fillText(
      "Congratulations! You won in " + secondsElapsed + " Seconds! Press R to Restart",
      100,
      250
    );
  }
});
  // Your drawing code here...
;

/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */
// Pressing R restarts the game
// This code was helped written by Github Copilot
gi.addHandler("keydown", function ({ event }) {
  if (event.key === "r" || event.key === "R") {
    // Only restart if all the balls are blue
    if (ballsColors.every((color) => color === "blue")) {
      // Reset game state
      ballsXs = [];
      ballsYs = [];
      ballsColors = [];
      velocityXs = [];
      velocityYs = [];
      clickCount = 0;
      gameTimer = 0;
      for (let i = 0; i < BALL_COUNT; i++) {
        ballsXs.push(Math.random() * 480 + 100);
        ballsYs.push(Math.random() * 480 + 100);
        velocityXs.push(Math.random() * 4 - 1);
        velocityYs.push(Math.random() * 4 - 1);
        let colorPalette = ["red", "green", "blue", "yellow"];
        ballsColors.push(colorPalette[i % 4]);
      }
    gi.run()
  }
}
});


gi.addHandler("click", function ({ event, x, y }) {
  checkForClickOnThings({ x, y });
});
gi.addClickHandler(checkForClickOnThings);

/* Run the game */
gi.run();
