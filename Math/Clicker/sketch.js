var dot;
var startTime;
var times = [];

function setup(){
  createCanvas(400, 400);
  dot  = createVector(random(width), random(height));
}

function mousePressed(){
  if(dist(dot.x, dot.y, mouseX, mouseY)<15){
    dot  = createVector(random(width), random(height));
    if(!startTime){startTime=Date.now();}
    var rt = (Date.now()-startTime)/1000;
    times.push(rt);
    if(times.length==11){
      times.shift();
    }
    var sum=times.reduce((a,c)=>a+c);

    console.log("Reaction Time:"+sum/times.length);
    startTime = Date.now();
  }
}

function draw(){
  background(0);
  circle(dot.x, dot.y, 30);
  if(startTime){
    push();
    stroke(255);
    fill(255);
    textAlign(CENTER, CENTER);
    pop();
  }
}
