# About: Simple Canvas Game with Lists

This project helps you practice using **lists (arrays)** and **named functions** in JavaScript while building an interactive canvas game.

## Key Concepts

### Lists (Arrays)

A list (array) lets you store multiple items in a single variable. You'll use lists to manage collections of game objects like falling items, enemies, or collectibles.

```javascript
// Create an empty list
let enemies = [];

// Add items to the list
enemies.push({ x: 100, y: 0, speed: 2 });

// Loop through items
for (let i = 0; i < enemies.length; i++) {
  // Do something with enemies[i]
}

// Remove items
enemies = enemies.filter(function(enemy) {
  return enemy.y < 600; // Keep only enemies still on screen
});
```

### Named Functions

A named function is a reusable block of code with a name you define. You must create and call at least one named function in this project.

```javascript
// Define a named function
function spawnEnemy() {
  enemies.push({ x: Math.random() * 800, y: 0, speed: 2 });
}

// Call the function
spawnEnemy();
```

### Type Hints with JSDoc

When you create named functions that use `ctx` (the canvas context), add JSDoc comments to get type hints:

```javascript
/**
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {number} x - X position
 * @param {number} y - Y position
 */
function drawEnemy(ctx, x, y) {
  ctx.fillStyle = 'red';
  ctx.fillRect(x, y, 20, 20);  // Autocomplete works here!
}
```

## Running the Project

```sh
npm run dev
```

Your code goes in `main.js`. See `demo.js` for examples.

For detailed instructions, see [Instructions.md](Instructions.md) and the main [README](../README.md).
