function Laser(pos, rot){
  this.pos = createVector(pos.x, pos.y);
  this.vel = p5.Vector.fromAngle(rot);
  this.vel.mult(5);

  this.update = function(){
    this.pos.add(this.vel);
  }

  this.render = function(){
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(4);
    point(0, 0);
    pop();
  }

  this.isOffscreen = function(){
    return (this.pos.x<0||this.pos.x>width||this.pos.y<0||this.pos.y>height);
  }

  this.hits = function(asteroid){
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return (d<asteroid.r);
  }
}
