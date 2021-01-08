var bounce = 0.998;
var airfriction = 0.998;

var player;
var sticks = [];

var grappling = false;
var grapple = null;

var gravity;

function setup(){
  createCanvas(400, 400);
  player = new Particle(0, height/2, -10, height/2+5);
  gravity = createVector(0, 0.5);
  var inc = 2;
  for(var i=0;i<8;i++){//add x anchors
    sticks.push(new Stick(player, new Anchor(i*width, random(height/2))));
  }
}

function draw(){
  background(0);
  translate(width/2-player.pos.x, 0);
  stroke(255);
  player.constrain();
  player.update();
  if(mouseIsPressed){
    if(!grappling){
      var shortestDist = Infinity;
      sticks.forEach(s=>{//set closeset anchor
        var d = s.getDist();
        if(d<shortestDist){//if closer
          shortestDist = d;
          grapple = s;
        }
      });
      grapple.len = grapple.getDist()-15;//make shorter
      grappling = true;
    }else{
      grapple.update();
      grapple.show();
    }
  }
  else{
    grappling = false;
  }
  sticks.forEach(s=>{//show every anchor
    if(s==grapple&&mouseIsPressed){
      s.a.highlight();
    }
    s.a.show();
  });
  player.show();
}
