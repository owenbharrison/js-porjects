var rigidbody;
var airfriction = 0.875,
    bounce = 0.998,
    gravity;

var makeOwnShape = true,
    ready = false,
    ps = [];

var fillstyle = false;

function setup(){
  createCanvas(window.innerWidth-15, window.innerHeight-15);
  gravity = createVector(0, 1);
  if(!makeOwnShape){
    rigidbody = new RigidBody(200, 200, 45, 16, 30, fillstyle);
    ready = true;
  }
}

function mousePressed(){
  if(!ready){
    ps.push(createVector(mouseX, mouseY));
  }
}

function draw(){
  background(170);
  if(ready){
    rigidbody.update();
    rigidbody.show();
  }
  else{
    push();
    noFill();
    stroke(0);
    strokeWeight(3);
    beginShape();
    ps.forEach(p=>vertex(p.x,p.y));
    endShape(CLOSE);
    pop();
    if(keys[32]){
      rigidbody = new RigidBody(ps, fillstyle);
      ready = true;
    }
  }
}
