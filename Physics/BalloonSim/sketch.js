var airfriction = 0.95,
    bounce = 0.998;

var particles = [],
    sticks = [];
var balloon, anchor;

function preload(){
  anchorImg = loadImage("data/anchor.png");
  balloonImg = loadImage("data/balloon.png");
}

function setup(){
  createCanvas(400, 400);
  gravity = createVector(0, 1);
  balloon = new Balloon(200, 50);
  anchor = new Anchor(200, 150);
  for(var i=0;i<10;i++){
    particles.push(new Particle(200, i*10+100));
  }
  sticks.push(new Stick(balloon, particles[0], 55));
  for(var i=0;i<particles.length-1;i++){
    sticks.push(new Stick(particles[i], particles[i+1]))
  }
  sticks.push(new Stick(anchor, particles[particles.length-1], 20));
}

function draw(){
  background(170);
  particles.forEach(p=>p.update());
  balloon.update();
  anchor.update();
  sticks.forEach(s=>s.update());
  particles.forEach(p=>p.constrain());
  balloon.constrain();
  anchor.constrain();
  sticks.forEach(s=>s.show());
  balloon.show();
  anchor.show();
}
