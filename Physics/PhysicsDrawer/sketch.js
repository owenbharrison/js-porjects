var airfriction = 0.9995,
    bounce = 0.95,
    gravity;

var particles = [],
    sticks = [];

var stage = 0,//0[particles] 1[sticks] 2[static] 3[go]
    stageSwitch = false,
    tbc = [],//to be connected
    selected = null;

function setup(){
  createCanvas(400, 400);
  gravity = createVector(0, 1);
}

function mousePressed(){
  if(stage===0){
    particles.push(new Particle(mouseX, mouseY));
  }
  if(stage===1){
    if(tbc.length<2){
      var curr = null;
      particles.forEach(p=>{//find particle close to mouse
        if(dist(mouseX, mouseY, p.pos.x, p.pos.y)<10){
          curr = p;
        }
      });
      if(curr){tbc.push(curr);}//add to tbc list if it exists
      if(tbc.length==2){
        sticks.push(new Stick(tbc[0], tbc[1]));
        tbc = [];
      }
    }
  }
  if(stage==2){
    particles.forEach(p=>{//find particle close to mouse
      if(dist(mouseX, mouseY, p.pos.x, p.pos.y)<20){
        p.xlocked=!p.xlocked;
      }
    });
  }
  if(stage==3){
    particles.forEach(p=>{//find particle close to mouse
      if(dist(mouseX, mouseY, p.pos.x, p.pos.y)<20){
        p.ylocked=!p.ylocked;
      }
    });
  }
}

function draw(){
  push();
  fill(170, 150);
  rect(0, 0, width, height);
  pop();
  if(stage<4){
    if(keys[32]){
      stageSwitch = true;
    }
    if(!keys[32]&&stageSwitch){
      stageSwitch = false;
      stage++;
    }
    if(stage>0){
      particles.forEach(p=>{//find particle close to mouse
        if(dist(mouseX, mouseY, p.pos.x, p.pos.y)<10){
          push();
          noFill();
          stroke(0);
          circle(p.pos.x, p.pos.y, 20);
          pop();
        }
      });
    }
  }
  if(stage==4){
    particles.forEach(p=>p.update());
    for(var i=0;i<10;i++){
      sticks.forEach(s=>s.update());
      particles.forEach(p=>p.constrain());
    }
  }
  particles.forEach(p=>p.show());
  sticks.forEach(s=>s.show());
}
