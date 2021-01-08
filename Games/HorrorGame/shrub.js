function Shrub(x, y, size){
  this.pos = createVector(x, y);
  this.size = size;

  this.show = function(){
    push();
    fill(0, 200, 70);
    rectMode(CENTER, CENTER);
    rect(this.pos.x, this.pos.y, this.size, this.size);
    pop();
  }
}
