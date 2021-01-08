class Block{
  constructor(x, y, z){
    this.pos = createVector(x, y, z);
  }

  show(){
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    box(UNIT);
    pop();
  }
}
