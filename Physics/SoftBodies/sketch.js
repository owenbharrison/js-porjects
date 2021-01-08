var softbody;

var airfriction = 0.875,
    bounce = 0.87,
    size = 8;

var gravity;

function setup(){
  createCanvas(400, 400);
  softbody = new Softbody(width/2, height/2, 75, 50);
  gravity = createVector(0, 0.6);
}

function draw(){
  background(170);
  softbody.update();
  softbody.show();
}
