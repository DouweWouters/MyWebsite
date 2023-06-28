class Player {
  constructor(x, y, initialColor, canvasWidth) {
    this.x = x;
    this.y = y;
    this.color = initialColor;
    this.speed = 8.5;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.canvasWidth = canvasWidth;
    this.bullets = []; // array of bullets, initialy empty
    this.isColliding = true;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    strokeWeight(0);

    const time = millis();
    const red = map(sin(time * 0.001), -1, 1, 0, 255);
    const green = 0;
    const blue = map(cos(time * 0.001), -1, 1, 0, 255);
    this.color = color(red, green, blue);

    fill(176, 196, 222); // grijsblauw
    ellipse(0, 0, 105, 100);

    fill(119, 136, 153); // grijs
    ellipse(-20, -10, 45, 45);
    ellipse(20, -10, 45, 45);
    rect(0, -10, 45, 45);
    ellipse(30, 25, 20, 20);
    ellipse(-30, 25, 20, 20);
    arc(0, -45, 45, 10, PI, 0);
    rect(0, -55, 5, 15);
    ellipse(0, 85, 60, 5);

    fill(0, 0, 0); // zwart
    ellipse(-20, -10, 40, 40);
    ellipse(20, -10, 40, 40);
    ellipse(0, -65, 15, 15);
    rect(0, -10, 40, 40);

    fill(176, 196, 222); // grijsblauw
    ellipse(40, 32.5, 20, 20);
    ellipse(-40, 32.5, 20, 20);

    fill(this.color); // blauw
    ellipse(20, -7.5, 20, 20);
    ellipse(-20, -7.5, 20, 20);
    arc(0, 45, 47.5, 12.5, 0, PI);

    fill(0, 0, 0); // zwart
    ellipse(20, -7.5, 10, 10);
    ellipse(-20, -7.5, 10, 10);

    // changing facial expression
    if (this.isColliding) {
      rect(0, -12.5, 60, 10);
      fill(256, 256, 256); // wit
      arc(0, 2.5, 25, 10, PI, 0);
    } else {
      rect(0, -2.5, 60, 10);
      fill(256, 256, 256); // wit
      arc(0, -2.5, 15, 10, 0, PI);
    }

    // bullets shot by player visible
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw();
    }

    pop();
  }

  update() {
    // Check if the left arrow key is pressed
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
      // Limit the player's position within the canvas
      this.x = Math.max(0, this.x);
    }

    // Check if the right arrow key is pressed
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
      // Limit the player's position within the canvas
      this.x = Math.min(this.canvasWidth, this.x);
    }
  }

  collidesWith(enemy) {
    const playerRadius = 50; // Adjust the radius based on the player's size
    const enemyRadius = 50; // Adjust the radius based on the enemy's size

    // Calculate the distance between the player and the enemy
    const distance = dist(this.x, this.y, enemy.x, enemy.y);

    // Check if the distance is less than the sum of the radii
    if (distance < playerRadius + enemyRadius) {
      this.isColliding = true; // Set the collision flag to true
      return true;
    } else {
      this.isColliding = false; // Set the collision flag to false
      return false;
    }
  }
}