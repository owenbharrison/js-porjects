class Grid{
  constructor(cols, rows, w){
    this.cols = cols;
    this.rows = rows;
    this.w = w;
    this.cells = make2DArray(this.cols, this.rows);
    for(var i=0;i<this.cols;i++){
      for(var j=0;j<this.rows;j++){
        this.cells[i][j] = new Cell(i, j, w, this);
      }
    }
  }

  countBombs(){
    for(var i=0;i<this.cols;i++){
      for(var j=0;j<this.rows;j++){
        this.cells[i][j].countBombs();
      }
    }
  }

  setBombs(totalBombs){
    var options = [];
    for(var i=0;i<this.cols;i++){
      for(var j=0;j<this.rows;j++){
        options.push(createVector(i, j));
      }
    }
    for(var n=0;n<totalBombs;n++){
      var index = floor(random(options.length));
      var choice = options[index];
      this.cells[choice.x][choice.y].bomb = true;
      options.splice(index, 1);
    }
  }

  checkClicks(){
    this.cells.forEach(col=>{
      col.forEach(cell=>{
        if(cell.contains(mouseX, mouseY)){
          cell.reveal();
          if(cell.bomb){
            gameOver();
          }
        }
      });
    });
  }

  show(){
    this.cells.forEach(col=>{
      col.forEach(cell=>{
        cell.show();
      });
    });
  }
}
