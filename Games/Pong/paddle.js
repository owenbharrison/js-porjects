class Paddle{
  constructor(x, y, w, h){
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.speed = 2.5;
    this.score = 0;
  }

  show(){
    push();
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(this.score, this.pos.x, 24);
    pop();

    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    rectMode(CENTER, CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }

  contains(x, y){
    return (x>this.pos.x-this.w/2&&x<this.pos.x+this.w/2&&y>this.pos.y-this.h/2&&y<this.pos.y+this.h/2);
  }
}
