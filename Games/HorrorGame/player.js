function Player(x, y){
  this.pos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  this.rot = 0;
  this.rotspeed = 0.05;
  this.speed = 0.3;
  this.monster = null;

  this.update = function(){
    this.pos.add(this.vel);
    this.vel.mult(0.85);
    keys[38]?this.moveForward():null;
    this.turn(keys[37]?-this.rotspeed:keys[39]?this.rotspeed:0);
  }

  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    triangle(8, 2.5, 8, -2.5, 12, 0);
    fill(0, 255, 70);
    circle(0, 0, 15);
    pop();
  }

  this.checkWalls = function() {
    this.pos.x=this.pos.x<0?0:this.pos.x>width?width:this.pos.x;
    this.pos.y=this.pos.y<0?0:this.pos.y>height?height:this.pos.y;
  }

  this.moveForward = function(){
    this.applyForce(p5.Vector.fromAngle(this.rot, 0.3));
  }

  this.turn = function(r){
    this.rot += r;
  }

  this.applyForce = function(force){
    this.acc = force.copy();
    this.vel.add(this.acc);
  }
}
