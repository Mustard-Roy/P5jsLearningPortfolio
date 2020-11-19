let name;
let startDraw = false;
// colors
let R = '#D0232A', // Red
  Y = '#FEC907', // Yellow
  B = '#23418F', // Blue
  W = '#FEFEFE', // White
  g = '#B9C2C6', // Grey
  b = '#000000', // Black
  nofill = '#00000000';
// stroke weights
let w1 = 8,
  w2 = 4;

function setup() {
  createCanvas(600, 600);
  cover();
}

function cover() {
  background(255);
  input = createInput();
  input.size(100, 20);
  input.position(width / 2 + 50, height / 2);

  button = createButton('submit');
  button.position(input.x + input.width - button.width - 2, input.y + 2);
  button.mousePressed(islegal);

  // draw the cover
  push();
  stroke(b);
  for (let i = input.x; i <= input.x + input.width; i += 22)
    for (let j = input.y + input.height + 30; j <= height - 55; j += 22) {
      let c = random([R, Y, B, W, g, b]);
      fill(c);
      strokeWeight(1);
      square(i, j, 22);
    }
  for (let i = input.x; i <= input.x + input.width; i += 44)
    for (let j = input.y + input.height + 30; j <= height - 75; j += 44) {
      let c = random([R, Y, B, W, g, b, nofill, nofill, nofill, nofill]);
      fill(c);
      square(i, j, 44);
    }
  for (let i = input.x; i <= input.x + input.width; i += 44)
    for (let j = input.y + input.height + 30 + 22; j <= height - 75; j += 44) {
      let c = random([R, Y, B, W, nofill, nofill, nofill, nofill, nofill, nofill]);
      fill(c);
      square(i, j, 44);
    }
  strokeWeight(w1);
  line(input.x - w1 / 2, 0, input.x - w1 / 2, height);
  line(input.x + input.width + w1 / 2, 0, input.x + input.width + w1 / 2, height);
  strokeWeight(w2);
  line(0, input.y - w2 / 2, width, input.y - w2 / 2);
  line(0, input.y + input.height + w2 / 2, width, input.y + input.height + w2 / 2);

  noStroke();
  fill(R);
  rect(input.x, 0, width - input.x, input.y - w2);
  fill(B);
  rect(0, input.y + input.height + w2, input.x - w1, height - input.y - input.height);
  fill(Y);
  rect(input.x + input.width + w1, input.y, width - input.x - input.width, height - input.y);

  fill(b);
  textFont('Arial');
  textSize(15);
  text('Encode Your Chinese Name into', 24, 200);
  textFont('Arial Black');
  textSize(50);
  text('MONDRIAN', 20, 250);
  textFont('Arial');
  textSize(12);
  text('Please enter your Chinese name (limited to 2-3 characters)', 24, height / 2 + 16);
  textFont('Arial Black');
  textAlign(RIGHT);
  text('Designed by\nHaoshu Yang', input.x + input.width - 5, height - 25);
  textFont('Arial');
  textSize(8);
  fill(0, 200);
  text('Press Up Arrow\nto submit another name', input.x + input.width - 5, input.y + input.height + 15);
  pop();
}

/*
From CJK Unified Ideographs as of Unicode version 13.0,
the first Chinese character ‘一’ is 19968; the last one ‘鿐’ is 40912. 
More info: https://en.wikipedia.org/wiki/CJK_Unifid_Ideographs
*/
// Notice that the encoder only works for Chinese characters. Here are some example names that you may just copy and paste to test the program.
//example names: 张伟, 陈妍，刘洋，王秀英，周杰伦，李知恩
function islegal() {
  name = input.value();
  let isChinese = true;
  if (name.length) {
    for (let i = 0; i < name.length; i++) {
      if (unchar(name[i]) < 19968 || unchar(name[i]) > 40912) {
        alert("Please enter valid Chinese characters.");
        isChinese = false;
        break;
      }
    }
    if (isChinese) {
      if (name.length < 2 || name.length > 3) alert("Sorry, the name is limited to 2-3 characters.");
      else startDraw = true;
    }
  }
}

function getValues(N) {
  let a = floor(N / 1000);
  let b = floor((N - a * 1000) / 10);
  let c = N - a * 1000 - b * 10;
  return [a, b, c];
}

let colors = ['RWB', 'YBg', 'BYW', 'bRW', 'WYB', 'RgW', 'YWB', 'BgR', 'bWY', 'WYg'];
let colors2 = ['RWBg', 'YBgg', 'BYWY', 'bRWW', 'WYBb', 'RgWB', 'YWBR', 'BgRY', 'bWYR', 'WYgB'];

function MondrianEncoder() {
  let N1 = unchar(name[0]);
  let N2 = unchar(name[1]);
  let [a1, b1, c1] = getValues(N1);
  let [a2, b2, c2] = getValues(N2);
  let b1y, b2x, b3x, a1x, a2y, a3y;

  if (name.length == 2) {
    b1y = map(b1, 0, 99, 100, 500);
    b2x = map(b2, 0, 99, 100, 500);
    a1x = map(a1, 19, 40, 20, b2x - 20);
    a2y = map(a2, 19, 40, b1y + 20, 580);
    let cc1 = colors[c1].split('');
    let cc2 = colors[c2].split('');
    // draw color grids
    push();
    noStroke();
    fill(eval(cc1[0]));
    rect(0, 0, a1x, b1y);
    fill(eval(cc1[1]));
    rect(a1x, 0, b2x - a1x, b1y);
    fill(eval(cc1[2]));
    rect(b2x, 0, width - b2x, b1y);
    fill(eval(cc2[0]));
    rect(0, b1y, b2x, height - b1y);
    fill(eval(cc2[1]));
    rect(b2x, b1y, width - b2x, a2y - b1y);
    fill(eval(cc2[2]));
    rect(b2x, a2y, width - b2x, height - a2y);
    pop();

  } else if (name.length == 3) {
    let N3 = unchar(name[2]);
    let [a3, b3, c3] = getValues(N3);
    b1y = map(b1, 0, 99, 300, 500);
    b2x = map(b2, 0, 99, 100, 300);
    a1x = map(a1, 19, 40, 20, b2x - 20);
    a2y = map(a2, 19, 40, b1y + 20, 580);
    b3x = map(b3, 0, 99, b2x + 20, 580);
    a3y = map(a3, 19, 40, 20, b1y - 20);
    let cc1 = colors2[c1].split('');
    let cc2 = colors2[c2].split('');
    let cc3 = colors2[c3].split('');
    // draw color grids
    push();
    noStroke();
    fill(eval(cc1[0]));
    rect(0, 0, a1x, a3y);
    fill(eval(cc1[1]));
    rect(a1x, 0, b2x - a1x, a3y);
    fill(eval(cc1[2]));
    rect(b2x, 0, b3x - b2x, a3y);
    fill(eval(cc1[3]));
    rect(b3x, 0, width - b3x, a3y);
    fill(eval(cc2[0]));
    rect(0, a3y, a1x, b1y - a3y);
    fill(eval(cc2[1]));
    rect(a1x, a3y, b2x - a1x, b1y - a3y);
    fill(eval(cc2[2]));
    rect(b2x, a3y, b3x - b2x, b1y - a3y);
    fill(eval(cc2[3]));
    rect(b3x, a3y, width - b3x, b1y - a3y);
    fill(eval(cc3[0]));
    rect(b2x, b1y, b3x - b2x, a2y - b1y);
    fill(eval(cc3[1]));
    rect(b3x, b1y, width - b3x, a2y - b1y);
    fill(eval(cc3[2]));
    rect(b2x, a2y, b3x - b2x, height - a2y);
    fill(eval(cc3[2]));
    rect(b3x, a2y, width - b3x, height - a2y);
    pop();
    // draw additional lines
    push();
    stroke(b);
    strokeWeight(w2);
    line(b3x, 0, b3x, height);
    line(0, a3y, width, a3y);
    pop();

  }
  // draw lines
  push();
  stroke(b);
  strokeWeight(w1);
  line(0, b1y, width, b1y);
  line(b2x, 0, b2x, height);
  strokeWeight(w2);
  line(a1x, 0, a1x, b1y);
  line(b2x, a2y, width, a2y);
  pop();
}

function draw() {
  if (startDraw) {
    background(W);
    input.hide();
    button.hide();
    MondrianEncoder();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    startDraw = false;
    cover();
  }
}