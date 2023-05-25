let backgroundImage;
let player;
let bullets = [];
let enemies = [];
let gameState = "start"; // "start", "play", "gameover", or "win"
let startButton;
let restartButton;
let score = 0;
let bgMusic; // Background music
let spacebarSound; // Firing effect
let spacebarVolume = 0.5; // Adjust the volume here (0.0 to 1.0)
let winSound; // Sound effect for winning
let hasPlayedWinSound = false; // Track if win sound has been played
let collisionSound; // Sound effect for collision
let hasPlayedCollisionSound = false; // Track if collision sound has been played


function preload() {
  backgroundImage = loadImage("img/lab.jpg");
  bgMusic = loadSound("Sounds/Space Invaders.mp3"); // Load the background music
  spacebarSound = loadSound("Sounds/Laser Gun.mp3");
  Loadsounds();
}

function setup() {
  createCanvas(800, 600);
  startButton = new Button(width / 2, height / 2 + 50, 175, 50, "Start");
  restartButton = new Button(width / 2, height / 2 + 50, 175, 50, "Try again?");
  
  spacebarSound.setVolume(spacebarVolume);
}

function draw() {
  background(backgroundImage);

  if (gameState === "start") {
    // Display start screen
    textSize(32);
    textAlign(CENTER);
    fill(0);
    text("Hello There!", width / 2, height / 2 - 40);
    startButton.display();

  } else if (gameState === "play") {
    // Player
    player.update();
    player.draw();

    // Draw and update all enemies
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].update();
      enemies[i].draw();

      // Check for collision with the player
      if (player.collidesWith(enemies[i])) {
        if (!hasPlayedCollisionSound) {
          collisionSound.play();
          hasPlayedCollisionSound = true; // Set the flag to true after playing the sound
        }
        gameState = "gameover";
        break;
      }

      // Check for collision with bullets
      for (let j = 0; j < bullets.length; j++) {
        if (bullets[j].collidesWith(enemies[i])) {
          bullets.splice(j, 1); // Remove bullet
          enemies.splice(i, 1); // Remove enemy
          score += 50; // Increase score by 10 points
          break; // Exit the loop since an enemy is removed
        }
      }
    }

    // Bullets  
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].draw();

      // Remove bullets that are off-screen
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
      }
    }

    // Check if all enemies are gone
    if (enemies.length === 0) {
      gameState = "win";
      bgMusic.stop(); // Stop the background music
    }

  } else if (gameState === "gameover") {
    // Player
    player.draw();

    // Display game over screen
    textSize(32);
    textAlign(CENTER);
    fill(0);
    text("Sorry buddy :(", width / 2, height / 2 - 40);
    text("Final score: " + score, width / 2, height / 2); // Display the score

    // Display restart button
    restartButton.display();
    bgMusic.stop(); // Stop the background music

  } else if (gameState === "win" && enemies.length === 0) {
    // Display when all enemies are gone
    textSize(32);
    textAlign(CENTER);
    fill(0);
    text("All enemies defeated!", width / 2, height / 2 - 40);
    text("Final score: " + score, width / 2, height / 2); // Display the score

    // Display restart button
    restartButton.display();
    // Stop the background music
    bgMusic.stop(); 
    // Play the win sound effect only once
    if (!hasPlayedWinSound) {
      winSound.play();
      hasPlayedWinSound = true; // Set the flag to true after playing the sound
    }
  }
}

function loadSounds() {
  winSound = loadSound("Sounds/HOORAY.mp3");
  collisionSound = loadSound("Sounds/Bonk.mp3");
}

function mouseClicked() {
  if (gameState === "start" && startButton.isMouseOver()) {
    startGame();
    bgMusic.play(); // Start playing the background music
  } else if ((gameState === "gameover" || gameState === "win") && restartButton.isMouseOver()) {
    restartGame();
    bgMusic.play(); // Start playing the background music
  }
}

function keyPressed() {
  if (gameState === "play") {
    if (keyCode === LEFT_ARROW) {
      player.isMovingLeft = true;
    } else if (keyCode === RIGHT_ARROW) {
      player.isMovingRight = true;
    } else if (keyCode === 32) { // SPACEBAR key
      shootBullet();
      spacebarSound.play(); // Play the spacebar sound effect
      spacebarSound.setVolume(spacebarVolume); // Set the volume of the spacebar sound
    }
  }
}

function keyReleased() {
  if (gameState === "play") {
    if (keyCode === LEFT_ARROW) {
      player.isMovingLeft = false;
    } else if (keyCode === RIGHT_ARROW) {
      player.isMovingRight = false;
    }
  }
}

function shootBullet() {
  const bullet = new Bullet(player.x, player.y, color(255, 0, 0));
  bullets.push(bullet);
  score -= bullets.length;
}

function startGame() {
  gameState = "play";
  player = new Player(400, 500, color(60, 150, 230), 800);
  bullets = [];
  enemies = [];

  // Create and add multiple enemy objects to the enemies array
  const enemy1 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy1.png"));
  const enemy2 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy2.png"));
  const enemy3 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy3.png"));
  const enemy4 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy1.png"));
  const enemy5 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy2.png"));
  const enemy6 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy3.png"));
  enemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);

  score = 0; // Reset the score to 0

  loadSounds();

}

function restartGame() {
  gameState = "play";
  player = new Player(400, 500, color(60, 150, 230), 800);
  bullets = [];
  enemies = [];

  // Create and add multiple enemy objects to the enemies array
  const enemy1 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy1.png"));
  const enemy2 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy2.png"));
  const enemy3 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy3.png"));
  const enemy4 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy1.png"));
  const enemy5 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy2.png"));
  const enemy6 = new Enemy(random(0, width), random(0, height / 3), loadImage("img/enemy3.png"));
  enemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);

  score = 0; // Reset the score to 0
  hasPlayedCollisionSound = false;
  hasPlayedWinSound = false;
}