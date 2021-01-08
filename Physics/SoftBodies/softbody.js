class Softbody{
  constructor(x, y, sides, radius){
    this.pos = createVector(x, y);
    this.sides = floor(sides/2)*2;//must be multiple of 2
    this.radius = radius;

    this.particles = [];
    for(var i=0;i<this.sides;i++){
      var angle = map(i, 0, this.sides, 0, Math.PI*2);
      var vp = p5.Vector.fromAngle(angle, this.radius).add(this.pos);
      this.particles[i] = new Particle(vp.x, vp.y);
    }

    this.sticks = [];
    var prev = [...this.particles].pop();//last element
    this.particles.forEach(p=>{
      this.sticks.push(new Stick(prev, p));
      prev = p;
    });
    var len = this.particles.length;
    for(var i=0;i<len/2;i++){
      this.sticks.push(new Stick(this.particles[i], this.particles[i+len/2]));
    }
  }

  update(){
    this.particles.forEach(p=>p.update());
    for(var i=0;i<4;i++){
      this.sticks.forEach(s=>
        s.update()
      ),
      this.particles.forEach(p=>
        p.constrain()
      );
    }
  }

  show(){
    this.sticks.forEach(s=>
      s.show()
    );
    this.particles.forEach(p=>
      p.show()
    );
    push();
    stroke(0, 205, 20);
    strokeWeight(3);
    fill(0, 255, 70, 100);
    beginShape();
    this.particles.forEach(p=>
      vertex(p.pos.x, p.pos.y)
    );
    endShape(CLOSE);
    pop();
  }
}
