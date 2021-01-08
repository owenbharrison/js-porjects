class Cell{
  constructor(i, j, w, parent){
    this.i = i;
    this.j = j;
    this.w = w;
    this.parent = parent;
    this.pos = createVector(this.i*this.w, this.j*this.w);
    this.neighborCount = 0;
    this.bomb = false;
    this.revealed = false;
  }

  show(){
    push();
    stroke(0);
    noFill();
    square(this.pos.x, this.pos.y, this.w);
    pop();
    if(this.revealed){
      if(this.bomb){
        push();
        fill(120);
        circle(this.pos.x+this.w/2, this.pos.y+this.w/2, this.w/2);
        pop();
      }else{
        push();
        fill(200);
        square(this.pos.x, this.pos.y, this.w);
        pop();
        if(this.neighborCount>0){
          push();
          fill(0);
          textSize(this.w);
          textAlign(CENTER, CENTER);
          text(this.neighborCount, this.pos.x+this.w/2, this.pos.y+this.w/2);
          pop();
        }
      }
    }
  }

  floodFill(){
    setTimeout(()=>{
      for(var i=-1;i<=1;i++){
        for(var j=-1;j<=1;j++){
          if((this.i+i>=0&&this.i+i<this.parent.cols)&&(this.j+j>=0&&this.j+j<this.parent.rows)){
            var neighbor = this.parent.cells[this.i+i][this.j+j];
            if(!this.bomb&&!neighbor.revealed){
              neighbor.reveal();
            }
          }
        }
      }
    }, 20);
  }

  countBombs(){
    if(this.bomb){
      this.neighborCount = -1;
    }
    var total = 0;
    for(var i=-1;i<=1;i++){
      for(var j=-1;j<=1;j++){
        if((this.i+i>=0&&this.i+i<this.parent.cols)&&(this.j+j>=0&&this.j+j<this.parent.rows)){
          var neighbor = this.parent.cells[this.i+i][this.j+j];
          if(neighbor.bomb){
            total++;
          }
        }
      }
    }
    this.neighborCount = total;
  }

  reveal(){
    this.revealed = true;
    if(this.neighborCount==0){
      this.floodFill();
    }
  }

  contains(x, y){
    return (x>this.pos.x&&x<this.pos.x+this.w&&y>this.pos.y&&y<this.pos.y+this.w);
  }
}
