var circles = [];
var dots = [];

var a = 0;
var inc = 0.01;

function setup(){
  createCanvas(400, 400);
  for(var i=0;i<10;i++){
    circles.push(new Circle(random(width), random(height), 25));
  }
}

function draw(){
  background(0);
  circles.forEach(c=>
    c.show()
  );
  var start = createVector(width/2, height/2);
  var end = p5.Vector.fromAngle(a, height).add(start);
  var distance = dist(start.x, start.y, end.x, end.y);
  var normal = p5.Vector.sub(end, start).normalize();
  for(var l=0;l<distance;l++){
    var checkPoint = p5.Vector.mult(normal, l).add(start);
    var res = false;
    circles.forEach(c=>{
      if(c.contains(checkPoint.x, checkPoint.y)){
        res = true;
      }
    });
    push();
    stroke(!res*255, res*255, 0);
    strokeWeight(2);
    line(start.x, start.y, checkPoint.x, checkPoint.y);
    pop();
    if(res){
      dots.push(checkPoint);
      break;
    }
  }
  dots.forEach(d=>{
    push();
    stroke(255);
    strokeWeight(5);
    point(d.x, d.y);
    pop();
  });
  a+=inc;
  if(frameRate()<30){
    for(var i=0;i<5;i++){
      dots.shift();
    }
  }
}
