//thanks to "Coding Challenge #57: Mapping Earthquake Data" by Daniel Shiffman on YouTube chanel The Coding Train
let maping;
let sup;
let bgm;

//attribution: © Mapbox, © OpenStreetMap
function preload() {
  maping = loadImage("https://api.mapbox.com/styles/v1/mapbox/light-v10/static/0,0,1,0/1280x720?attibute=false&access_token=pk.eyJ1IjoieWhza3l4eCIsImEiOiJja2ZjdGYydTMxYWhhMnlweGh6MG93MTRtIn0.nhdiApy-ZVPVEDUeiVSVRw");
  sup = loadStrings("https://cdn.glitch.com/fbc2a06c-a0ad-427a-ae11-00252e4e8f39%2FApple%20suppliers%202019%20data.csv?v=1610128634109");
  soundFormats('mp3');
  bgm = loadSound('https://cdn.glitch.com/fbc2a06c-a0ad-427a-ae11-00252e4e8f39%2FAppleBGM.mp3?v=1610128639033');
}

let clat = 0; //central latitude,
let clon = 0; //central longitude
let zoom = 1;

let cx;
let cy;

function mercX(lon) {
  lon = radians(lon);
  return (128 * 2 / PI) * pow(2, zoom) * (lon + PI);
}

function mercY(lat) {
  lat = radians(lat);
  return (128 * 2 / PI) * pow(2, zoom) * (PI - log(tan(PI / 4 + lat / 2)));
}

function setup() {
  createCanvas(1280, 720);
  imageMode(CENTER);
  translate(width / 2, height / 2);
  image(maping, 0, 0);
  noStroke();
  cx = mercX(clon);
  cy = mercY(clat);
  Title('Click anywhere to show Apple Top 200 Suppliers', 0);
  button = createButton('SKIP');
  button.position(width / 2 - button.width / 2, height-30);
  button.class('button1');
  button.hide();
}

function Title(txt, index) {
  push();
  fill(38, 84, 224);
  translate(0, -height / 2);
  textSize(15);
  textStyle(BOLD);
  textFont('Courier New');
  textAlign(CENTER);
  text(txt, 0, 15 + index * 15);
  pop();
}

function mousePressed() {
  if (!start_) {
    start_ = 1;
    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    image(maping, 0, 0);
    pop();
    next_t = millis() / 1000 + 1;
    bgm.play();
  }
}

let finish_animation = false;
let checker_index = 0;

function mouseMoved() {
  if (finish_animation) {
    checker = [
      [],
      [],
      []
    ];
    checker_index = 0;
  }
}

let checker = [
  [],
  [],
  []
];

function check_checker(x, y, name) {
  for (let i = 0; i < checker[0].length; i++) {
    if (checker[0][i] == x && checker[1][i] == y && checker[2][i] == name) {
      checker_index = i;
      return false; // if the data is in the checker array
    }
  }
  return true; //if the data is not added to checker array
}

function draw_location(data, d) {
  let lon = data[1];
  let lat = data[2];
  let x = mercX(lon) - cx;
  let y = mercY(lat) - cy;
  let e = 2.5;
  if (finish_animation) {
    if (mouseX - width / 2 <= int(x) + e && mouseX - width / 2 >= int(x) - e && mouseY - height / 2 <= int(y) + e && mouseY - height / 2 >= int(y) - e) {
      data[0].replace(/\s?$/, ''); // Remove space and space-like character in the end
      if (check_checker(x, y, data[0])) {
        if (!checker[2].includes(data[0])) {
          checker[0].push(x);
          checker[1].push(y);
          checker[2].push(data[0]);
          Title(data[0] + 'at' + data[3], checker_index);
          push();
          fill(38, 84, 224);
          circle(x, y, d);
          pop();
          checker_index++;
        }
      } else {
        if (!checker.includes(data[0])) {
          Title(data[0] + ' at ' + data[3], checker_index);
          push();
          fill(38, 84, 224);
          circle(x, y, d);
          pop();
        }
      }
    } else {
      circle(x, y, d);
    }
  } else
    circle(x, y, d);
}

let next_t,
  speed = 10,
  i = 0;
let company, last_company;
let start_ = 0;
let T;

function draw() {
  if (start_) {
    translate(width / 2, height / 2);
    let t = millis();
    if (t >= next_t * 1000 / speed && !finish_animation) {
      button.show();
      let data = sup[i].split(/,/);
      if (i == 0) last_company = data[0];
      company = data[0];
      if (last_company != company) {
        image(maping, 0, 0);
        for (let j = 0; j < i; j++) {
          let pre_data = sup[j].split(/,/);
          fill(224, 53, 88, 100);
          draw_location(pre_data, 5);
        }
      }
      fill(118, 89, 232, 210);
      draw_location(data, 10);
      Title(data[0], 0);
      last_company = company;
      next_t += 1 / speed;
      i++;
      button.mouseClicked(function() {
        i = sup.length;
        finish_animation = true;
      })
    }
    if (i >= sup.length) {
      button.hide();
      image(maping, 0, 0);
      finish_animation = true;
      push();
        fill(38, 84, 224);
        textSize(15);
        textStyle(BOLD);
        textFont('Courier New');
        textAlign(LEFT);
        text('Use mouse\nto check the Apple suppliers\nin a specific location', 15-width/2, 0);
        pop();
      for (let j = 0; j < sup.length; j++) {
        let pre_data = sup[j].split(/,/);
        fill(255, 53, 88, 100);
        draw_location(pre_data, 5);
      }
    }
  }
}