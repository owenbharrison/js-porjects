class Cell{
  constructor(x, y, col){
    this.pos = createVector(x, y);
    this.revealed = false;
    this.col = col;
  }

  floodFill(){
    setTimeout(()=>{
      for(var x_=-1;x_<=1;x_++){
        for(var y_=-1;y_<=1;y_++){
          var x = this.pos.x+x_;
          var y = this.pos.y+y_;
          var neighbor = grid[x+y*width];
          if(x>=0&&x<width&&y>=0&&y<height){
            if(x_*y_==0&&!neighbor.revealed&&similarCol(this.col, neighbor.col, 20)){
              neighbor.reveal();
            }
          }
        }
      }
    });
  }

  reveal(){
    this.revealed = true;
    this.floodFill();
  }
}

function similarCol(a, b, t){
  return sqrt((a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2)<t;
}
