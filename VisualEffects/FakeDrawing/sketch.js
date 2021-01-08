var car1, car2, car3, pen;

var dots = [];
var count = 0;
var chosencar;

function preload(){
  taxi = loadImage('data/taxi.png');
  bluecar = loadImage('data/bluecar.png');
  redcar = loadImage('data/redcar.png');
  pen = loadImage('data/pen-in-hand.png');
}

function setup(){
  createCanvas(400, 400);
  var start = Date.now();
  chosencar = bluecar;
  dots = imageToDots(chosencar, 0, 0, width, height);
  dots = reduceArr(dots, 5);
  dots = sortByClosest(dots);
  console.log("Time Elapsed:\n"+(Date.now()-start));
}

function draw(){
  background(0);
  push();
  noFill();
  stroke(255);
  beginShape();
  for(var i=0;i<count;i++){
    var dot = dots[i];
    vertex(dot.x, dot.y);
  }
  endShape();
  pop();
  var w = width*0.55;
  var h = height*0.55;
  image(pen, dots[count].x, dots[count].y-h/3.5, w, h);
  count++;
  if(count>dots.length-1){
    noLoop();
    background(0);
    image(chosencar, 0, 0, height, width);
  }
}

function sortByClosest(a){
  var arr = [...a];
  var sorted = [arr[0]];
  while(sorted.length<arr.length){
    var main = sorted[sorted.length-1];
    var shortestDist = Infinity;
    var closestDot = null;
    for(var i=0;i<arr.length;i++){
      var check = arr[i];
      if(!sorted.includes(check)){
        var d = dist(main.x, main.y, check.x, check.y);
        if(d<shortestDist){
          shortestDist = d;
          closestDot = check;
        }
      }
    }
    sorted.push(closestDot);
  }
  return sorted;
}


function reduceArr(a, x){
  var arr = [];
  for(var i=0;i<a.length;i+=x){
    arr.push(a[i]);
  }
  return arr;
}
