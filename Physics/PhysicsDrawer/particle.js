class Particle{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.oldpos = this.pos.copy();
    this.xlocked = false;
    this.ylocked = false;
    this.mda = Infinity;
    this.mdl = Infinity;
  }

  update(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(airfriction);
    this.oldpos = this.pos.copy();
    if(!this.xlocked){
      this.pos.x+=v.x;
      this.pos.x+=gravity.x;
    }
    if(!this.ylocked){
      this.pos.y+=v.y;
      this.pos.y+=gravity.y;
    }
    this.mouseConstraint();
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
    if(this.mdl<8&&mouseIsPressed){
      var v = p5.Vector.sub(this.pos,createVector(mouseX,mouseY)).mult(-0.5);
      if(!this.xlocked){
        this.pos.x+=v.x;
      }
      if(!this.ylocked){
        this.pos.y+=v.y;
      }
      push();
      stroke(255);
      line(this.pos.x, this.pos.y, mouseX, mouseY);
      pop();
      if(keys[88]){
        this.xlocked = true;
      }
      if(keys[89]){
        this.ylocked = true;
      }
      if(keys[16]){
        this.xlocked = false;
        this.ylocked = false;
      }
    }
  }

  show(){
    push();
    strokeWeight(1);
    stroke(255,0,0);
    if(this.xlocked){
      line(this.pos.x, 0, this.pos.x, height);
    }
    if(this.ylocked){
      line(0, this.pos.y, width, this.pos.y);
    }
    pop();
    push();
    stroke(0);
    strokeWeight(8);
    point(this.pos.x, this.pos.y);
    pop();
  }
}
