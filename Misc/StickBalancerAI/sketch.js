var gravity;
var airfriction = 0.97;
var bounce = 0.99;

var lifespan = 300;
var currentage = 0;
var maxforce = 0.7;
var gencount = 0;
var mutationrate = 0.2;

var population;

function setup(){
  createCanvas(400, 400);
  gravity = createVector(0, 0.5);
  population = new Population(100);
}

function draw(){
  background(170);
  population.run();
  currentage++;
  if(currentage==lifespan){
    population.evaluate();
    population.selection();
    currentage=0;
    gencount++;
  }
  population.players.forEach(p=>{
    var ma = 2;
    p.move(keys[37]?ma:keys[39]?-ma:0);
  });
}
