var circles = [];
var img;
var p;

function preload(){
  img = loadImage("data/dog.jpg");
}

function setup(){
  createCanvas(800, 400);
  background(img);
  loadPixels();
  p  = pixels;
  updatePixels();
  var x = round(random(width));
  var y = round(random(height));
  var z = (x+y*width)*4;
  circles.push(new Circle(x, y, {r:p[z],g:p[z+1],b:p[z+2]}));
}

function draw(){
  background(0);
  for(var i=0;i<25;i++){
    var c = newC();
    if(c!=null){
      circles.push(c);
    }
  }
  circles.forEach(c=>{
    if(c.growing){
      if(c.edges()){
        c.growing = false;
      }
      else{
        circles.forEach(other=>{
          if(other!=c){
            var d = dist(c.x, c.y, other.x, other.y);
            if(d-1<c.r+other.r){
              c.growing = false;
            }
          }
        });
      }
    }
    c.show();
    c.grow();
  });
}


function newC(){
  var x = round(random(width));
  var y = round(random(height));
  var valid = true;
  circles.forEach(c=>{
    if(dist(x, y, c.x, c.y)<c.r+1){
      valid = false;
    }
  });
  if(valid){
    var z = (x+y*width)*4;
    return new Circle(x, y, {r:p[z],g:p[z+1],b:p[z+2]});
  }
  else{
    return null;
  }
}
