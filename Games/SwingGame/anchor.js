class Anchor{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.fill = 0;
  }

  show(){
    push();
    fill(this.fill);
    stroke(255);
    circle(this.pos.x, this.pos.y, 25);
    pop();
    this.fill = 0;
  }

  highlight(){
    this.fill = 255;
  }
}
