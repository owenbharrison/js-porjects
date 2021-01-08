var img;
var grid;
var lives = 3;
var UISize = 55;

var cursortype = true;//true blocks false X
var cursortypeswitch = false;

function preload(){
  img = loadImage("data/cat.jpg");
}

function setup(){
  createCanvas(600, 600);
  grid = new Grid(img, 20);
  background(255);
}

function draw(){
  background(255);
  canvasOutline();
  gameOutline();
  if(!grid.finished()){
    grid.update();
    grid.show();
    grid.showtabs();
    push();
    fill(255, 0, 0);
    textAlign(CENTER, CENTER),textSize(UISize*1.5),textStyle(BOLD);
    text((lives==3)?"❤❤❤":(lives==2)?"❤❤💔":(lives==1)?"❤💔💔":"💔💔💔", width/2, height-50);
    pop();
  }
  else{
    grid.show();
    setTimeout(()=>{
      background(52, 229, 235);
      canvasOutline();
      grid.reveal();
      push();
      fill(255),stroke(0),strokeWeight(4);
      textAlign(CENTER, CENTER),textSize(UISize*1.5),textStyle(BOLD);
      text("You Win!", width/2, 50);
      pop();
      noLoop();
    }, 300);
  }
  if(lives==0){
    setTimeout(()=>{
      background(207, 24, 0);
      canvasOutline();
      gameOutline();
      grid.show();
      grid.showtabs();
      push();
      fill(255),stroke(0),strokeWeight(4);
      textAlign(CENTER, CENTER),textSize(UISize*1.5),textStyle(BOLD);
      text("you are die", width/2, 50);
      pop();
      noLoop();
    }, 300);
  }
  push();
  noFill(),stroke(0),strokeWeight(4);
  circle(width-50, height-50, UISize*1.4);
  pop();
  if(cursortype){
    push();
    fill(0);
    noStroke();
    rectMode(CENTER, CENTER);
    rect(width-50, height-50, UISize*0.8, UISize*0.8);
    pop();
  }else{
    drawX(width-50, height-50, UISize*0.8, 3);
  }
  if(keys[32]){
    cursortypeswitch = true;
  }
  if(!keys[32]&&cursortypeswitch){
    cursortypeswitch = false;
    cursortype = !cursortype;
  }
}

function canvasOutline(){
  push();
  noFill();
  stroke(0);
  strokeWeight(6);
  rect(0, 0, width, height);
  pop();
}

function gameOutline(){
  push();
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(100, 100, width-200, height-200);
  pop();
}

function drawX(x, y, sz, sw){
  push();
  stroke(0);
  strokeWeight(sw);
  line(x-sz/2, y-sz/2, x+sz/2, y+sz/2);
  line(x-sz/2, y+sz/2, x+sz/2, y-sz/2);
  pop();
}
