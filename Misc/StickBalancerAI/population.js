class Population{
  pos = createVector(200, 200);
  len = 100;
  matingpool = [];
  players = [];
  constructor(popsize){
    this.popsize = popsize;
    for(var i=0;i<this.popsize;i++){
      this.players[i] = new Player(this.pos.x, this.pos.y, this.len);
    }
  }

  evaluate(){
    var maxfit = 0;
    for(let i=0;i<this.players.length;i++){
      this.players[i].calcFitness();
      if(this.players[i].fitness > maxfit){
        maxfit = this.players[i].fitness;
      }
    }

    this.players.forEach(p=>{
      p.fitness /= maxfit;
    });

    this.matingpool = [];
    this.players.forEach(p=>{
      var n = p.fitness*100;
      for(let j=0;j<n;j++){
        this.matingpool.push(p);
      }
    });
  }

  selection(){
    var newPlayers = [];
    for(let i=0;i<this.players.length;i++){
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var childDNA = parentA.crossover(parentB);
      childDNA.mutation();
      newPlayers[i] = new Player(this.pos.x, this.pos.y, this.len, childDNA);
    }
    this.players = newPlayers;
  }

  run(){
    this.players.forEach(p=>{
      p.update();
      p.show();
    });
  }
}
