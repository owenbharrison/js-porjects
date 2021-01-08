class Particle{
  constructor(x, y, locked){
    this.pos = createVector(x, y);
    this.oldpos = createVector(x, y);
    this.locked = locked;
    this.mda = Infinity;
    this.mdl = Infinity;
  }

  update(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(airfriction);
    this.oldpos = this.pos.copy();
    if(!this.locked){
      this.pos.add(v);
      this.pos.add(gravity);
    }
    this.mouseConstraint();
  }

  constrain(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(airfriction);
    if(this.pos.x>width-size/2){this.pos.x=width-size/2,this.oldpos.x=this.pos.x+v.x*bounce;}
    else if(this.pos.x<size/2){this.pos.x=size/2,this.oldpos.x=this.pos.x+v.x*bounce;}
    if(this.pos.y>height-size/2){this.pos.y=height-size/2,this.oldpos.y=this.pos.y+v.y*bounce;}
    else if(this.pos.y<size/2){this.pos.y=size/2,this.oldpos.y=this.pos.y+v.y*bounce;}
  }

  mouseConstraint(){
    this.mda = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if(!mouseIsPressed){this.mdl = this.mda;}
    if(mouseIsPressed&&this.mdl<size){
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

  show(){
    push();
    stroke(255);
    strokeWeight(size);
    line(this.pos.x, this.pos.y, this.oldpos.x, this.oldpos.y);
    pop();
  }
}
