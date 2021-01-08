function Particle(pos, r){
  this.pos = pos.copy();
  this.vel = p5.Vector.fromAngle(r+(random(-Math.PI/6, Math.PI/6)), random(1, 2));
  this.alpha = 255;

  this.update = function(){
    this.pos.add(this.vel);
    this.alpha -= 5;
  }

  this.finished = function(){
    return (this.alpha<0);
  }

  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, this.alpha);
    circle(0, 0, 7);
    pop();
  }
}
