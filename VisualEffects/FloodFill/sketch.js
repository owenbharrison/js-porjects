var grid = [];

var dots = [];
var lines = [];

var started = false;

function setup(){
  createCanvas(400, 400);
  pixelDensity(1);
}

function mousePressed(){
  if(started){
    grid[mouseX+mouseY*width].reveal();
  }else{
    dots.push(createVector(mouseX, mouseY));
  }
}

function draw(){
  background(0);
  push();
  noFill();
  stroke(255);
  strokeWeight(3);
  beginShape();
  dots.forEach(d=>
    vertex(d.x, d.y)
  )
  endShape(CLOSE);
  pop();
  if(started){
    loadPixels();
    for(var x=0;x<width;x++){
      for(var y=0;y<height;y++){
        var index = (x+y*width)*4;
        var cell = grid[x+y*width];

        pixels[index+0] = cell.revealed*255;
        pixels[index+1] = cell.revealed*255;
        pixels[index+2] = cell.revealed*255;
        pixels[index+3] = 255;
      }
    }
    updatePixels();
  }
  else{
    if(keys[32]){
      started = true;
      loadPixels();
      var p = pixels;
      updatePixels();
      for(var x=0;x<width;x++){
        for(var y=0;y<height;y++){
          var z = (x+y*width)*4;
          var col = (p[z]+p[z+1]+p[z+2])/3;
          grid[x+y*width] = new Cell(x, y, col>255/2);
        }
      }
    }
  }
}
