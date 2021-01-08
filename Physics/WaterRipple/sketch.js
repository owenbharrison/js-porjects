var surfaceParticles = [];
var surfaceConnectors = [];
var resolution = 200;

var gravity,
    airfriction = 1,
    bounce = 0.87,
    size = 8;

function setup(){
  createCanvas(600, 600);
  gravity = createVector(0, 0);
  for(var i=0;i<resolution;i++){
    var x = map(i, 0, resolution, 0, width);
    surfaceParticles[i] = new Particle(x, height*2/3, i==0||i==resolution-1);
  }
  for(var i=0;i<surfaceParticles.length-1;i++){
    surfaceConnectors[i] = new Stick(surfaceParticles[i], surfaceParticles[i+1], width/resolution-2);
  }
}

function draw(){
  background(170);
  surfaceParticles.forEach(sp=>{
    sp.update();
  });
  for(var i=0;i<4;i++){
    surfaceConnectors.forEach(sc=>
    sc.update()),
    surfaceParticles.forEach(sp=>
      sp.constrain()
    );
  }
  //surfaceParticles.forEach(sp=>
    //sp.show()
  //);
  //surfaceConnectors.forEach(sc=>
    //sc.show()
  //);

  push();
  stroke(0, 40, 220, 150);
  strokeWeight(3);
  fill(0, 70, 255, 70);
  beginShape();
  vertex(width+50, height*2/3);
  vertex(width+50, height+50);
  vertex(-50, height+50);
  vertex(-50, height*2/3);
  surfaceParticles.forEach(sp=>
    vertex(sp.pos.x, sp.pos.y)
  );
  endShape(CLOSE);
  pop();
}
