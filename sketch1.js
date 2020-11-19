function setup() {
  createCanvas(400, 400);
  background(50, 50, 50);
  angleMode(DEGREES);
  rectMode(CENTER);
}

//modified by the star function from p5.js reference
function star(x, y, radius1, radius2) {
  var angle = 360 / 5;
  var halfAngle = angle / 2;
  beginShape();
  for (var a = 0; a < 360; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function draw_card(degree) {
  push();
  rotate(degree);
  stroke(0, 150);
  strokeWeight(0.2);
  fill(245);
  rect(0, 2, 40, 30);
  fill(220, 20, 60);
  noStroke();
  star(0, 2, 5, 10);
  pop();
}

function draw() {
  translate(width/2, height/2);
  
  //background
  push();
  
  fill(110);
  textSize(20);
  text(' The\nLost', -140, 80);
  textSize(60)
  text('PenBox', -90, 105);
  blendMode(DODGE);
  noStroke();
  fill(20, 100, 255, 100);
  rect(-10, 100, 260, 10);
  
  pop();
  
  //draw the drawer
  push();
  
  stroke(135, 206, 235);
  strokeWeight(3.5);
  fill(100, 191, 255);
  rect(0, 0, 150, 50);
  
  noStroke();
  fill('#317b8c');
  rect(0, 25, 160, 5);
  
  pop();
  
  //draw the CARDS
  draw_card(5);
  draw_card(8);
  draw_card(-3);
  draw_card(-10);
  
  //draw the top layer
  /* total layer */
  push();
  
  stroke(135, 206, 255);
  strokeWeight(5);
  fill(20, 191, 255);
  rect(0, -50, 160, 60);
  
  pop();
  
  /* compartments */
  push();
  
  translate(-width/2, -height/2);
  rectMode(CORNER);
  
  stroke(135, 206, 255);
  strokeWeight(5);
  fill(0,0);
  rect(120, 120, 30, 20);
  rect(150, 120, 30, 20);
  rect(180, 120, 100, 30);
  rect(180, 150, 100, 30);
  
  /* eraser */
  stroke(0, 150);
  strokeWeight(0.2);
  fill(245);
  rect(129, 126, 14, 7.5, 1.8, 0, 0, 1.8);
  noStroke();
  fill(255, 20, 147, 100);
  rect(133, 126, 10, 7.5)
  
  /* pencil sharpener */
  noStroke();
  
  fill(255, 240, 147);
  rect(159, 125, 14, 9, 1);
  fill(150);
  rect(160, 127, 12, 4);
  blendMode(LIGHTEST);
  fill(200);
  rect(160, 130, 12, 1);
  blendMode(MULTIPLY);
  fill(180);
  circle(166, 129, 3);
  
  /* pencil and pen */
  blendMode(BLEND);
  fill(170, 40, 100);
  rect(190, 130, 6, 4, 2);
  fill(221, 170, 61);
  rect(195, 130, 70, 4);
  fill(200);
  rect(195, 130, 4, 4);
  fill(185, 152, 111);
  triangle(265, 130, 265, 134, 272, 132)
  
  fill(200);
  rect(198, 160, 6, 5, 2);
  fill(50);
  ellipse(241, 162.5, 40, 7);
  fill(100);
  rect(201, 159, 40, 7, 2);
  fill(200, 100);
  rect(201, 164, 40, 2);
  
  pop(); 
  
  /* top layer outline */
  push();
  
  stroke('#317b8c');
  strokeWeight(3);
  fill(0,0);
  rect(0, -50, 168, 65);
  
  pop();
  
  //draw the lid
  push();
  
  stroke('#317b8c');
  strokeWeight(3);
  fill('#7edbff');
  quad(-84, -85.5, 84, -85.5, 91, -152.1, -91, -152.1);
  
  pop();
  
}