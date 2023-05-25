class Enemy {
  constructor(x, y, image,) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.speed = 2; 
    this.xDirection = random([-1, 1]); // Randomly choose initial x-direction
    this.yDirection = 1; // Move downward
  }

  update() {
    
    // Move the enemy randomly
    this.x += this.speed * this.xDirection;
    this.y += this.speed * this.yDirection;

    // Change direction when hitting canvas
    if (this.x <= 0 || this.x >= width - this.image.width) {
      this.xDirection *= -1;
    }

    // Reset y-position and change y-direction when reaching bottom
    if (this.y >= height) {
      this.y = 0;
      this.yDirection = 1;
    }
  }

  draw() {
    image(this.image, this.x, this.y);
  }
  collidesWith(player) {
    const enemyRadius = 50; // Adjust the radius based on the enemy's size
    const playerRadius = 50; // Adjust the radius based on the player's size

    // Calculate the distance between the enemy and the player
    const distance = dist(this.x, this.y, player.x, player.y);

    // Check if the distance is less than the sum of the radii
    if (distance < enemyRadius + playerRadius) {
      return true; // Collision occurred
    } else {
      return false; // No collision
    }
  }
}