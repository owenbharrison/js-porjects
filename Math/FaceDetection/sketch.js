let cam;

function setup(){
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw(){
  background(0);
  image(cam, 0, 0, width, height);

  allDetectedFaces.forEach(f=>{
    push();
    fill(0);
    rect(f.x, f.y, f.width, f.height);
    pop();

    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("CENSORED", f.x+f.width/2, f.y+f.height/2);
    pop();
  });
}
