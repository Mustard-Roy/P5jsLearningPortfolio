class Virus {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(10, 30);
    this.speed = 5;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    push();
    if (random([0, 1])) {
      textSize(this.size);
      text('🦠', this.x, this.y);
    } else {
      fill(10, 200, 30, random(0, 50));
      noStroke();
      circle(this.x, this.y, this.size);
    }
    pop();
  }
}