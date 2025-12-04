# Instructions: Simple Canvas Game with Lists

This project helps you practice using **lists (arrays)** and **named functions** while building an interactive canvas game.

## Getting Started

To run the project, use:

```sh
npm run dev
```

Your code should live in `main.js`. See `demo.js` for sample code.

## Setting Up the Game Interface

To create a game interface, you'll need to import the library and create a new `GameInterface`:

```javascript
import { GameInterface } from "simple-canvas-library";

const gi = new GameInterface();
```

## Working with Lists (Arrays)

A list (or array) is a way to store multiple values in a single variable. In JavaScript, you create a list with square brackets:

```javascript
// An empty list
let fallingObjects = [];

// A list with initial values
let enemies = [
  { x: 100, y: 0, speed: 2 },
  { x: 200, y: 50, speed: 3 },
  { x: 300, y: 25, speed: 1.5 },
];
```

### Accessing Items in a List

You can access an item in a list using its index (starting from 0):

```javascript
// Get the first enemy
let firstEnemy = enemies[0];

// Get the third enemy
let thirdEnemy = enemies[2];

// Change the x position of the second enemy
enemies[1].x = 250;
```

### Looping Through a List

Use a `for` loop with an index to go through each item:

```javascript
// Loop through all falling objects
for (let i = 0; i < fallingObjects.length; i++) {
  let obj = fallingObjects[i];
  // Draw or update obj...
}
```

### Adding Items to a List

Use `push()` to add items to the end of a list:

```javascript
// Add a new falling object
fallingObjects.push({ x: Math.random() * 800, y: 0, speed: 2 });
```

Use `unshift()` to add items to the beginning of a list:

```javascript
// Add a new falling object at the start
fallingObjects.unshift({ x: Math.random() * 800, y: 0, speed: 2 });
```

### Removing Items from a List

Use `pop()` to remove the last item from a list:

```javascript
// Remove the last falling object
fallingObjects.pop();
```

Use `shift()` to remove the first item from a list:

```javascript
// Remove the first falling object
fallingObjects.shift();
```

For more advanced removal (like removing from the middle), you can use `splice()`, but most simple games can be built without it.

## Defining Named Functions

A named function has a name you define, and you call it by that name:

```javascript
// Define a named function
function spawnEnemy() {
  enemies.push({
    x: Math.random() * 800,
    y: 0,
    speed: 1 + Math.random() * 2,
  });
}

// Call the function
spawnEnemy();
```

Named functions can also take parameters and return values:

```javascript
// A function with parameters that returns a value
function checkCollision(obj1, obj2, radius) {
  let dx = obj1.x - obj2.x;
  let dy = obj1.y - obj2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance < radius;
}

// Call the function and use the result
if (checkCollision(player, enemy, 30)) {
  // Handle collision...
}
```

### Getting Type Hints in Named Functions

When you create a named function that takes `ctx` (the canvas context) as a parameter, you won't automatically get type hints when you type `ctx.` — the editor doesn't know what type `ctx` is!

You can fix this by adding a **JSDoc comment** above your function that tells the editor what type each parameter is. Here's how:

```javascript
/**
 * Draw a square on the canvas
 * @param {CanvasRenderingContext2D} ctx - The canvas drawing context
 * @param {number} x - The x position of the square
 * @param {number} y - The y position of the square
 * @param {number} size - The size of the square
 */
function drawSquare(ctx, x, y, size) {
  ctx.fillRect(x, y, size, size); // Now you get autocomplete for ctx!
}
```

The `@param` lines tell the editor:

- `{CanvasRenderingContext2D}` - this is the type (the canvas 2D context)
- `ctx` - this is the parameter name
- `The canvas drawing context` - this is a description (optional but helpful)

Now when you type `ctx.` inside your function, you'll see all the available canvas methods like `fillRect`, `arc`, `beginPath`, etc.

Here are common types you might use:

| Type                       | Use for                           |
| -------------------------- | --------------------------------- |
| `CanvasRenderingContext2D` | The `ctx` canvas context          |
| `number`                   | Numbers (x, y, size, speed, etc.) |
| `string`                   | Text/strings                      |
| `boolean`                  | True/false values                 |
| `object`                   | An object with properties         |
| `Array`                    | A list/array                      |

## Drawing and Animation

Add drawing functions to render your game:

```javascript
gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime }) {
  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  // Loop through your list and draw each item
  for (let i = 0; i < fallingObjects.length; i++) {
    let obj = fallingObjects[i];
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Update position
    obj.y += obj.speed * (stepTime / 1000) * 100;
  }
});
```

## Handling User Input

Add event handlers for user interaction:

```javascript
// Keyboard input
gi.addEventListener("keydown", function ({ event }) {
  if (event.key === "ArrowLeft") {
    playerX -= 10;
  } else if (event.key === "ArrowRight") {
    playerX += 10;
  }
});

// Mouse/click input
gi.addClickHandler(function ({ x, y }) {
  // Handle click at position (x, y)
});
```

## Running the Game

Start the game loop:

```javascript
gi.run();
```

## Example: Putting It All Together

Here's a simple example that uses a list and a named function:

```javascript
import { GameInterface } from "simple-canvas-library";

const gi = new GameInterface();

// List to store falling stars
let stars = [];

// Named function to spawn a new star
function spawnStar() {
  stars.push({
    x: Math.random() * 800,
    y: 0,
    speed: 50 + Math.random() * 100,
  });
}

// Spawn a star every second
setInterval(spawnStar, 1000);

// Drawing function
gi.addDrawing(function ({ ctx, width, height, stepTime }) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // Draw and update each star
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(star.x, star.y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Move star down
    star.y += star.speed * (stepTime / 1000);
  }

  // Remove stars that have fallen off screen
  for (let i = stars.length - 1; i >= 0; i--) {
    if (stars[i].y >= height) {
      stars.splice(i, 1);
    }
  }
});

gi.run();
```

For more details, see the main [README](../README.md) file.
