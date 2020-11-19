let first_main = true;

function main_page() {
  start = true;
  button_ch.show();
  button_bk.hide();
  if (first_main) {
    button_menu.show();
    button_x.hide();
    first_main = false;
  }

  if (beat >= 4) {
    push();
    fill(10, 100, 200, 200);
    textFont('Impact');
    textAlign(CENTER);
    textSize(40);
    text('YOU ARE BEATEN UP\nFOR WEARING A MASK', width / 2, 40);
    pop();

    push();
    fill(10);
    textFont('Arial');
    textAlign(LEFT);
    textSize(10);
    text('This is exactly\nwhat happened to\nsome Asians\nat the beginning of\nthe COVID-19\nin western countries.', width - 100, 150);
    image(img, 40, 150, 50, 62);
    pop();
  }

  push();
  let ts = ((pos[13][0] + 30) - (pos[1][0] - 30)) * 2.5;
  textSize(ts);
  text('🥼', pos[7][0], pos[7][1] + pos[7][1] - pos[37][1] + 60 + ts / 2);
  pop();

  image(vid, 0, 0, width, height);

  if (beat >= 4)
    Beat(pos);

  drawMask(pos);

  Shape(pos);
  vid.mask(shape);

  if (beat < 4) {
    push();
    let ts2 = ((pos[13][0] + 30) - (pos[1][0] - 30)) * 1.1;
    textSize(ts2);
    translate((pos[7][0] + pos[0][0]) / 2, pos[41][1]);
    rotate(-20);
    text('🧢', 0, 0);
    pop();
  } else {
    if (random([0, 1, 1, 1, 1, 1, 1, 1, 1])) {
      push();
      let ts2 = ((pos[13][0] + 30) - (pos[1][0] - 30)) * 0.7;
      textSize(ts2);
      translate((pos[7][0] + pos[0][0]) / 2 - ts2 * 0.2, pos[41][1] - ts2 * 0.2);
      rotate(10);
      text('💥', 0, 0);
      pop();
    }
  }
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