var grid = [];
for(var i=0;i<400;i++){
  grid[i] = [];
}
for(var i=0;i<grid.length;i++){
  for(var j=0;j<grid.length;j++){
    grid[i][j] = 0;
  }
}

var x;
var y;
var dir;

const ANTUP = 0;
const ANTRIGHT = 1;
const ANTDOWN = 2;
const ANTLEFT = 3;

function setup(){
  createCanvas(400, 400);
  x = 200;
  y = 200;
  dir = ANTUP;
}

function turnRight(){
  dir++;
  if(dir>ANTLEFT){
    dir = ANTUP;
  }
}

function turnLeft(){
  dir--;
  if(dir<ANTUP){
    dir = ANTLEFT;
  }
}

function moveForward(){
  if(dir==ANTUP){
    y--;
  }
  else if(dir==ANTRIGHT){
    x++;
  }
  else if(dir==ANTDOWN){
    y++;
  }
  else if (dir==ANTLEFT) {
    x--;
  }
  x=(x<0)?width-1:(x>=width)?0:x;
  y=(y<0)?height-1:(y>=height)?0:y;
}

function draw(){
  background(255);
  var step = 100;
  for(var f=0;f<step;f++){
    var state = grid[x][y];
    if(state==0){
      turnRight();
      grid[x][y]=1;
      moveForward();
    }
    else if(state==1){
      turnLeft();
      grid[x][y]=0;
      moveForward();
    }
  }
  loadPixels();
  for(var i=0;i<width;i++){
    for(var j=0;j<height;j++){
      var index = (i+j*width)*4;
      if(grid[i][j]==0){
        pixels[index+0] = 255;
        pixels[index+1] = 255;
        pixels[index+2] = 255;
        pixels[index+3] = 255;
      }
      if(grid[i][j]==1){
        pixels[index+0] = 0;
        pixels[index+1] = 0;
        pixels[index+2] = 0;
        pixels[index+3] = 255;
      }
    }
  }
  updatePixels();
}
