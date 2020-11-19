function setup() {
  createCanvas(400, 400);
  background(255);
  // draw the stars in the start page
  for (let sr = 50; sr <= 200; sr += 50) {
    push();
    blendMode(DARKEST);
    noStroke();
    fill(251, 226, 95, 100);
    star(410, 350, sr, sr / 2, 5);
    pop();
  }
  // guiding text in the start page
  textSize(40);
  text(
    "✨Click and\n✨move your mouse\n✨to generate\n✨your own\n✨STAR TREE!✨",
    20,
    60
  );
  frameRate(30);
}

let R, G, B;
let trytimes = 0;

function draw() {
  if (mouseIsPressed) {
    // get the random parameters for the star
    let R1 = int(random(10, 30)),
      R2 = int(random(5, 10)),
      Np = int(random(3, 8));
    // determine the background color from the mouse position
    R = map(mouseX, 0, 400, 50, 200, true);
    G = 255 + map(mouseY, 0, 400, -50, -200, true);
    B = map(mouseX * mouseY, 0, 1600, 20, 220, true);
    background(R, G, B);

    let times = 350;
    let lastx = 200,
      lasty = 240; // start point
    while (times--) {
      x = random(0, 400);
      y = random(0, 400);
      if (inEllipse(x, y)) {
        push();
        // draw a star with random color
        noStroke();
        translate(x, y);
        rotate(PI / 8);
        fill(
          random(150, 255),
          random(150, 255),
          random(150, 255),
          random(150, 255)
        );
        star(0, 0, R1, R2, Np);
        pop();
        push();
        // connect this star with last star
        strokeWeight(1);
        blendMode(LIGHTEST);
        stroke(R + 30, G + 30, B + 30);
        line(lastx, lasty, x, y);
        lastx = x;
        lasty = y;
        pop();
      }
    }
  }
}

function keyPressed() {
  setup();
}

function mousePressed() {
  trytimes++;
  redraw();
}

function mouseReleased() {
  // draw the random trunk
  push();
  blendMode(LIGHTEST);
  let thisx = 200,
    thisy = 240;
  let nextx, nexty;
  for (let times = 0; times <= 160; times += 8) {
    nextx = thisx + int(random(-10, 10));
    nexty = thisy + 8;
    stroke(R + 30, G + 30, B + 30);
    strokeWeight((times / 160) * 60);
    line(thisx, thisy, nextx, nexty);
    thisx = nextx;
    thisy = nexty;
  }
  pop();
  // show attempts and congrats
  push();
  textSize(10);
  fill(255, 150);
  textFont("Courier New");
  if (trytimes == 1) text(str(trytimes) + " attempt", 10, 10);
  else text(str(trytimes) + " attempts", 10, 10);
  pop();

  push();
  textFont("Courier New");
  textSize(10);
  fill(255);
  if (thisx <= 200) text("This is your unique\n         STAR TREE!", 280, 370);
  else text("This is your unique\nSTAR TREE!", 20, 370);
  pop();
}

// limit the stars in a ellipse at (200,160) with r1=200 r2=120
function inEllipse(x, y) {
  let ck = ((x - 200) * (x - 200)) / 40000 + ((y - 160) * (y - 160)) / 14400;
  if (ck > 1) return false;
  else return true;
}

// according to the star function from p5.js reference
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
