var points = [];
var numInside = 0;
var approximatedPI = 0;

function setup(){
  createCanvas(400, 400);
  background(0);
  push();
  stroke(255);
  noFill();
  strokeWeight(2);
  circle(width/2, height/2, width);
  pop();
}

function draw(){
  for(var i=0;i<20;i++){
    var newpoint = createVector(random(width), random(height));
    points.push(newpoint);
    if(inCircle(newpoint)){
      numInside++;
    }
    stroke(255);
    point(newpoint.x, newpoint.y);
  }
  approximatedPI = 4*numInside/points.length;
  console.log(approximatedPI);
}

function inCircle(point){
  return dist(point.x, point.y, width/2, height/2)<=width/2;
}
