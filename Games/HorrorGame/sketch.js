var player;
var monster;

var monsterImg;
var monsterScream1;
var monsterScream2;
var startButton;

var gamestarted = false;
var gameRenderMode = 2;//0 is plain, 1 is top down with lines, 2 is "3d" raycast render mode
var fov = Math.PI/2;
var shrubs = [];
var walls = [];

function preload(){
  monsterImg = loadImage('data/scary.jpg');
  backgroundMusic = loadSound('data/backgroundmusic.mp3');
  monsterScream1 = loadSound('data/scream_1.mp3');
  monsterScream2 = loadSound('data/scream_2.mp3');
}

function setup(){
  var canvas = createCanvas(600, 600);
  canvas.elt.click();
  player = new Player(width/2, height/2);
  var mp = p5.Vector.random2D().mult(width).add(player.pos);
  monster = new Monster(mp.x, mp.y, player);
  for(var i=0;i<10;i++){
    shrubs.push(new Shrub(random(width), random(height), random(20, 25)));
  }
  startButton = new Button(width/2, height/2, 480, 120, "Start Game");
  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(width, height, 0, height));
  walls.push(new Wall(0, height, 0, 0));
  backgroundMusic.setVolume(0.002);
  monsterScream1.setVolume(1);
  monsterScream2.setVolume(1);
}

function draw(){
  background(0);
  if(gamestarted){
    player.checkWalls();
    player.update();
    monster.checkWalls();
    monster.update();
    if(gameRenderMode==0){
      player.show();
      monster.show();
      shrubs.forEach(shrub=>{
        shrub.show();
      });
    }
    if(gameRenderMode==1){
      raycast(player.pos, player.rot, width/3, shrubs, true);
      player.show();
      monster.show();
      shrubs.forEach(shrub=>{
        shrub.show();
      });
    }
    if(true){
      var vals = raycast(player.pos, player.rot, width/3, shrubs, false);
      var w = width/vals.length;
      var monsterx = null;
      var monsterw = 0;
      var mf = false;
      for(i in vals){
        if(vals[i].type=="monster"&&!mf){
          monsterx = i*w+w/2;
          monsterh = map(vals[i].height, 0, width/3, height/2, 0);
          monsterw+=w;
        }
        if(vals[i].type==monster&&mf){
          monsterw+=w;
        }
        if(vals[i].type!="monster"&&mf){
          break;
        }
      }
      if(monsterx!=null){
        push();
        image(monsterImg, monsterx, height/2-monsterh/2, monsterw, monsterh);
        pop();
      }
      for(var i=0;i<vals.length;i++){
        var x = i*w+w/2;
        var h_ = vals[i].height;
        var h = map(h_, 0, width/3, height/2, 0);
        var col = vals[i].col;
        if(vals[i].type!="monster"){
          push();
          noStroke();
          var bright = map(h, 0, height/2, 0.5, 1);
          fill(col.r*bright, col.g*bright, col.b*bright);
          rectMode(CENTER, CENTER);
          rect(x, height/2, w, h);
          pop();
        }
      }
    }
  }
  else{
    gamestarted = startButton.checkMousePress();
    startButton.show();
    backgroundMusic.loop();
  }
  //glitchShift();//really laggggy
}


function glitchShift(){
  var xintensity = round(random(3));
  var xinc = 2;
  var yintensity = round(random(3));
  var yinc = 2;
  loadPixels();
  for(var x=xintensity-1;x<width-xintensity;x++){
    for(var y=0;y<height;y+=xinc){
      var myindex = (x+y*width)*4;
      var changeindex = ((x-xintensity)+y*width)*4;
      pixels[changeindex+0] = pixels[myindex+0];
      pixels[changeindex+1] = pixels[myindex+1];
      pixels[changeindex+2] = pixels[myindex+2];
      pixels[changeindex+3] = 255;
    }
  }
  for(var x=0;x<width;x+=yinc){
    for(var y=yintensity-1;y<height-yintensity;y++){
      var myindex = (x+y*width)*4;
      var changeindex = (x+(y-yintensity)*width)*4;
      pixels[changeindex+0] = pixels[myindex+0];
      pixels[changeindex+1] = pixels[myindex+1];
      pixels[changeindex+2] = pixels[myindex+2];
      pixels[changeindex+3] = 255;
    }
  }
  updatePixels();
}

function Wall(x1, y1, x2, y2){
  this.a = createVector(x1, y1);
  this.b = createVector(x2, y2);
}


function Button(x, y, w, h, val){
  this.pos = createVector(x, y);
  this.w = w;
  this.h = h;
  this.text = val;
  this.textSize = 48;

  this.checkMousePress = function(){
    if(Math.abs(mouseX-this.pos.x)<this.w/2&&Math.abs(mouseY-this.pos.y)<this.h/2){
      return mouseIsPressed;
      this.textSize = 128;
    }else{
      this.textSize = 92;
    }
  }

  this.show = function(){
    push();
    noFill();
    stroke(255);
    rectMode(CENTER, CENTER);
    rect(this.pos.x, this.pos.y, this.w, this.h);
    pop();
    push();
    fill(255);
    textSize(this.textSize);
    textAlign(CENTER, CENTER);
    text(this.text, this.pos.x, this.pos.x)
    pop();
  }
}
