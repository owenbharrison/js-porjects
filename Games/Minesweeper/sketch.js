var grid;
var cols;
var rows;
var w = 25;
var totalBombs = 40;

function setup(){
  createCanvas(400, 400);
  cols = floor(width/w);
  rows = floor(height/w);
  grid = new Grid(cols, rows, w);
  grid.setBombs(totalBombs);
  grid.countBombs();
}

function mousePressed(){
  grid.checkClicks();
}

function draw(){
  background(255);
  grid.show();
}

function gameOver(){
  noLoop();
  grid.cells.forEach(col=>{
    col.forEach(cell=>{
      cell.revealed = true;
    });
  });
}
