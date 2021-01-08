class RigidBody{
  constructor(xorarr, yorfillstyle, radius, sides, size, fillstyle){
    if(Array.isArray(xorarr)){//for 2 argument constructor as particles and fillstyle
      this.particles = [];
      var avx=0;
      var avy=0;
      var ps=[];
      for(var v of xorarr){
        ps.push(new Particle(v.x,v.y));
        avx+=v.x;
        avy+=v.y;
      }
      this.particles = [new Particle(avx/ps.length, avy/ps.length)].concat(ps);
      this.fillstyle = yorfillstyle;
    }
    else if(typeof xorarr == "number"){//for all arguments constructor
      this.pos = createVector(xorarr, yorfillstyle);
      this.radius = radius;
      this.sides = sides;
      this.size = size;
      this.fillstyle = fillstyle;

      this.particles = [new Particle(this.pos.x, this.pos.y)];
      for(var i=0;i<this.sides;i++){
        var angle = map(i, 0, this.sides, 0, Math.PI*2);
        var len = this.radius+random(-this.size, this.size);
        var vec = p5.Vector.fromAngle(angle, len).add(this.pos);
        this.particles.push(new Particle(vec.x, vec.y));
      }
    }

    this.sticks = [];
    for(var i=2;i<this.particles.length;i++){
      var curr = this.particles[i];
      this.sticks.push(new Stick(this.particles[i], this.particles[i-1]));
    }
    this.sticks.push(new Stick(this.particles[1], this.particles[this.particles.length-1]))
    for(var i=1;i<this.particles.length;i++){
      this.sticks.push(new Stick(this.particles[0], this.particles[i]));
    }
  }

  update(){
    this.particles.forEach(p=>p.update());
    for(var i=0;i<250;i++){
      this.sticks.forEach(s=>s.update());
      this.particles.forEach(p=>p.constrain());
    }
  }

  show(){
    if(this.fillstyle){
      push();
      fill(20, 255, 90);
      stroke(5, 200, 50);
      strokeWeight(3);
      beginShape();for(var i=1;i<this.particles.length;i++){
        var p=this.particles[i];
        vertex(p.pos.x,p.pos.y);
      }
      endShape(CLOSE);
      pop();
    }
    else{
      this.particles.forEach(p=>p.show());
      this.sticks.forEach(s=>s.show());
    }
  }
}
