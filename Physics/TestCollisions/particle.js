class Particle{
  constructor(x, y, radius){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.radius = radius;
    this.mda = Infinity;
    this.mdl = Infinity;
  }

  applyForce(f){
    this.acc = f.copy();
    this.vel.add(this.acc);
    this.vel.mult(0.998);
  }

  update(){
    this.mouseConstraint();
    this.applyForce(GRAVITY);
    this.pos.add(this.vel);
  }

  mouseConstraint(){
    this.mda = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if(!mouseIsPressed)this.mdl=this.mda;
    if(mouseIsPressed&&this.mdl<this.radius){
      this.applyForce(p5.Vector.sub(createVector(mouseX,mouseY),this.pos));
    }
  }

  constrain(){
    if(this.pos.x>width-this.radius){
      this.pos.x = width-this.radius;
    }
    else if(this.pos.x<this.radius){
      this.pos.x = this.radius;
    }
    if(this.pos.y>height-this.radius){
      this.pos.y = height-this.radius;
    }
    else if(this.pos.y<this.radius){
      this.pos.y = this.radius;
    }
  }

  show(){
    push();
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.radius*2);
    line(0, 0, this.vel.x*5, this.vel.y*5);
    pop();
  }

  checkCollide(particle){
    var overlap = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)-(this.radius+particle.radius);
    if(overlap<0){
      var angle = p5.Vector.sub(this.pos, particle.pos).heading();
      var vec = p5.Vector.fromAngle(angle, -overlap);
      this.applyForce(vec);
    }
  }
}
