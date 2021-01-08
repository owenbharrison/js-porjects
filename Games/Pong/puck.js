class Puck{
  constructor(x, y, size){
    this.pos = createVector(x, y);
    this.speed = 5;
    this.vel = p5.Vector.random2D().mult(this.speed);
    this.size = size;
  }

  update(){
    this.pos.add(this.vel);
    if(this.pos.y<this.size){
      this.pos.y = this.size;
      this.vel.y*=-1;
      clack.play();
    }
    if(this.pos.y>height-this.size){
      this.pos.y = height-this.size;
      this.vel.y*=-1;
      clack.play();
    }
  }

  show(){
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    circle(0, 0, this.size*2);
    pop();
  }
}
