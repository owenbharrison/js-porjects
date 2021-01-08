var vehicles = [];

function setup(){
  createCanvas(600, 300);
  var ps = textToDots("[insert cool\neffect here]", width/2, height/2, 92);
  for(var i=0;i<ps.length;i+=8){
    vehicles.push(new Vehicle(ps[i].x, ps[i].y));
  }
}

function draw(){
  background(255);
  vehicles.forEach(v=>{
    v.behaviors();
    v.update();
    v.show();
  });
}
