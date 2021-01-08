let cam;
var intensity = 20;

function setup(){
  createCanvas(400, 400);
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw(){
  image(cam, 0, 0, width, height);
  loadPixels();
  let pxs = pixels;
  updatePixels();
  lagBehind(pxs);
}

function lagBehind(pxs){
  setTimeout(()=>{
    loadPixels();
    pixels = pxs;
    updatePixels();
  }, 1000);
}

function mouseWheel(event){
  intensity += event.delta/abs(event.delta)*5;
  intensity=intensity<1?1:intensity>255?255:intensity;
}
