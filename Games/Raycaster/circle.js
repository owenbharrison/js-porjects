class Circle{
  constructor(x, y, r){
    this.pos = createVector(x, y);
    this.r = r;
  }

  contains(x, y){
    var d = dist(this.pos.x, this.pos.y, x, y);
    return d<this.r;
  }

  show(){
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(127);
    circle(0, 0, this.r*2);
    pop();
  }
}
