let cam, font;
var luminance = " .,-~:;=!*#$@";
var w = 80;
var h = 40;

var consolemode = true;

function preload(){
  font = loadFont('data/consola.ttf');
}

function setup(){
  createCanvas(400, 400);
  cam = createCapture(VIDEO);
  cam.hide();
  if(consolemode){
    var arr = luminance.split("");
    luminance = arr.reverse().join("");
  }
}

function draw(){
  image(cam, 0, 0, width, height);
  var output = "";
  loadPixels();
  for(var y=0;y<height;y+=height/h){
    for(var x=0;x<width;x+=width/w){
      var z = (x+y*width)*4;
      var p = pixels;
      var col = (p[z]+p[z+1]+p[z+2])/3;
      var index = floor(col/(255/luminance.length));
      output+=luminance[index];
    }
    output+="\n";
  }
  updatePixels();
  if(consolemode){
    console.log(output);
  }
  else{
    background(0);
    push();
    fill(255);
    stroke(255);
    textFont(font);
    textSize(width/w*1.5);
    textAlign(CENTER, CENTER);
    text(output, width/2, height/2);
    pop();
  }
}
