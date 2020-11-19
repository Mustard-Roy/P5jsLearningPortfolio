function agree() {
  push();
  blendMode(MULTIPLY);
  fill(63, 129, 236, 150);
  textFont('Impact');
  textSize(20);
  text('Experimental Camera', width / 2, 30);
  fill(63, 129, 236);
  textSize(40);
  text('Put Your Mask On!', width / 2, 70);
  blendMode(BLEND);
  noStroke();
  fill(255,200);
  rect(25, 100, width - 55, 150);
  textFont('Arial');
  textAlign(LEFT);
  fill(0);
  textSize(10);
  text('You will see an interesting selfie effect after you allow this page to access your built-in camera.\nThis page is made by p5.js and runs locally by your browser. Your camera data will never be sent to any server or documented. You are free to close this page at any time and the camera will be off once you have done it.\nBy clicking “Agree and Continue”, you understand that this page never gains any data from you and totally respects your privacy.\nAfter button clicked, your browser may ask you to allow the page to use the built-in camera. Please click “Allow” in the pop-up window to use this camera or it will stuck in the camera loading page.', 30, 110, width - 60, height - 30);
  blendMode(SCREEN);
  noStroke();
  fill(200);
  rect(190, 70 - title_i, 100, 1 + title_i);
  c = color(random([0, 1]) ? color(random(0, 200), random(200, 255)) : color(random(69, 79), random(166, 176), random(234, 244), random(200, 255)));
  button_ch.hide();
  button_ag.show();
  button_ag.mouseClicked(function() {
    user_agree = true;
    vid = createCapture(VIDEO);
    vid.size(width, height);
    vid.hide();
    ctracker.start(vid.elt);
    pagenum = 2;
  });
  pop();
}