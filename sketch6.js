let vid, Mask, shape, ctracker, htracker, detector;
let start;
let masknum;
let beat;
let c;

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
      text("🦠", this.x, this.y);
    } else {
      fill(10, 200, 30, random(0, 50));
      noStroke();
      circle(this.x, this.y, this.size);
    }
    pop();
  }
}

function preload() {
  img = loadImage("https://cdn.glitch.com/fbc2a06c-a0ad-427a-ae11-00252e4e8f39%2FJonathan.png?v=1605801114051");
}

function setup() {
  createCanvas(400, 300);
  // initialize 30 virus illustrations
  let cnt = 30;
  V = new Array();
  while (cnt--) {
    V.push(new Virus());
  }

  button = createButton("change");
  button.position(width - button.width, height - button.height);

  Mask = createGraphics(width, height);
  Mask.ellipseMode(CORNERS);
  shape = createGraphics(width, height);
  shape.ellipseMode(CORNERS);

  vid = createCapture(VIDEO);
  vid.size(width, height);
  vid.hide();

  ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(vid.elt);

  start = false;
  masknum = 1;
  beat = 0;

  pixelDensity(1);
  textAlign(CENTER);
  angleMode(DEGREES);
}

function drawMask(pos) {
  let x1 = pos[2][0],
    y1 = pos[41][1],
    x2 = pos[12][0],
    y2 = pos[7][1];
  if (masknum) {
    Mask.clear();
    Mask.noStroke();
    Mask.fill(c);
    Mask.ellipse(x1, y1, x2, y2);
    Mask.stroke(c);
    Mask.strokeWeight(3);
    Mask.line(pos[1][0], pos[1][1], pos[3][0], pos[3][1]);
    Mask.line(pos[13][0], pos[13][1], pos[11][0], pos[11][1]);
  } else {
    Mask.clear();
    Mask.fill(c);
    Mask.noStroke();
    Mask.beginShape();
    Mask.vertex(pos[62][0], pos[62][1]);
    Mask.vertex(pos[2][0], pos[2][1]);
    Mask.vertex(pos[5][0], y2);
    Mask.vertex(pos[9][0], y2);
    Mask.vertex(pos[12][0], pos[12][1]);
    Mask.endShape(CLOSE);
    Mask.stroke(c);
    Mask.strokeWeight(3);
    Mask.line(pos[1][0], pos[1][1], pos[3][0], pos[3][1]);
    Mask.line(pos[13][0], pos[13][1], pos[11][0], pos[11][1]);
  }

  image(Mask, 0, 0);
}

// elliptical shape is used to mask the video and demonstrate only the head area
function Shape(pos) {
  let x1 = pos[1][0],
    y1 = pos[33][1],
    x2 = pos[13][0],
    y2 = pos[7][1];
  shape.clear();
  shape.noStroke();
  shape.fill(0);
  shape.ellipse(x1 - 30, y1 - (y2 - y1) / 3 - 30, x2 + 30, y2 + 30);
}

function loading() {
  fill(10, 100, 200);
  textSize(60);
  text("Loading...", width / 2, height / 2);
  c = color(
    random([0, 1])
      ? color(random(0, 200), random(200, 255))
      : color(
          random(69, 79),
          random(166, 176),
          random(234, 244),
          random(200, 255)
        )
  );
  button.hide();
}

function noface() {
  fill(10, 200, 100);
  textSize(60);
  text("Wait for a face", width / 2, height / 2);
  button.hide();
}

function inEllipse(x, y, x1, x2, y1, y2) {
  let r1 = abs(x1 - x2);
  let r2 = abs(y1 - y2);
  if (sq(x - x2) / sq(r1) + sq(y - 2 * y1 + y2) / sq(r2) <= 1) return true;
  else return false;
}

function inCircle(x, y, x1, x2, y1, y2) {
  let r = sqrt(sq(x1 - x2) + sq(y1 - y2)) / 2;
  let xc = (x1 + x2) / 2;
  let yc = (y1 + y2) / 2;
  if (sq(x - xc) + sq(y - yc) <= sq(r)) return true;
  else return false;
}

function Beat(pos) {
  let x1_start = int(pos[66][0]);
  let y1_start = int(pos[26][1]);
  let x1_end = int(pos[25][0]);
  let y1_end = int(pos[34][1]);
  let x2_start = int(pos[67][0]);
  let y2_start = int(pos[67][1]);
  let x2_end = int(pos[28][0]);
  let y2_end = int(pos[28][1]);

  vid.loadPixels();
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      if (inCircle(x, y, x1_start, x1_end, y1_start, y1_end)) {
        vid.pixels[index] -= 73;
        vid.pixels[index + 1] -= 68;
        vid.pixels[index + 2] -= 36;
      } else if (inEllipse(x, y, x2_start, x2_end, y2_start, y2_end)) {
        vid.pixels[index] -= 42;
        vid.pixels[index + 1] -= 23;
        vid.pixels[index + 2] -= 13;
      } else vid.pixels[index + 3] = 0;
    }
  vid.updatePixels();

  image(vid, 0, 0, width, height);
}

function draw() {
  background("rgba(255,255,255,20)");
  // move background viruses
  V.forEach(function(v) {
    v.move();
    v.display();
  });
  // change facemask type and color
  button.mousePressed(function() {
    masknum = !masknum;
    beat++;
    c = color(
      random([0, 1])
        ? color(random(0, 200), random(200, 255))
        : color(
            random(69, 79),
            random(166, 176),
            random(234, 244),
            random(200, 255)
          )
    );
  });

  let pos = ctracker.getCurrentPosition();
  if (!pos && !start) loading();
  else if (!pos && start) noface();
  else {
    start = true;
    button.show();

    if (beat >= 4) {
      push();
      fill(10, 100, 200, 200);
      textFont("Impact");
      textAlign(CENTER);
      textSize(40);
      text("YOU ARE BEATEN UP\nFOR WEARING A MASK", width / 2, 40);
      pop();

      push();
      fill(10);
      textFont("Arial");
      textAlign(LEFT);
      textSize(10);
      text(
        "This is exactly\nwhat happened to\nsome Asians\nat the beginning of\nthe COVID-19\nin western countries.",
        width - 100,
        150
      );
      image(img, 40, 150, 50, 62);
      pop();
    }

    push();
    let ts = (pos[13][0] + 30 - (pos[1][0] - 30)) * 2.5;
    textSize(ts);
    text("🥼", pos[7][0], pos[7][1] + pos[7][1] - pos[37][1] + 60 + ts / 2);
    pop();

    image(vid, 0, 0, width, height);

    if (beat >= 4) Beat(pos);

    drawMask(pos);

    Shape(pos);
    vid.mask(shape);

    if (beat < 4) {
      push();
      let ts2 = (pos[13][0] + 30 - (pos[1][0] - 30)) * 1.1;
      textSize(ts2);
      translate((pos[7][0] + pos[0][0]) / 2, pos[41][1]);
      rotate(-20);
      text("🧢", 0, 0);
      pop();
    } else {
      if (random([0, 1, 1, 1, 1, 1, 1, 1, 1])) {
        push();
        let ts2 = (pos[13][0] + 30 - (pos[1][0] - 30)) * 0.7;
        textSize(ts2);
        translate(
          (pos[7][0] + pos[0][0]) / 2 - ts2 * 0.2,
          pos[41][1] - ts2 * 0.2
        );
        rotate(10);
        text("💥", 0, 0);
        pop();
      }
    }
  }
}
