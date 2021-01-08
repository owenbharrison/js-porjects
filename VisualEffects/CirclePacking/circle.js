function Circle(x, y, col){
  this.x = x;
  this.y = y;
  this.r = 1;
  this.growing = true;
  this.col = col;

  this.show = function(){
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.col.r, this.col.g, this.col.b);
    circle(0, 0, this.r*2);
    pop();
  }

  this.grow = function(){
    this.r+=this.growing*0.5;
  }

  this.edges = function(){
    return (this.x-this.r<0||this.x+this.r>width||this.y-this.r<0||this.y+this.r>height)
  }
}
