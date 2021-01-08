var cops = [];
var player;

let copImg;
let playerImg;

function preload(){
  copImg = loadImage("data/cop.png");
  playerImg = loadImage("data/car.png");
}

function setup(){
  createCanvas(window.innerWidth-15, window.innerHeight-15);
  for(var i=0;i<5;i++){
    var pos = positiononedge();
    cops.push(new Cop(pos.x, pos.y));
  }
  player = new Player(width/2, height/2)
}

function draw(){
  background(170);
  cops.forEach(c=>{
    c.update();
    var ppos = player.chassis.pos;
    var cpos = c.chassis.pos;
    c.chassis.moveTo(ppos.x, ppos.y);
    c.show();
  });
  player.update();
  player.show();
}

function positiononedge(){
  if(random(1)>0.5){//x edges
    return createVector(random(width), round(random(1))*height);
  }
  else{//y edges
    return createVector(round(random(1))*width, random(height));
  }
}
