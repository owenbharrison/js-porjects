var total = 200;
var factor = 0;

function setup(){
  createCanvas(400, 400);
}

function draw(){
  background(255);
  factor+=0.01;
  translate(width/2, height/2);
  var r = width/2;
  push();
  stroke(0);
  noFill();
  circle(0, 0, r*2);
  pop();

  var sz = 5;
  for(var i=0;i<total;i++){
    var a = getVector(i, r);
    var b = getVector((i*factor)%total, r);
    push();
    stroke(0);
    line(a.x, a.y, b.x, b.y);
    pop();
  }
}

function getVector(i, l){
  var angle = map(i, 0, total, 0, Math.PI*2);
  return p5.Vector.fromAngle(angle+Math.PI, l);
}
