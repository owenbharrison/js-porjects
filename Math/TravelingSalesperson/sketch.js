var totalpoints = 10;
var points = [];

var recordDist;
var bestEver;

function setup(){
  createCanvas(400, 400);
  for(var i=0;i<totalpoints;i++){
    points[i] = createVector(random(width), random(height));
  }
  recordDist = calcDist(points);
  bestEver = points.slice();
}

function draw(){
  background(0);
  var prev = null;
  push();
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  points.forEach(p=>{
    vertex(p.x, p.y);
  });
  endShape();
  pop();

  push();
  stroke(255, 0, 255);
  strokeWeight(5);
  noFill();
  beginShape();
  bestEver.forEach(p=>{
    vertex(p.x, p.y);
  });
  endShape();
  pop();

  points.forEach(p=>{
    push();
    stroke(255);
    strokeWeight(16);
    point(p.x, p.y);
    pop();
  });

  swap(points, floor(random(points.length)), floor(random(points.length)));

  var d = calcDist(points);
  if(d<recordDist){
    recordDist = d;
     bestEver = points.slice();
    console.log(recordDist);
  }
}

function swap(arr, i, j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function calcDist(arr){
  var sum=0;
  var prev = null;
  arr.forEach(p=>{
    if(prev){
      sum+=dist(prev.x, prev.y, p.x, p.y);
    }
    prev = p;
  });
  return sum;
}
