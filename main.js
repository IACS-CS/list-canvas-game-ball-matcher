/* Main game file: main.js */
/* Game: [Ball Matcher] */
/* Authors: [Adam Tran] */
/* Description: [A game where there are 20 balls with different colors
and the player has to click to chanage all the colors to blue. When the
player makes all the balls blue, the screen tells them how long it took.] */
/* Citations: [List any resources, libraries, tutorials, etc you used here] 
/* Note: If you use significant AI help you should cite that here as well */
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
function checkForThing ({x, y balls}) {
  // check if its within radius of ball
  
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


/* Run the game */
gi.run();


