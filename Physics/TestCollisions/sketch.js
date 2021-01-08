var p1,p2;
var GRAVITY;

function setup(){
  createCanvas(400, 400);
  GRAVITY = createVector(0, 1);
  p1 = new Particle(100, 200, 20);
  p2 = new Particle(300, 100, 20);
}

function draw(){
  background(0);
  p1.update();
  p2.update();
  p1.checkCollide(p2);
  p1.constrain();
  p2.checkCollide(p1);
  p2.constrain();
  p1.show();
  p2.show();
}
