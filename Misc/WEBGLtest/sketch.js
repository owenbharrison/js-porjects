var cubes = [];
var numcubes = 500;

function setup(){
  createCanvas(600, 600, WEBGL);
  for(var i=0;i<numcubes;i++){
    var angle = map(i, 0, numcubes, 0, Math.PI*2);
    cubes.push({col:{r:random(255),g:random(255),b:random(255)},pos:p5.Vector.fromAngle(angle,200)});
  }
  setInterval(showFrameRate, 750);
}

function draw(){
  background(170);
  cubes.forEach(cube=>{
    push();
    translate(cube.pos.x, cube.pos.y, cube.pos.z);
    fill(cube.col.r,cube.col.g,cube.col.b);
    plane(50,50);
    pop();
  });
}

function showFrameRate(){
  var fps = frameRate();
  var fpsdisplay = document.getElementById("fpsdisplay");
  fpsdisplay.style.color = fps>40?"ForestGreen":fps>20?"Gold":"FireBrick";//great:meh:awful
  fpsdisplay.innerHTML = round(frameRate());
}
