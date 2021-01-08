var cols, rows;
var w = 25;
var grid = [];

var current;

var stack = [];

function setup(){
  createCanvas(400, 400);
  cols = floor(width/w);
  rows = floor(height/w);

  for(var j=0;j<rows;j++){
    for(var i=0;i<cols;i++){
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
  //frameRate(5);
}

function draw(){
  background(51);
  grid.forEach(c=>{
    c.show();
  });

  current.visited = true;
  current.highlight();
  //STEP 1
  var next = current.checkNeighbors();
  if(next){
    next.visited = true;

    //STEP 2
    stack.push(current);

    //STEP 3
    removeWalls(current, next);

    //STEP 4
    current = next;
  }
  else if(stack.length>0){
    current = stack.pop();
  }
  else if(stack.length==0){

  }
}

function index(i, j){
  if(i<0||j<0||i>cols-1||j>rows-1){
    return -1;
  }
  return i+j*cols;
}

function Cell(i, j){
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];//top, right, bootom, left
  this.visited = false;

  this.show = function(){
    var x = i*w;
    var y = j*w;

    stroke(255);
    strokeWeight(2);
    this.walls[0]?line(x,y,x+w,y):null;
    this.walls[1]?line(x+w,y,x+w,y+w):null;
    this.walls[2]?line(x+w,y+w,x,y+w):null;
    this.walls[3]?line(x,y+w,x,y):null;

    if(this.visited){
      fill(190, 0, 190, 100);
      noStroke();
      rect(x,y,w,w);
    }
  }

  this.highlight = function(){
    var x = i*w;
    var y = j*w;
    fill(0, 255, 70);
    noStroke();
    circle(x+w/2,y+w/2,w/2);
  }

  this.checkNeighbors = function(){
    var neighbors = [];

    var top = grid[index(i, j-1)];
    var right = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left = grid[index(i-1, j)];

    if(top&&!top.visited){
      neighbors.push(top);
    }
    if(right&&!right.visited){
      neighbors.push(right);
    }
    if(bottom&&!bottom.visited){
      neighbors.push(bottom);
    }
    if(left&&!left.visited){
      neighbors.push(left);
    }

    if(neighbors.length>0){
      return random(neighbors);
    }
    else{
      return undefined;
    }
  }
}


function removeWalls(a, b){
  var x = a.i-b.i;
  if(x==1){
    a.walls[3] = false;
    b.walls[1] = false;
  }
  else if(x==-1){
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j-b.j;
  if(y==1){
    a.walls[0] = false;
    b.walls[2] = false;
  }
  else if(y==-1){
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
