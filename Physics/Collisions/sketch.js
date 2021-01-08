var friction = 0.998,
    bounce = 0.97,
    gravity;

var p1,p2;

function setup(){
  createCanvas(400, 400);
  gravity = createVector(0,1);
  p1 = new Particle(100, 200, 20);
  p2 = new Particle(300, 200, 30);
}

function draw(){
  background(170);
  p1.update();
  for(var i=0;i<5;i++){
    p1.checkCollide(p2);
    p1.constrain();
  }
  p2.update();
  for(var i=0;i<5;i++){
    p2.checkCollide(p1);
    p2.constrain();
  }
  p1.show();
  p2.show();
}
