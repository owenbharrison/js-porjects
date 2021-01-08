var points = [];
var index = 0;
var size = 100;

var play = true;
var col = {r:255,g:255,b:255};


function setup(){
  createCanvas(400, 400);
  if(play){
    for(var i=0;i<50;i++){
      points.push(createVector(random(width), random(height)));
    }
  }
  else{
    for(var x=0;x<width;x+=size/3){
      for(var y=0;y<height;y+=size/3){
        points.push(createVector(x+random(size/4), y+random(size/4)));
      }
    }
  }
}

function mousePressed(){index++;}

function draw(){
  background(255);
  if(index==points.length){index=0;}
  var mv = createVector(mouseX, mouseY);
  if(play){
    points[index] = mv;
  }
  for(var i=size;i>=0;i--){
    points.forEach(p=>{
      push();
      noStroke();
      var amt = map(i, size, 0, 255, 0);
      fill(amt*col.r/255, amt*col.g/255, amt*col.b/255);
      ellipse(p.x,p.y,i);
      pop();
    });
  }
  if(!play){
    noLoop();
  }
}
