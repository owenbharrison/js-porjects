class Particle{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.oldpos = this.pos.copy();
    this.locked = false;
    this.size = 8;
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
    for(var i=0;i<5;i++){
      this.mouseConstraint();
    }
  }

  constrain(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(airfriction);
    if(this.pos.y>height){this.pos.y=height,this.oldpos.y=this.pos.y+v.y;}
    if(this.pos.y<0){this.pos.y=0,this.oldpos.y=this.pos.y-v.y;}
    if(this.pos.x>width){this.pos.x=width,this.oldpos.x=this.pos.x+v.x;}
    if(this.pos.x<0){this.pos.x=0,this.oldpos.x=this.pos.x-v.x;}
  }

  mouseConstraint(){
    this.mda = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if(!mouseIsPressed){this.mdl = this.mda;}
    if(this.mdl<this.size){
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
