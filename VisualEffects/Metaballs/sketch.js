var metaballs = [];
var allpoints = [];

var numgroups = 5;
var spin = 456;
var totalX = 157.0754;
var totalY = 314.15926;

var inc = 20;

function setup(){
  createCanvas(400, 400, WEBGL);
  for(var i=0;i<5;i++){
    metaballs.push(new Metaball(random(-width/2, width/2), random(-height/2, height/2)));
  }
}

function draw(){
  background(255);
  metaballs.forEach(m=>{
    m.update();
  });
  allpoints = [];
  for(let y=-height/2;y<height/2;y+=inc){
    for(let x=-width/2;x<width/2;x+=inc){
      var sum = 0;
      metaballs.forEach(m=>{
        var dist = distance(m.pos.x-x, m.pos.y-y);
        sum += 100*m.r/dist;
      });
      //sum = sum;
      if(sum>500){
        sum = 500;
      }
      allpoints.push(createVector(x, y, sum/4));
    }
  }
  for(var j=0;j<inc-1;j++){
    beginShape(TRIANGLE_STRIP);
    for(var i=0;i<inc;i++){
      var thisindex = i+j*inc;
      var nextindex = i+(j+1)*inc;
      fill(allpoints[thisindex].z*3);
      vertex(allpoints[thisindex].x, allpoints[thisindex].y, allpoints[thisindex].z);
      vertex(allpoints[nextindex].x, allpoints[nextindex].y, allpoints[nextindex].z);
    }
    endShape();
  }

  camera(spin*Math.cos(-totalY/100)*Math.cos(-totalX/100), spin*Math.sin(-totalY/100), spin*Math.cos(-totalY/100)*Math.sin(-totalX/100), 0, 0, 0, 0, 1, 0);

  totalX += mouseIsPressed ? pmouseX-mouseX : 0;
  totalY += mouseIsPressed ? pmouseY-mouseY : 0;
}

function mouseWheel(event){
  spin += event.delta/50;
}
