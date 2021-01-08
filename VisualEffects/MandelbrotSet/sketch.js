var maxval = 4;

function setup(){
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw(){
  var maxiterations = 50;
  maxval /= 1.01;
  loadPixels();
  for(var x=0;x<width;x++){
    for(var y=0;y<width;y++){
      var a = map(x, 0, width, -maxval, maxval);
      var b = map(y, 0, height, -maxval, maxval);

      var ca = a;
      var cb = b;

      var z = 0;

      for(var n=0;n<maxiterations;n++){
        var aa = a*a-b*b;
        var bb = 2*a*b;
        a = aa-0.70176;
        b = bb-0.3842;
        if(abs(a+b)>16){
          break;
        }
      }

      var bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);
      if(n==maxiterations){
        bright = 0;
      }

      var index = (x+y*width)*4;
      pixels[index+0] = bright;
      pixels[index+1] = bright;
      pixels[index+2] = bright;
      pixels[index+3] = 255;
    }
  }
  updatePixels();
}
