var pinkPlayer;
var yellowPlayer;
var ground = [];
var gravity;

function setup(){
  createCanvas(400, 400);
  gravity = createVector(0, 0.5);
  for(i=-width*2;i<=width*3;i+=2){
    ground.push(createVector(i, noise(i/200)*height/4+height/2));
  }
  pinkPlayer = new Player(200, 100.1, {j: 87, ml: 65, mr: 68, tl: 81, tr: 69, s: 83}, {r:242,g:0,b:182});
  yellowPlayer = new Player(200, 100.1, {j: 73, ml: 74, mr: 76, tl: 85, tr: 79, s: 75}, {r:252,g:244,b:3});
}

function draw(){
  background(170);
  pinkPlayer.update();
  pinkPlayer.show();
  yellowPlayer.update();
  yellowPlayer.show();
  yellowPlayer.checkIntersect(pinkPlayer);
  detectintersect(pinkPlayer, yellowPlayer);
  //push();
  //noStroke();
  //fill(0, 224, 172);
  //beginShape();
  //res.forEach(r=>{
    //vertex(r.x, r.y);
  //});
  //endShape();
  //pop();
  push();
  fill(145, 76, 0);
  strokeWeight(4);
  stroke(0, 255, 70);
  beginShape();
  ground.forEach(p=>{
    vertex(p.x, p.y);
  });
  vertex(width*3, height+50);
  vertex(-width*2, height+50);
  endShape(CLOSE);
  pop();
}

function Ground(arr){
  this.points = arr;
}
