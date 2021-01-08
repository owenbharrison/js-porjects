class Cell{
  constructor(x, y, revealed){
    this.pos = createVector(x, y);
    this.revealed = revealed;
  }

  floodFill(){
    setTimeout(()=>{
      for(var x_=-1;x_<=1;x_++){
        for(var y_=-1;y_<=1;y_++){
          var x = this.pos.x+x_;
          var y = this.pos.y+y_;
          var neighbor = grid[x+y*width];
          if(x>=0&&x<width&&y>=0&&y<height){
            if(x_*y_==0&&!neighbor.revealed){
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
