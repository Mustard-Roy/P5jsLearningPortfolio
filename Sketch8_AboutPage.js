function about() {
  button_x.hide();
  button_ch.hide();
  button_menu.hide();
  button_ab.hide();
  button_res.hide();
  button_re.hide();
  button_bk.show();
  about_page = true;
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
  fill(255, 200);
  rect(25, 80, width - 55, 150);
  textFont('Arial');
  textAlign(LEFT);
  fill(0);
  textSize(10);
  text('This page is made by p5.js and runs locally by your browser. Your camera data will never be sent to any server or documented. You are free to close this page at any time and the camera will be off once you have done it.\n\nA piece of news during the COVID-19:\nA student from Singapore was beaten up in Oxford Street by a group of men who told him that they didn’t want his coronavirus in their country. Also, a lot of Anti-Asian prejudice appeared from California to New York. And for those Asians who know how to protect themselves from being infected and know how to reduce the spread, they wear a mask, which made them more vulnerable to be attacked. Since many people just regarded an asian with a mask as the virus carrier. ', 30, 90, width - 60, height - 30);
  pop();
}