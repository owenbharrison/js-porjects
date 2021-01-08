var cols = 100;
var rows = 100;
var current = array2d(cols, rows, 0);
var previous = array2d(cols, rows, 0);
var dampening = 0.99;

function setup(){
  createCanvas(cols, rows);
}

function mouseDragged(){
  previous[mouseX][mouseY] = 1000;
}

function draw(){
  background(255);
  loadPixels();
  for(var i=1;i<cols-1;i++){
    for(var j=1;j<rows-1;j++){
      current[i][j] = (previous[i-1][j]+previous[i+1][j]+previous[i][j-1]+previous[i][j+1])/2-current[i][j];
      current[i][j]*=dampening;
      var index = (i+j*cols)*4;
      pixels[index+0] = current[i][j];
      pixels[index+1] = current[i][j];
      pixels[index+2] = current[i][j];
      pixels[index+3] = 255;
    }
  }
  var temp = previous;
  previous = current;
  current = temp;
  updatePixels();
}
