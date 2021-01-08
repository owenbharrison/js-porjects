var dots = [];

let slider;

function setup(){
  createCanvas(400, 400);
  slider = createSlider(2, 30, 6, 0.1).position(20, 20);
  dots = textToDots("[insert cool\neffect here]", width/2, height/2, 80);
  dots = reduceArr(dots, 5);
  dots = sortByClosest(dots);
}

function draw(){
  background(0);
  push();
  stroke(255);
  strokeWeight(3);
  noFill();
  beginShape();
  var a = frameCount;
  var intensity = slider.value();
  dots.forEach(d=>{
    vertex(d.x+noise(a/50)*intensity-intensity/2, d.y+noise(a/50+10000)*intensity-intensity/2);
    a++;
  });
  endShape();
  pop();
}

dots = sortByClosest(dots);

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
