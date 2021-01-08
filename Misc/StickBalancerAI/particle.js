class Particle{
  constructor(x, y, ox, oy){
    this.pos = createVector(x, y);
    this.oldpos = createVector(ox, oy);
  }

  update(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(airfriction);
    this.oldpos = this.pos.copy();
    this.pos.add(v);
    this.pos.add(gravity);
  }

  constrain(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(airfriction);
    if(this.pos.y>height){
      this.pos.y=height,this.oldpos.y=this.pos.y+v.y;
    }
    else if(this.pos.y<0){
      this.pos.y=0,this.oldpos.y=this.pos.y+v.y;
    }
    //if(this.pos.x>width){
      //this.pos.x=width;
      //this.oldpos.x=this.pos.x+v.x*bounce;
    //}
    //else if(this.pos.x<0){
      //this.pos.x=0;
      //this.oldpos.x=this.pos.x+v.x*bounce;
    //}
  }

  show(){
    push();
    noFill();
    stroke(0);
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
    pop();
  }
}
