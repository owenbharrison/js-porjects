var puck;
var player;
var opponent;

let clack;

var player_ai = false;
var opponent_ai = true;

var gameSpeed = 1;

function preload(){
  clack = loadSound('data/clack.wav');
}

function setup(){
  createCanvas(550, 400);
  puck = new Puck(width/2, height/2, 8);
  player = new Paddle(width-20, height/2, 15, 55);
  opponent = new Paddle(20, height/2, 15, 55);
}

function draw(){
  background(0);
  //draw middle dotted line
  var sz = 12;
  for(var y=sz/3;y<=height;y+=sz){
    push();
    rectMode(CENTER, CENTER);
    noStroke();
    fill(255);
    rect(width/2, y, sz/3, sz/2);
    pop();
  }

  for(var i=0;i<gameSpeed;i++){
    puck.update();
    puck.show();

    //player movement
    if(player_ai){//ai movement
      if(puck.pos.y>player.pos.y){player.pos.y+=player.speed;}
      else if(puck.pos.y<player.pos.y){player.pos.y-=player.speed;}
    }
    else{//manual movement
      player.pos.y+=keys[40]||keys[39]?player.speed:keys[38]||keys[37]?-player.speed:0
    }
    var p = player;
    player.pos.y=(p.pos.y<p.h/2)?p.h/2:(p.pos.y>height-p.h/2)?height-p.h/2:p.pos.y;

    //opponent movement
    if(opponent_ai){//ai movement
      if(puck.pos.y>opponent.pos.y){opponent.pos.y+=opponent.speed;}
      else if(puck.pos.y<opponent.pos.y){opponent.pos.y-=opponent.speed;}
    }
    else{//manual movement
      opponent.pos.y+=keys[83]||keys[68]?opponent.speed:keys[87]||keys[65]?-opponent.speed:0;
    }
    var o = opponent;
    opponent.pos.y=(o.pos.y<o.h/2)?o.h/2:(o.pos.y>height-o.h/2)?height-o.h/2:o.pos.y;

    //scoring
    if(puck.pos.x<0){
      puck = new Puck(width/2, height/2, puck.size);
      player.score++;
      player.pos.y = height/2;
      opponent.pos.y = height/2;
    }
    if(puck.pos.x>width){
      puck = new Puck(width/2, height/2, puck.size);
      opponent.score++;
      player.pos.y = height/2;
      opponent.pos.y = height/2;
    }

    //puck collision
    if(player.contains(puck.pos.x, puck.pos.y)){
      var dir = map(puck.pos.y-player.pos.y, -player.h/2, player.h/2, -Math.PI/2, Math.PI/2);
      puck.vel =  p5.Vector.fromAngle(Math.PI+dir, puck.speed);
      clack.play();
    }
    if(opponent.contains(puck.pos.x, puck.pos.y)){
      var dir = map(puck.pos.y-opponent.pos.y, -opponent.h/2, opponent.h/2, -Math.PI/2, Math.PI/2);
      puck.vel =  p5.Vector.fromAngle(dir, puck.speed);
      clack.play();
    }
  }
  player.show();
  opponent.show();
  pixelize(2);
}

//retro style
function pixelize(intensity){
  loadPixels();
  for(var x=0;x<width;x+=intensity){
    for(var y=0;y<height;y+=intensity){
      var index = (x+y*width)*4;
      var r = pixels[index];
      var g = pixels[index+1];
      var b = pixels[index+2];
      for(var x_=0;x_<intensity;x_++){
        for(var y_=0;y_<intensity;y_++){
          var rx = x+x_;
          var ry = y+y_;
          var rindex = (rx+ry*width)*4;
          pixels[rindex] = r;
          pixels[rindex+1] = g;
          pixels[rindex+2] = b;
        }
      }
    }
  }
  updatePixels();
}
