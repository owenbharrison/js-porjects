class Key{
  constructor(x, y, sz, letter){
    this.pos = createVector(x, y);
    this.sz = sz;
    this.letter = letter;
    this.mouseOver = false;
  }

  update(){
    this.mouseOver = abs(this.pos.x-mouseX)<this.sz/2&&abs(this.pos.y-mouseY)<this.sz/2;
  }

  show(){
    push();
    noFill();
    stroke(!this.mouseOver*255, this.mouseOver*255, 0);
    strokeWeight(2);
    rectMode(CENTER, CENTER);
    square(this.pos.x, this.pos.y, this.sz);
    pop();
    push();
    fill(255);
    stroke(255);
    textSize(this.sz/2);
    textAlign(CENTER, CENTER);
    text(this.letter, this.pos.x, this.pos.y)
    pop();
  }
}
