function Ship(){
  this.pos = createVector(width/2, height/2);
  this.vel = createVector();
  this.acc = createVector();
  this.r = 10;
  this.heading = 0;
  this.particles = [];

  this.update = function(){
    this.pos.add(this.vel);
    this.vel.mult(0.98);
    this.edges();
    for(i=this.particles.length-1;i>=0;i--){
      var p = this.particles[i];
      p.update();
      p.show();
      if(p.finished()){
        this.particles.splice(i, 1)
      }
    }
  }

  this.boost = function(){
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.3);
    this.vel.add(force);
    this.particles.push(new Particle(p5.Vector.add(this.pos, p5.Vector.fromAngle(this.heading+Math.PI, 5)), this.heading+Math.PI));
  }

  this.render = function(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    fill(0);
    stroke(255);
    triangle(-this.r, -this.r, -this.r, this.r, this.r*1.2, 0);
    pop();
  }

  this.edges = function(){
    this.pos.x=(this.pos.x)<0?width-1:(this.pos.x>width)?0:this.pos.x;
    this.pos.y=(this.pos.y)<0?height-1:(this.pos.y>height)?0:this.pos.y;
  }

  this.hits = function(asteroid){
    var res = false;
    this.boundLines().forEach(tbl=>{
      asteroid.boundLines().forEach(abl=>{
        if(intersects(tbl.b0, tbl.b1, abl.b0, abl.b1)){
          res = true;
        }
      });
    });
    return res;
  }

  this.checkCollisions = function(){
    var res = false;
    asteroids.forEach(a=>{
      if(this.hits(a)){
        res = true;
      }
    });
    return res;
  }

  this.boundLines = function(){
    var back = p5.Vector.fromAngle(this.heading, -this.r*1.2).add(this.pos);//back
    var p1 = p5.Vector.fromAngle(this.heading, this.r*1.2).add(this.pos);//front
    var p2 = p5.Vector.fromAngle(this.heading+Math.PI/2, this.r).add(back);//backleft
    var p3 = p5.Vector.fromAngle(this.heading-Math.PI/2, this.r).add(back);//backright
    return [{b0: p1, b1: p2}, {b0: p2, b1: p3}, {b0: p3, b1: p1}];
  }

  this.turn = function(angle){
    this.heading += angle;
  }
}
