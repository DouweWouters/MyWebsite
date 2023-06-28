class Bullet {
  constructor(x, y, color) {
    this.x = x;
    this.y = y-60;
    this.color = color;
    this.speed = 5;
    this.radius = 5;
    this.width = 10;
    this.height = 20;
  }

  update() {
    this.y -= this.speed; // upwards movement
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  collidesWith(enemy) {
    // Check for collision between the bullet and the enemy (all be true to hit)
    if (
      this.x + this.width >= enemy.x && // If this condition is true, it means the bullet is to the right of or overlapping with the enemy horizontally
      this.x <= enemy.x + enemy.image.width && // If this condition is true, it means the bullet is to the left of or overlapping with the enemy horizontally.
      this.y + this.height >= enemy.y && // If this condition is true, it means the bullet is below or overlapping with the enemy vertically.
      this.y <= enemy.y + enemy.image.height // If this condition is true, it means the bullet is above or overlapping with the enemy vertically.
    ) {
      return true;
    }
    return false;
  }
}