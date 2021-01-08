class DNA{
  constructor(gene){
    if(gene){
      this.gene = gene;
    }
    else{
      this.gene = random(-8, 8);
    }
  }

  crossover(partner){
    var r = random(1);
    var o = 1-r;
    return new DNA(this.gene.av*r+partner.gene.av*o);
  }

  mutation(){
    if(random(1)<mutationrate){
      this.gene = random(0, 0.05);
    }
  }
}
