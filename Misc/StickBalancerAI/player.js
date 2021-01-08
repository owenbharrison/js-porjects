class Player{
  failed = false;
  timesurvived = 0;
  fitness = 0;
  angle = 0;
  constructor(x, y, len, dna){
    this.len = len;
    var intensity = 4;
    this.top = new Particle(x, y-this.len, x, y-this.len);
    this.bottom = new Particle(x-intensity, y, x-intensity, y);
    this.stick = new Stick(this.top, this.bottom, this.len);
    this.dna = dna||new DNA();
  }

  update(){
    this.top.update();
    this.bottom.update();
    for(var i=0;i<7;i++){
      this.stick.update();
      this.top.constrain();
      this.bottom.constrain();
    }
    this.angle = p5.Vector.sub(this.top.pos, this.bottom.pos).heading()+Math.PI/2;
    this.move(this.dna.gene*this.angle);
    if(!this.failed){
      this.timesurvived++;
    }
    if(Math.abs(this.angle)>Math.PI/3){
      this.failed = true;
    }
  }

  calcFitness(){
    this.fitness = this.timesurvived;
    if(this.failed){
      this.fitness /= 10;
    }
    else{
      this.fitness *= 10;
    }
    this.fitness = this.fitness**4;
  }

  move(x){
    this.bottom.pos.x+=x;
  }

  show(){
    this.top.show();
    this.bottom.show();
    this.stick.show();
  }
}
