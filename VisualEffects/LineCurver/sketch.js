var dots = [];
var intensity = 0.5;

let slider;

function setup(){
  createCanvas(400, 400);
  slider = createSlider(2, 10, 2, 0.01);
}

function mousePressed(){
  var m = createVector(mouseX, mouseY);
  if(inRange(m.x, 0, width)&&inRange(m.x, 0, height)){
    dots.push(m);
  }
}

function draw(){
  background(0);
  push();
  stroke(255, 0, 0);
  strokeWeight(3);
  noFill();
  beginShape();
  dots.forEach(d=>{
    vertex(d.x, d.y);
    circle(d.x, d.y, 5);
  });
  endShape();
  pop();
  if(dots.length>2){
    var newdots = [...dots];
    for(var i=1;i<dots.length-1;i++){
      var prev = dots[i-1];
      var curr = dots[i];
      var next = dots[i+1];
      var pc = p5.Vector.sub(prev, curr);
      var nc = p5.Vector.sub(next, curr);
      var middle = p5.Vector.add(p5.Vector.fromAngle(pc.heading(), 1), p5.Vector.fromAngle(nc.heading(), 1));
      var angle = middle.heading();
      var len = (pc.mag()+nc.mag())/slider.value();
      var res = p5.Vector.fromAngle(angle, len).add(curr);
      newdots[i] = res;
    }
    push();
    stroke(0, 255, 0);
    strokeWeight(3);
    noFill();
    beginShape();
    newdots.forEach(d=>{
      vertex(d.x, d.y);
    });
    endShape();
    pop();
  }
}

function inRange(v, n, x){
  return (v>=Math.min(n,x)&&v<=Math.max(n,x));
}
