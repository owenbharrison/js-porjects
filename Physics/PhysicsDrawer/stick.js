class Stick{
  constructor(p0, p1, len){
    this.p0 = p0;
    this.p1 = p1;
    this.len = len||this.getDist();
  }

  update(){
    var d = p5.Vector.sub(this.p1.pos, this.p0.pos);
    var dist = d.mag();
    var diff = this.len-dist;
    var percent = diff/dist/2;
    var o = d.mult(percent);
    if(!this.p0.xlocked)this.p0.pos.x-=o.x;
    if(!this.p0.ylocked)this.p0.pos.y-=o.y;
    if(!this.p1.xlocked)this.p1.pos.x+=o.x;
    if(!this.p1.ylocked)this.p1.pos.y+=o.y;
  }

  getDist(){
    return dist(this.p0.pos.x, this.p0.pos.y, this.p1.pos.x, this.p1.pos.y);
  }

  show(){
    push();
    stroke(0);
    line(this.p0.pos.x, this.p0.pos.y, this.p1.pos.x, this.p1.pos.y);
    pop();
  }
}
