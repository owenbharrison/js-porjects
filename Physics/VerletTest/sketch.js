var particles;
var sticks;

var controls = {beenSetup:false};

var xlen = 15;
var ylen = 15;

var gravity,
    airfriction = 0.998,
    bounce = 0.87,
    size = 15;

function setup(){
  createCanvas(400, 400).parent("#canvasContainer");
  gravity = createVector(0, 0);

  setupControls();

  particles = [];
  for(var i=0;i<xlen;i++){
    var x = map(i, 0, xlen-1, 0, width);
    for(var j=0;j<ylen;j++){
      var y = map(j, 0, ylen-1, 0, height);
      particles[i+j*xlen] = new Particle(x, y, i==0||i==xlen-1||j==0||j==ylen-1);
    }
  }

  sticks = [];
  //horizontals
  for(var y=0;y<ylen;y++){
    for(var x=0;x<xlen-1;x++){
      var myi = x+y*xlen;
      var cni = (x+1)+y*xlen;
      sticks.push(new Stick(particles[myi], particles[cni], (width/xlen)/2));
    }
  }

  //verticals
  for(var x=0;x<xlen;x++){
    for(var y=0;y<ylen-1;y++){
      var myi = x+y*xlen;
      var cni = x+(y+1)*xlen;
      sticks.push(new Stick(particles[myi], particles[cni], (height/ylen)/2));
    }
  }
}

function draw(){
  background(170);

  var w = controls.clothWidth.value();
  var h = controls.clothHeight.value();
  if(xlen!=w||ylen!=h){
    xlen = w;
    ylen = h;
    setup();
  }
  var p = controls.psize.value();
  if(size!=p){
    size = p;
  }

  particles.forEach(p=>{
    p.update();
  });
  for(var i=0;i<1;i++){
    sticks.forEach(s=>
    s.update()),
    particles.forEach(p=>
      p.constrain()
    );
  }

  if(controls.ps_render.checked()){
    sticks.forEach(s=>
      s.show()
    );
    particles.forEach(p=>
      p.show()
    );
  }
  if(controls.c_render.checked()){
    for(var y=0;y<ylen-1;y++){
      push();
      noStroke();
      beginShape(TRIANGLE_STRIP);
      for(var x=0;x<xlen;x++){
        var myi = x+y*xlen;
        var cni = x+(y+1)*xlen;
        fill((particles[myi].col+particles[cni].col)/2);
        vertex(particles[myi].pos.x, particles[myi].pos.y);
        vertex(particles[cni].pos.x, particles[cni].pos.y);
      }
      endShape();
      pop();
    }
  }
}


function setupControls(){
  if(!controls.beenSetup){
    select("#controls").position(width+10, 0);
    controls.clothWidth = createSlider(2, 20, xlen).parent("#clothWidth");
    controls.clothHeight = createSlider(2, 20, ylen).parent("#clothHeight");
    controls.psize = createSlider(2, 15, 7).parent("#particleSize");
    controls.ps_render = createCheckbox("Particle & Stick Render", true).parent("#ps_render");
    controls.c_render = createCheckbox("Cloth Render", false).parent("#c_render");
  }
  controls.beenSetup = true;
}
