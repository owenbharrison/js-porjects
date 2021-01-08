var ship;
var asteroids = [];
var lasers = [];

var score = 0;

var spacepressed = false;

var stage = 0;

function setup(){
  createCanvas(windowWidth-20, windowHeight-20);
  ship = new Ship();
  asteroids.push(new Asteroid());
}

function draw(){
  background(0);
  stroke(4);

  //onkeydown
  if(keys[32]&&!spacepressed){
    spacepressed = true;
    lasers.push(new Laser(ship.pos, ship.heading));
  }
  if(!keys[32]&&spacepressed){
    spacepressed = false;
  }

  asteroids.forEach(a=>{
    a.render();
    a.update();
  });

  for(var i=lasers.length-1;i>=0;i--){
    lasers[i].render();
    lasers[i].update();
    for(var j=asteroids.length-1;j>=0;j--){
      if(lasers[i].hits(asteroids[j])){
        var newAsteroids = asteroids[j].break();
        if(asteroids[j].r>20){
          asteroids = asteroids.concat(newAsteroids);
          score+=4;
        }
        else{
          score+=24;
        }
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }
  }
  for(var i=lasers.length-1;i>=0;i--){
    if(lasers[i].isOffscreen()){
      lasers.splice(i, 1)
    }
  }
  if(frameCount%48==0){
    score+=2;
  }
  ship.update();
  if(ship.checkCollisions()){
    push();
    textAlign(CENTER, CENTER);
    textSize(96);
    stroke(255);
    strokeWeight(0.5);
    noFill();
    text("you are die", width/2, height/2);
    pop();
    noLoop();
  }

  keys[37]?ship.turn(-0.1):keys[39]?ship.turn(0.1):null;
  keys[38]?ship.boost():null;

  ship.render();

  push();
  fill(255);
  text("stage "+stage, 4, height-16);
  text("score: "+score, 4, height-6);
  pop();
  if(asteroids.length==0&&stage==0){
    stage++;
    for(var i=0;i<3;i++){
      asteroids.push(new Asteroid());
    }
  }
  if(asteroids.length==0&&stage==1){
    stage++;
    for(var i=0;i<5;i++){
      asteroids.push(new Asteroid());
    }
  }
  if(asteroids.length==0&&stage==2){
    stage++;
    for(var i=0;i<7;i++){
      asteroids.push(new Asteroid());
    }
  }
  if(asteroids.length==0&&stage==3){
    stage++;
    for(var i=0;i<10;i++){
      asteroids.push(new Asteroid());
    }
  }
  if(asteroids.length==0&&stage==4){
    push();
    textAlign(CENTER, CENTER);
    textSize(96);
    stroke(255);
    strokeWeight(0.5);
    noFill();
    text("You Win!", width/2, height/2);
    pop();
  }
}
