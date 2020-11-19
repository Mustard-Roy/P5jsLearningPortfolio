//clmtrackr reference: https://github.com/auduno/clmtrackr
let vid, Mask, shape, ctracker, htracker, detector;
let pagenum = 1;
let start;
let masknum;
let beat;
let c;
let pos;
let user_agree = false;
let title_i = 0;
let title_reverse = false;
let about_page = false;

function preload() {
  img = loadImage('https://cdn.glitch.com/fbc2a06c-a0ad-427a-ae11-00252e4e8f39%2FJonathan.png?v=1605801114051');
}

function setup() {
  createCanvas(400, 300);

  // initialize 30 virus illustrations
  let cnt = 30;
  V = new Array();
  while (cnt--) {
    V.push(new Virus());
  }

  button_ag = createButton('Agree and Continue');
  button_ag.position(width / 2 - button_ag.width / 2, 250);
  button_ag.class('button1');
  button_bk = createButton('Back');
  button_bk.position(width / 2 - button_bk.width / 2, 250);
  button_bk.class('button1');

  button_ch = createButton('Change');
  button_ch.position(width / 2 - button_ch.width / 2, height - button_ch.height - 10);
  button_ch.class('button2');

  button_ab = createButton('About');
  button_ab.position(10, 30);
  button_ab.class('button3');
  button_res = createButton('Restart');
  button_res.position(10, 50);
  button_res.class('button3');
  button_re = createButton('Reload');
  button_re.position(10, 70);
  button_re.class('button3');

  button_menu = createButton('');
  button_menu.position(0, 0);
  button_menu.class('button3');
  button_menu.class('fa fa-bars');

  button_x = createButton('');
  button_x.position(0, 0);
  button_x.class('button3');
  button_x.class('fa fa-close');

  button_re.hide();
  button_res.hide();
  button_menu.hide();
  button_x.hide();
  button_ab.hide();
  button_bk.hide();

  Mask = createGraphics(width, height);
  Mask.ellipseMode(CORNERS);
  shape = createGraphics(width, height);
  shape.ellipseMode(CORNERS);

  ctracker = new clm.tracker();
  ctracker.init();

  start = false;
  masknum = 1;
  beat = 0;

  pixelDensity(1);
  textAlign(CENTER);
  angleMode(DEGREES);
}

function noface() {
  fill(10, 200, 100);
  textSize(60);
  text('Wait for a face', width / 2, height / 2);
  button_ch.hide();
  button_re.hide();
  button_res.hide();
  button_ab.hide();
  button_x.hide();
  button_bk.hide();
  first_main = true;
}

function draw() {
  background('rgba(255,255,255,20)');

  // move background viruses
  V.forEach(function(v) {
    v.move();
    v.display()
  });

  // change facemask type and color
  button_ch.mouseClicked(function() {
    masknum = !masknum;
    beat++;
    c = color(random([0, 1]) ? color(random(0, 200), random(200, 255)) : color(random(69, 79), random(166, 176), random(234, 244), random(200, 255)));
  });

  button_re.mouseClicked(function() {
    location.reload();
  });

  button_menu.mouseClicked(function() {
    button_menu.hide();
    button_x.show();
    button_ab.show();
    button_res.show();
    button_re.show();
  });

  button_x.mouseClicked(function() {
    button_x.hide();
    button_menu.show();
    button_ab.hide();
    button_res.hide();
    button_re.hide();
  });

  button_ab.mouseClicked(function() {
    about_page = true;
  });

  button_bk.mouseClicked(function() {
    button_x.hide();
    button_menu.show();
    button_ab.hide();
    button_res.hide();
    button_re.hide();
    about_page = false;
  });
  
  button_res.mouseClicked(function() {
    beat = 0;
    button_x.hide();
    button_menu.show();
    button_ab.hide();
    button_res.hide();
    button_re.hide();
  });

  pos = ctracker.getCurrentPosition();
  if (!pos && !start && !user_agree && !about_page) pagenum = 1;
  else if (!pos && start && user_agree && !about_page) pagenum = 5;
  else if (pos && user_agree && !about_page) {
    pagenum = 4;
  } else if (about_page) {
    pagenum = 3;
  }
  switch (pagenum) {
    case 1:
      agree(title_i);
      if (!title_reverse)
        title_i += 0.5;
      else title_i -= 0.5;
      if (title_i > 32 || title_i < 0)
        title_reverse = !title_reverse;
      break;
    case 2:
      loading();
      break;
    case 3:
      about();
      break;
    case 4:
      main_page();
      break;
    case 5:
      noface();
  }
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