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

import { GameInterface } from 'simple-canvas-library';

let gi = new GameInterface();

/* Variables: Top-Level variables defined here are used to hold game state */
let ballsXs = [];
let ballsYs = [];
let clickCount = 0;
// Draw 20 balls at random positions 
// This code was helped written by Github Copilot
for (let i = 0; i < 20; i++) {
  ballsXs.push(Math.random() * 480 + 100);
  ballsYs.push(Math.random() * 480 + 100);
}
let ballsColors = [];
// This code was helped written by Github Copilot
for (let i = 0; i < 20; i++) {
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
function checkForClickOnThings ({x, y}) {
  // This code was helped written by Github Copilot
  for (let i = 0; i < ballsXs.length; i++) {
    let ballX = ballsXs[i];
    let ballY = ballsYs[i];
    let distance = Math.sqrt((x - ballX) ** 2 + (y - ballY) ** 2);
    // If the distance between the click and the ball is less than 15 pixels, change the color of the ball to blue
    if (distance < 15) { // Make radius bigger
      ballsColors[i] = "blue";
      clickCount++;
    // If all the balls are blue, stop the game and show the time taken
      
    }
  }
}


gi.addDrawing(
  function ({ ctx, width, height, elapsed, stepTime }) {
    // Draw the balls with 4 different colors
    // This code was helped written by Github Copilot
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = ballsColors[i];
      ctx.beginPath();
      ctx.arc(ballsXs[i], ballsYs[i], 10, 0, Math.PI * 2);
      ctx.fill();
    }
    // If all the balls are blue, stop the game and show the time taken
    // This code was helped written by Github Copilot
     if (ballsColors.every(color => color === "blue")) {
        gi.stop();
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Congratulations! You won in " +stepTime + " Seconds!", 100, 250);
      }
    // Your drawing code here...
  }
)

/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */

gi.addHandler(
  "click",
  function ({ event, x, y }) {
    // Your click handling code here...
  }
)
gi.addClickHandler(checkForClickOnThings);


/* Run the game */
gi.run();


