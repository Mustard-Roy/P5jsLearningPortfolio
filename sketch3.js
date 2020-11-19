function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}

let img;
function preload() {
  img = loadImage('https://cdn.glitch.com/fbc2a06c-a0ad-427a-ae11-00252e4e8f39%2Ftexture4.jpg?v=1605805122896');
}

let start_time = 0;
let initial = 0;
let speed = 2;
let last_s1 = -1 , last_s0 = -1, s, s0, s1, m, h;

function draw_match(x,y,angle) {
  push();
  translate(x,y);
  rotate(angle);
  stroke(223, 205, 147);
  strokeWeight(5);
  line(3.5,0,50,0);
  noStroke();
  fill(231, 91, 102);
  circle(50,0,7);
  pop();
}

function change(cmd,x,y,digit) { 
  // **For most of the time, cmd = last_num + this_num. ** For 9 to 0, cmd = 0. ** For 5 to 0, cmd = -1
  initial = 0;
  let ms = millis();
  let o = (ms-start_time)/1000*speed; //operator
  
  if(cmd == 1) { // 0 to 1
    
    let angle1 = o*8;
    let angle2 = o*54;
    let x1 = o*(50*cos(36));
    let y1 = o*(50-50*sin(36));
    let angle3 = o*18;
    let x2 = o*25;
    let y2 = o*(100-26/cos(54)-25*tan(54));
    let angle4 = o*72;
    
    draw_match(x,y,36+108-angle1);
    draw_match(x,y,36+angle2); //to brown    
    draw_match(x+50*cos(36)-x1,y+50*sin(36)+y1,90+18-angle3); 
    draw_match(x-25+x2,y+26/cos(54)+25*tan(54)+y2,0);
    draw_match(x-25+x2,y+26/cos(54)+25*tan(54)+y2,-108-angle4);
    
  } else if(cmd == 3) { // 1 to 2
    
    let angle1 = o*45;
    let x1 = o*50;
    let y1 = o*50;
    
    draw_match(x,y,90+45+angle1);
    draw_match(x,y,90);
    draw_match(x-x1,y+50,90);
    draw_match(x-x1,y+100,0);
    draw_match(x,y+100-y1,180);
    
  } else if(cmd == 5) { // 2 to 3
    
    let x1 = o*50;
    
    draw_match(x,y,180);
    draw_match(x,y,90);
    draw_match(x-50+x1,y+50,90);
    draw_match(x-50,y+100,0);
    draw_match(x,y+50,180);
    
  } else if(cmd == 7) { // 3 to 4
    
    let x1 = o*50;
    let angle1 = o*90;
    let y2 = o*50;

    
    draw_match(x-x1,y,180-angle1);
    draw_match(x,y,90);
    draw_match(x,y+50,90-angle1);
    draw_match(x-50+x1,y+100-y2,0+angle1);
    draw_match(x,y+50,180);
    
  } else if(cmd == 9) { // 4 to 5
    
    let angle1 = o*90;
    let x1 = o*50;
    let y1 = o*50
    
    draw_match(x-50,y,90);
    draw_match(x,y,90+angle1);
    draw_match(x,y+50,0+angle1);
    draw_match(x-x1,y+50+y1,90-angle1);
    draw_match(x,y+50,180);
  
  } else if(cmd == 11) { // 5 to 6
    
    let y1 = o*50;
    let x1 = o*50;
    let angle1 = o*90;
        
    draw_match(x-50,y+y1,90);
    draw_match(x-x1,y+y1,180+angle1);
    draw_match(x,y+50,90);
    draw_match(x-50,y+100,0);
    draw_match(x,y+50,180);
    
  } else if(cmd == 13) { // 6 to 7
    
    let x1 = o*75;
    let y1 = o*(50-25*sqrt(3));
    let x2 = o*50;
    let y2 = o*50;
    let angle1 = o*90;
    let angle2 = o*30;
    let x3 = o*25;
    let y3 = o*(25*3*sqrt(3)-100);
    let angle3 = o*60;
    
    draw_match(x-50+x1,y+50-y1,90+angle2);
    draw_match(x-50+x2,y+50-y2,270-angle1);
    draw_match(x+x2,y+50-y2,90+angle2);
    draw_match(x-50+x3,y+100+y3,0-angle3);
    draw_match(x+x2,y+50-y2,180);

  } else if(cmd == 15) { // 7 to 8
    
    let x1 = o*50;
    let x2 = o*(25/2-50);
    let y2 = o*25/2*sqrt(3);
    let angle1 = o*120;
    let x3 = o*25;
    let angle2 = o*120;
    let y3 = o*(-25*3*sqrt(3)+25*2*sqrt(3))
    let angle3 = o*240
    
    draw_match(x+25-x1,y+25*sqrt(3),90+30);
    draw_match(x+x2,y+y2,180-angle1);
    draw_match(x+50-x1,y,90+30);
    draw_match(x-25+x3,y+25*3*sqrt(3)+y3,-60-angle2);
    draw_match(x+50-x1,y,180);
    
  } else if(cmd == 17) { // 8 to 9
    
    let x1 = o*25;
    let y1 = o*(-25*sqrt(3)+50);
    let angle1 = o*60;
    let x2 = o*25/2;
    let y2 = o*25/2*sqrt(3);
    let angle2 = o*30;
    let y3 = o*(-25*2*sqrt(3)+50);
    let angle3 = o*90;
    
    draw_match(x+25-50+x1,y+25*sqrt(3)+y1,90+30+angle1);
    draw_match(x+25/2-50-x2,y+25/2*sqrt(3)-y2,60+angle2);
    draw_match(x,y,90+30-angle2);
    draw_match(x,y+25*2*sqrt(3)+y3,180-angle3);
    draw_match(x,y,180);

  } else if(cmd == 0) { // 9 to 0
    
    let x1 = o*25;
    let y1 = o*(-50+26/cos(54)+25*tan(54));
    let angle1 = o*72;
    let x2 = o*50;
    let angle2 = o*(36+108-90);
    let x3 = o*(50*cos(36));
    let y3 = o*(50*sin(36));
    let angle3 = o*18;
    let y4 = o*(-50+25/cos(54)+25*tan(54));
    let angle4 = o*90;
    let angle5 = o*144;
    
    draw_match(x-x1,y+50+y1,-180+angle1);
    draw_match(x-50+x2,y,90+angle2);
    draw_match(x+x3,y+y3,90+angle3);
    draw_match(x-x1,y+50+y4,90-angle4);
    draw_match(x,y,180-angle5);
    
  } else if(cmd == -1) { // 5 to 0
    
    let x1 = o*25;
    let y1 = o*(26/cos(54)+25*tan(54));
    let angle1 = o*(161);
    let angle2 = o*36;
    let x2 = o*50*cos(36);
    let y2 = o*(50*sin(36)-50)
    let angle3 = o*18;
    let y3 = o*(-100+25/cos(54)+25*tan(54));
    let y4 = o*50;
    let angle4 = o*144;
    
    draw_match(x-50+x1,y+y1,90+angle1);
    draw_match(x,y,180-angle2);
    draw_match(x+x2,y+50+y2,90+angle3);
    draw_match(x-50+x1,y+100+y3,0);
    draw_match(x,y+50-y4,180-angle4);

  }
  
  if(o > 1 && digit==0) 
    last_s0 = s0;
  else if (o > 1 && digit==1) 
    last_s1 = s1;

}

function draw_num(x,y,cmd) {
  if(cmd == 1) {
    draw_match(x,y,90+45); //red
    draw_match(x,y,90); //brown
    draw_match(x,y+50,90); //yellow
    draw_match(x,y+100,0); //green
    draw_match(x,y+100,180); //blue
  } else if(cmd == 2) {
    draw_match(x,y,180);
    draw_match(x,y,90);
    draw_match(x-50,y+50,90);
    draw_match(x-50,y+100,0);
    draw_match(x,y+50,180);
  } else if(cmd == 3) {
    draw_match(x,y,180);
    draw_match(x,y,90);
    draw_match(x,y+50,90);
    draw_match(x-50,y+100,0);
    draw_match(x,y+50,180); 
  } else if(cmd == 4) {
    draw_match(x-50,y,90);
    draw_match(x,y,90);
    draw_match(x,y+50,0);
    draw_match(x,y+50,90);
    draw_match(x,y+50,180); 
  } else if(cmd == 5) {
    draw_match(x-50,y,90);
    draw_match(x,y,180);
    draw_match(x,y+50,90);
    draw_match(x-50,y+100,0);
    draw_match(x,y+50,180);
  } else if(cmd == 6) {
    draw_match(x-50,y+50,90);
    draw_match(x-50,y+50,-90);
    draw_match(x,y+50,90);
    draw_match(x-50,y+100,0);
    draw_match(x,y+50,180);
  } else if(cmd == 7) {
    draw_match(x+25,y+25*sqrt(3),90+30);
    draw_match(x,y,180);
    draw_match(x+50,y,90+30);
    draw_match(x-25,y+25*3*sqrt(3),-60);
    draw_match(x+50,y,180);
  } else if(cmd == 8) {
    draw_match(x+25-50,y+25*sqrt(3),90+30);
    draw_match(x+25/2-50,y+25/2*sqrt(3),60);
    draw_match(x,y,90+30);
    draw_match(x,y+25*2*sqrt(3),180);
    draw_match(x,y,180);
  } else if(cmd == 9) {
    draw_match(x,y+50,180);
    draw_match(x-50,y,90);
    draw_match(x,y,90);
    draw_match(x,y+50,90);
    draw_match(x,y,180);
  } else if(cmd == 0) {
    draw_match(x-25,y+26/cos(54)+25*tan(54),-108); //to blue
    draw_match(x,y,36+108); //to red
    draw_match(x+50*cos(36),y+50*sin(36),90+18); 
    draw_match(x-25,y+25/cos(54)+25*tan(54),0);
    draw_match(x,y,36); //to brown
  }
}

function draw() {
  background(255);
  image(img, 0, 0);
  
  /*draw seconds*/
  s=second();
  s1=int(s/10); // tens digit
  s0=s-s1*10; // ones digit
  
  let xs1=250, ys1=220, xs0=350, ys0=220;
  
  if(last_s1 == -1) {
    draw_num(xs1,ys1,s1);
    draw_num(xs0,ys0,s0);
    last_s1=s1;
    last_s0=s0;
  }

  if(last_s0 != s0 && last_s0 != 9) {
    
    if(initial) start_time = millis();
    draw_num(xs1,ys1,s1);
    // if(last_s0 != 9)  change(last_s0+s0,250,200,0);
    // else change(0,250,200,0);
    change(last_s0+s0,xs0,ys0,0);
    
  } else if(last_s0 != s0 && last_s0 == 9) {
    
    if(initial) start_time = millis();
    // draw_num(250,200,s0);
    if(last_s1 != 5) {
      change(last_s1+s1,xs1,ys1,1);
      change(0,xs0,ys0,0);
    } else {
      change(-1,xs1,ys1,1);
      change(0,xs0,ys0,0);
    }
    
  } else {
    
    initial = 1;
    last_s0 = s0;
    last_s1 = s1;
    draw_num(xs1,ys1,s1);
    draw_num(xs0,ys0,s0);
  }
  
  /*draw minutes*/
  m = minute();
  push();
  translate(width/2,height/2);
  rotate(-90+(m+s/60)*6);
  stroke(223, 205, 147);
  strokeWeight(5);
  line(190,0,290,0);
  noStroke();
  fill(231, 91, 102);
  circle(240,0,7);
  circle(290,0,7);
  pop();
  
  /*draw hour*/
  if(hour()<=12) h = hour();
  else h = hour()%12;
  push();
  translate(width/2,height/2);
  rotate(-90+(h+m/60+s/3600)*30);
  stroke(223, 205, 147);
  strokeWeight(5);
  line(180,0,230,0);
  noStroke();
  fill(32, 13, 15);
  circle(230,0,7);
  pop();
    
}