let cam;

var dots = [];

function setup(){
  createCanvas(540, 360);
  pixelDensity(1);
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw(){
  background(255);
  image(cam, 0, 0, width, height);
  loadPixels();
  var data = [...pixels];
  for(var y=0;y<height;y++){
    for(var x=0;x<width;x++){
      var index = 4*(x+y*width);
      if (pixels[index+0]=255, pixels[index+1]=255, pixels[index+2]=255, pixels[index+3]=255,x>0&&x<width-1&&y>0&&y<width-1){
        var top = pdiff(4*(x+(y-1)*width),index,data);
        var bottom = pdiff(4*(x+(y+1)*width),index,data);
        var left = pdiff(4*(x-1+y*width),index,data);
        var right = pdiff(4*(x+1+y*width),index,data);
        var threshold = 5;
        if(top>threshold||bottom>threshold||left>threshold||right>threshold){
          pixels[index+0] = 0;
          pixels[index+1] = 0;
          pixels[index+2] = 0;
          pixels[index+3] = 255;
        }
      }
    }
  }
  updatePixels();
}

function pdiff(index1, index2, pixels) {
  return Math.abs(avgcol(index1, pixels)-avgcol(index2, pixels));
}

function avgcol(index, pixels) {
  return (pixels[index]+pixels[index+1]+pixels[index+2])/3;
}
