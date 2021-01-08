class Particle{
  constructor(x, y, ox, oy){
    this.pos = createVector(x, y);
    this.oldpos = createVector(ox, oy);
    this.rot = 0;
  }

  update(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(airfriction);
    this.oldpos = this.pos.copy();
    this.pos.add(v);
    this.pos.add(gravity);
    this.rot = p5.Vector.sub(this.pos, this.oldpos).heading();
  }

  constrain(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(airfriction);
    if(this.pos.y>height){
      this.pos.y=height,this.oldpos.y=this.pos.y+v.y;
    }
  }

  show(){
    var spd = dist(this.pos.x, this.pos.y, this.oldpos.x, this.oldpos.y);
    var speedStretch = map(spd, 0, 30, 20, 7);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    fill(0);
    stroke(255);
    ellipse(0, 0, 30, speedStretch);
    pop();
  }
}
