var a = 0;

function setup(){
  createCanvas(400, 400);
}

function draw(){
  var hp = createVector(cos(a)*width/2+width/2, height/2);
  var vp = createVector(width/2, sin(a)*height/2+height/2);
  line(hp.x, hp.y, vp.x, vp.y);
  a+=Math.PI/40;
}
