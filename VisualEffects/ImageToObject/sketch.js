var grid = [];

var img;

function preload(){
  img = loadImage("data/toon.jpg")
}

function setup(){
  createCanvas(400,400);
  pixelDensity(1);
  started = true;
  image(img, 0, 0, width, height)
  loadPixels();
  var p = pixels;
  updatePixels();
  for(var x=0;x<width;x++){
    for(var y=0;y<height;y++){
      var z = (x+y*width)*4;
      var col = (p[z]+p[z+1]+p[z+2])/3;
      grid[x+y*width] = new Cell(x, y, [p[z],p[z+1],p[z+2]]);
    }
  }
}

function mousePressed(){
  grid[mouseX+mouseY*width].reveal();
}

function draw(){
  background(img);
  loadPixels();
  for(var x=0;x<width;x++){
    for(var y=0;y<height;y++){
      var z = (x+y*width)*4;
      var c = grid[x+y*width];
      pixels[z+0] = Math.abs(c.revealed*255-pixels[z+0]);
      pixels[z+1] = Math.abs(c.revealed*255-pixels[z+1]);
      pixels[z+2] = Math.abs(c.revealed*255-pixels[z+2]);
      pixels[z+3] = 255;
    }
  }
  updatePixels();
}
