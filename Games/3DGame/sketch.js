var keys = new Array(255);
keys.fill(false);
document.addEventListener("keydown", e=>keys[e.keyCode]=!0);
document.addEventListener("keyup", e=>{
  keys[e.keyCode]=!1;
  if(e.keyCode==113)debugScreen=!debugScreen;
});

let canvas;
var player;
var UNIT = 20;
var GRAVITY;

var cameraSen = 1200;
var cameraTurnX = cameraSen;
var cameraTurnY = cameraSen/2;
var renderDistance = 1000;

var pointerstate = false;
var debugScreen = false;

var blocks = [];

function setup(){
  canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  canvas.elt.style = "position:absolute;top:0px;left:0px;z-index:1;";
  player = new Player(0, 0, 100, renderDistance, PI/3);
  GRAVITY = createVector(0, 0.8, 0);
  for(var x=-3;x<=3;x++){
    for(var z=-3;z<=3;z++){
      blocks.push(new Block(x*UNIT, 0, z*UNIT))
    }
  }
}

function draw(){
  background(170);
  blocks.forEach(b=>b.show())
  pointerstate=document.pointerLockElement==canvas.elt;
  cameraTurnY=cameraTurnY>cameraSen?cameraSen:cameraTurnY<0?0:cameraTurnY;
  player.walking = false;
  player.strafing = false;
  player.walk(keys[87]?1:keys[83]?-0.4:0);
  player.strafe(keys[65]?0.6:keys[68]?-0.6:0);
  player.jumping = keys[32];
  player.sneaking = keys[16];
  push();
  noStroke();
  beginShape();
  for(var i=0;i<1000;i++){
    vertex(random(5), 0, random(5))
  }
  endShape(CLOSE);
  pop();
  player.update();
  player.updateCamera(cameraTurnX, cameraTurnY, cameraSen);
  player.showCamera();
}

window.onmousemove=e=>{
  if(pointerstate){
    cameraTurnX+=e.movementX;
    cameraTurnY+=e.movementY;
  }
}

window.onmousedown=e=>{
  if(e.button==0){
    if(!pointerstate){
      canvas.elt.requestPointerLock();
    }
  }
  if(e.button==1){
    player.zooming = true;
  }
  if(e.button==4){
    player.sprinting = true;
  }
}
window.onmouseup=e=>{
  if(e.button==1){
    player.zooming = false;
  }
}

function debugBoxes(){
  push();
  fill(255);
  translate(0,0,0);
  box(UNIT);
  pop();
  push();
  fill(255,0,0)
  translate(-20,0,0);
  box(UNIT);
  pop();
  push();
  fill(0,0,255)
  translate(20,0,0)
  box(UNIT);
  pop();
  push();
  fill(0,255,0)
  translate(0,20,0)
  box(UNIT);
  pop();
  push();
  fill(255,255,0)
  translate(0,-20,0)
  box(UNIT);
  pop();
}
