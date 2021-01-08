class Tile{
  constructor(type, x, y, size, col){
    this.type = type;
    this.pos = createVector(x, y);
    this.size = size;
    this.col = col;
    this.found = false;
  }

  checkClicked(){
    if(mouseIsPressed&&!this.found){//if this is being clicked on
      if(mouseX>this.pos.x&&mouseX<this.pos.x+this.size&&mouseY>this.pos.y&&mouseY<this.pos.y+this.size){
        this.found = true;
        if(cursortype!=this.type){
          lives--;
        }
      }
    }
  }

  reveal(){
    push();
    noStroke();
    fill(this.col.r, this.col.g, this.col.b)
    square(this.pos.x, this.pos.y, this.size);
    pop();
  }

  show(){
    var margin = 2;
    if(this.found){
      if(this.type){//if this is a block
        push();
        noStroke();
        fill(20);
        rect(this.pos.x+margin, this.pos.y+margin, this.size-margin*2, this.size-margin*2);
        pop();
      }
      else{//else if this is an X
        drawX(this.pos.x+this.size/2, this.pos.y+this.size/2, this.size-margin*4, 2);
      }
    }
  }
}
