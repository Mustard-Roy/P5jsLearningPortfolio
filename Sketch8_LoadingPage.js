function loading() {
  push();
  blendMode(MULTIPLY);
  fill(63, 129, 236, 150);
  textFont('Impact');
  textSize(20);
  text('Experimental Camera', width / 2, 30);
  fill(63, 129, 236);
  textSize(40);
  text('Put Your Mask On!', width / 2, 70);
  textFont('Arial');
  fill(63, 129, 236);
  textSize(10);
  text('LOADING',width/2,height/2);
  r = 30;
  loading_anima();
  pop();
  button_ag.hide();
}

class Dots {
  constructor() {
    this.xpos = width / 2;
    this.ypos = height / 2;
  }
  change(speed, offset) {
    this.xpos = width / 2 - cos(speed + offset) * r;
    this.ypos = height / 2 + sin(speed + offset) * r;
  }
  show() {
    push();
    blendMode(BLEND);
    noStroke();
    fill(63, 129, 236, 150);
    circle(this.xpos, this.ypos, 4);
    pop();
  }
}

let s;
let jump = 1;
let next_s = 360;
let last_s = 0;
let easing = 0.05;
let angle_lerp = 0;

function loading_anima() {
  let dnum = a.length;
  if (s < next_s - 180) {
    angle_lerp = lerp(0, 360, (s - last_s) / 180);
    let ds1 = s - last_s;
    s += ds1 * easing;
    while (dnum--) {
      a[dnum].change(dnum * angle_lerp / a.length, 360 - angle_lerp);
      a[dnum].show();
    }
    // console.log('ds1',ds1 * easing);
    // console.log('s',s);
    // console.log('al',angle_lerp);
  } else {
    angle_lerp = lerp(0, 360, (next_s - s) / 180);
    let ds2 = next_s - s;
    s += ds2 * easing;
    while (dnum--) {
      a[dnum].change(dnum * angle_lerp / a.length, angle_lerp);
      a[dnum].show();
    }
    // console.log('ds2',ds2 * easing);
    // console.log('s',s);
    // console.log('al',angle_lerp);
  }
  if (s >= next_s - jump / 2) {
    last_s += 360;
    next_s += 360;
    s += jump;
  }
}