class Button {
  constructor(x, y, width, height, label) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
  }

  display() {
    noStroke()
    fill(180, 101, 26);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);

    textAlign(CENTER, CENTER);
    textSize(20);
    fill(0);
    text(this.label, this.x, this.y);
  }

  isMouseOver() {
    // checking if the mouse is over the button
    return (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2
    );
  }
}