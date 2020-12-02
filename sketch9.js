function preload() {
  myData = loadJSON("data9.json");
}

function setup() {
  createCanvas(600, 600);
  bkg();
  let ts = 20;
  I1 = setInterval(function() {
    textAlign(CENTER);
    textSize(ts);
    fill(0);
    text('Click to see the data of\n\nDAILY LAUGHTERS\n\nin 7 days', width / 2 + 1, height / 2 - 70 + 2);
    fill(255);
    textSize(ts);
    text('Click to see the data of\n\nDAILY LAUGHTERS\n\nin 7 days', width / 2, height / 2 - 70);
  }, 500);
  I2 = setInterval(function() {
    bkg();
    ts = random(20, 40);
  }, 2000);
}

let start_ = false,
  mouse_active = true;

let next_t = 1,
  speed = 200,
  i = 0,
  Day = 1;

let I1, I2;

function draw() {
  if (start_) {
    let t = millis();
    let data = myData['Day' + Day];
    if (t >= next_t) {
      let R = Day * 40;
      let lv = data[i].Level;
      let time = data[i].Time.split(':');
      let rad = (Number(time[0]) * 60 + Number(time[1])) * 2 * PI / 1440;
      let x = R * cos(rad + PI / 4);
      let y = R * sin(rad + PI / 4);
      let s;
      let c;
      if (Number(time[0]) >= 6 && Number(time[0]) < 18) {
        s = draw_sun(x, y, lv);
        c = color(253, 244, 184, 50);
      } else {
        s = draw_moon(x, y, lv);
        c = color(133, 173, 243, 50);
      }
      if (data[i].State == 'Together') {
        push();
        translate(width / 2, height / 2);
        fill(c);
        noStroke();
        circle(x, y, lv * 9);
        pop();
      }
      if (data[i].Type == 'Offline') {
        push();
        translate(width / 2, height / 2);
        stroke(c);
        strokeWeight(2);
        line(x, y, 0, 0);
        pop();
      }
      image(s, 0, 0);
      next_t += speed;
      i++;
    }
    if (i >= data.length) {
      Day++;
      i = 0;
    }
    if (Day > 7) {
      start_ = false;
      mouse_active = true;
      let ts = 30;
      I1 = setInterval(function() {
        push();
        textAlign(LEFT);
        fill(255, 255 / 5);
        textSize(ts);
        text('Click\nto\nReplay', 50, 100);
        pop();
        push();
        fill(255);
        textAlign(CENTER);
        textSize(20);
        text('18:00', 530, 70);
        text('06:00', 70, 530);
        fill(155, 159, 177);
        textAlign(LEFT);
        textSize(10);
        text('Halo: Laughing together\nLine: Non-internet content',470,570);
        pop();
      }, 500);
      I2 = setInterval(function() {
        ts = random(30, 50);
        draw_all();
        push();
        fill(255);
        textAlign(CENTER);
        textSize(20);
        text('18:00', 530, 70);
        text('06:00', 70, 530);
        fill(155, 159, 177);
        textAlign(LEFT);
        textSize(10);
        text('Halo: Laughing together\nLine: Non-internet content',470,570);
        pop();
      }, 2000);
    }
  }
}

function mousePressed() {
  if (mouse_active) {
    restart();
    clearInterval(I1);
    clearInterval(I2);
  }
}

function restart() {
  bkg();
  push();
  fill(255, 150);
  textAlign(CENTER);
  textSize(20);
  text('18:00', 530, 70);
  text('06:00', 70, 530);
  pop();
  start_ = true;
  Day = 1;
  i = 0;
  next_t = millis();
  mouse_active = false;
}

function draw_sun(x, y, lv) {
  let sun;
  let d = lv * 4;
  let npoints = 4 + lv;
  sun = createGraphics(600, 600);
  sun.translate(width / 2, height / 2);
  sun.noStroke();
  sun.fill(249, 213, 101, 200);
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  sun.beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * d / 2;
    let sy = y + sin(a) * d / 2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * d / 5;
    sy = y + sin(a + halfAngle) * d / 5;
    vertex(sx, sy);
  }
  sun.endShape(CLOSE);
  sun.fill(249, 213, 101);
  sun.strokeWeight(1);
  sun.stroke(255, 244, 176);
  sun.circle(x, y, d / 2);
  return sun;
}

function draw_moon(x, y, lv) {
  let moon;
  let d = lv * 4 / 1.3;
  moon = createGraphics(600, 600);
  moon.translate(width / 2, height / 2);
  moon.fill(0, 0);
  moon.strokeWeight(1);
  moon.stroke(153, 161, 217, 100);
  moon.arc(x, y, d, d, -PI / 2, PI / 2, OPEN);
  moon.stroke(133, 173, 243);
  moon.fill(133, 173, 243);
  moon.beginShape();
  moon.vertex(x, y - d / 2);
  moon.bezierVertex(x - d / 1.25, y - d / 2, x - d / 1.25, y + d / 2, x, y + d / 2);
  moon.bezierVertex(x - d / 4, y + d / 4, x - d / 4, y - d / 4, x, y - d / 2);
  moon.endShape();
  return moon;
}

function bkg() {
  x = 20;
  y = height / 2;
  background(94, 174, 168);
  push()
  noStroke();
  fill(11, 22, 70);
  triangle(0, height, width, 0, width, height);
  pop();
  push();
  translate(width / 2, height / 2);
  fill(0, 0);
  strokeWeight(2);
  stroke(255, 50);
  for (let i = 1; i <= 7; i++)
    circle(0, 0, 2 * i * 40);
  pop();
}

function draw_all() {
  bkg();
  for (let Day = 1; Day <= 7; Day++) {
    let data = myData['Day' + Day];
    for (let i = 0; i < data.length; i++) {
      let R = Day * 40;
      let lv = data[i].Level;
      let time = data[i].Time.split(':');
      let rad = (Number(time[0]) * 60 + Number(time[1])) * 2 * PI / 1440;
      let x = R * cos(rad + PI / 4);
      let y = R * sin(rad + PI / 4);
      let s;
      let c;
      if (Number(time[0]) >= 6 && Number(time[0]) < 18) {
        s = draw_sun(x, y, lv);
        c = color(253, 244, 184, 50);
      } else {
        s = draw_moon(x, y, lv);
        c = color(133, 173, 243, 50);
      }
      if (data[i].State == 'Together') {
        push();
        translate(width / 2, height / 2);
        fill(c);
        noStroke();
        circle(x, y, lv * 9);
        pop();
      }
      if (data[i].Type == 'Offline') {
        push();
        translate(width / 2, height / 2);
        stroke(c);
        strokeWeight(2);
        line(x, y, 0, 0);
        pop();
      }
      image(s, 0, 0);
    }
  }
}