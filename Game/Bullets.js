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
    this.y -= this.speed;
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  collidesWith(enemy) {
    // Check for collision between the bullet and the enemy
    if (
      this.x + this.width >= enemy.x &&
      this.x <= enemy.x + enemy.image.width &&
      this.y + this.height >= enemy.y &&
      this.y <= enemy.y + enemy.image.height
    ) {
      return true;
    }
    return false;
  }
}