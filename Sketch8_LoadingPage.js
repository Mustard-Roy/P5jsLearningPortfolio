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
  fill(10, 200, 100);
  textSize(40);
  text('. . . LOADING . . .',width/2,height/2);
  pop();
  button_ag.hide();
}