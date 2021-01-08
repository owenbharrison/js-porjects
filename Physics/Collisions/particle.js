class Particle{
  constructor(x, y, size){
    this.pos = createVector(x, y);
    this.oldpos = this.pos.copy();
    this.locked = false;
    this.size = size||8;
    this.mda = Infinity;
    this.mdl = Infinity;
  }

  update(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(friction);
    this.oldpos = this.pos.copy();
    if(!this.locked){
      this.pos.add(v);
      this.pos.add(gravity);
    }
    for(var i=0;i<5;i++){
      this.mouseConstraint();
    }
  }

  checkCollide(particle){
    var overlap = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)-(this.size/2+particle.size/2);
    if(overlap<0){
      var angle = p5.Vector.sub(this.pos, particle.pos).heading();
      var vec = p5.Vector.fromAngle(angle, -1);
      this.oldpos.add(vec);
    }
  }

  constrain(){
    var o=this.size/2;
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(friction);
    if(this.pos.y>height-o){
      this.pos.y=height-o;
      this.oldpos.y=this.pos.y+v.y*bounce;
    }
    if(this.pos.y<o){
      this.pos.y=o;
      this.oldpos.y=this.pos.y+v.y*bounce;
    }
    if(this.pos.x>width-o){
      this.pos.x=width-o;
      this.oldpos.x=this.pos.x+v.x*bounce;
    }
    if(this.pos.x<o){
      this.pos.x=o;
      this.oldpos.x=this.pos.x+v.x*bounce;
    }
  }

  mouseConstraint(){
    this.mda = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if(!mouseIsPressed){this.mdl = this.mda;}
    if(this.mdl<this.size/2){
      if(mouseIsPressed){
        if(!this.locked){
          this.pos.add(p5.Vector.sub(this.pos,createVector(mouseX,mouseY)).mult(-0.5));
        }
        push();
        stroke(255);
        line(this.pos.x, this.pos.y, mouseX, mouseY);
        pop();
        keys[32]?this.locked=true:0;
        keys[16]?this.locked=false:0;
      }
    }
  }

  show(){
    push();
    stroke(0);
    strokeWeight(this.size);
    point(this.pos.x, this.pos.y);
    pop();
  }
}
