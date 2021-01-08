class Stick{
  constructor(p, a){
    this.p = p;
    this.a = a;
    this.len = this.getDist();
  }

  update(){
    var dx = this.a.pos.x-this.p.pos.x,
        dy = this.a.pos.y-this.p.pos.y,
        dist = Math.sqrt(dx**2+dy**2),
        diff = this.len-dist,
        percent = diff/dist/2,
        ox = dx*percent,
        oy = dy*percent;
    this.p.pos.x -= ox;
    this.p.pos.y -= oy;
  }

  getDist(){
    return dist(this.p.pos.x, this.p.pos.y, this.a.pos.x, this.a.pos.y);
  }

  show(){
    push();
    stroke(0);
    strokeWeight(2);
    stroke(255);
    line(this.p.pos.x, this.p.pos.y, this.a.pos.x, this.a.pos.y);
    pop();
  }
}
