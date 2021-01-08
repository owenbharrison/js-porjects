var keyboardImg;
var keys = [];
var keysJSON;
var scl = 2;
var list = [];
var inc = 10;

function preload(){
  keyboardImg = loadImage('data/pc-keyboard.jpg');
  keysJSON = loadJSON('data/keys.json');
}

function setup(){
  createCanvas(keyboardImg.width*2/3*scl, keyboardImg.height*2/3*scl);
  for(var i in keysJSON){
    keys[i] = new Key(keysJSON[i].pos.x*scl, keysJSON[i].pos.y*scl, keysJSON[i].sz*scl, keysJSON[i].letter);
  }
}

function draw(){
  background(keyboardImg);
  keys.forEach(k=>k.update());
  keys.forEach(k=>k.show());
  var mv = createVector(mouseX, mouseY);
  if(mouseIsPressed){
    list.push(mv.copy());
  }
  for(var i=0;i<list.length;i++){
    let l = list[i];
    push();
    noStroke();
    circle(l.x, l.y, 5);
    pop();
  }
  for(var i=0;i<list.length;i++){
    let l = list[i];
    push();
    stroke(255, 0, 0);
    let both = 0;
    if(i-inc>=0){
      line(l.x, l.y, list[i-inc].x, list[i-inc].y);
      both++;
    }
    if(i+inc<=list.length-1){
      line(l.x, l.y, list[i+inc].x, list[i+inc].y);
      both++;
    }
    if(both==2){
      circle(l.x, l.y, 20);
    }
    pop();
  }
}

function mouseWheel(event){
  inc += event.delta/abs(event.delta);
  inc=inc<1?1:inc;
}
