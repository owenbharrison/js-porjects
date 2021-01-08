class Stick{
  constructor(b0, b1, len){
    this.b0 = b0;
    this.b1 = b1;
    this.len = len;
  }

  update(){
    var dx = this.b1.pos.x-this.b0.pos.x,
        dy = this.b1.pos.y-this.b0.pos.y,
        dist = distance(dx, dy),
        diff = this.len-dist,
        percent = diff/dist/2,
        ox = dx*percent,
        oy = dy*percent;
    this.b0.pos.x -= ox,
    this.b0.pos.y -= oy;
    this.b1.pos.x += ox,
    this.b1.pos.y += oy;
  }

  show(){
    push();
    stroke(0);
    strokeWeight(2);
    line(this.b0.pos.x, this.b0.pos.y, this.b1.pos.x, this.b1.pos.y);
    pop();
  }
}
