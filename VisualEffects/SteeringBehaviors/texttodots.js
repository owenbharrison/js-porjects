function textToDots(str, x, y, size){
  background(0);
  push();
  textSize(size);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  text(str, x, y);
  pop();
  loadPixels();
  var data = [];
  for(var i in pixels){
    data[i] = pixels[i];
  }
  for(var y=0;y<height;y++){
    for(var x=0;x<width;x++){
      var index = 4*(x+y*width);
      if (pixels[index+0]=0, pixels[index+1]=0, pixels[index+2]=0, pixels[index+3]=255,x>0&&x<width-1&&y>0&&y<width-1){
        var top = pdiff(4*(x+(y-1)*width),index,data);
        var bottom = pdiff(4*(x+(y+1)*width),index,data);
        var left = pdiff(4*(x-1+y*width),index,data);
        var right = pdiff(4*(x+1+y*width),index,data);
        var threshold = 0;
        if(top>threshold||bottom>threshold||left>threshold||right>threshold){
          pixels[index+0] = 255;
          pixels[index+1] = 255;
          pixels[index+2] = 255;
          pixels[index+3] = 255;
        }
      }
    }
  }
  var points = [];
  for(var y=0;y<height;y++){
    for(var x=0;x<width;x++){
      index = 4*(x+y*width);
      if (avgcol(index,pixels)>127.5){
        points.push(createVector(x, y));
      }
    }
  }
  return updatePixels(),background(0),points;
}

function pdiff(y, d, options) {
  return Math.abs(avgcol(y, options) - avgcol(d, options));
}

function avgcol(key, data) {
  return (data[key] + data[key + 1] + data[key + 2]) / 3;
}
;
