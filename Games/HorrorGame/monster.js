function Monster(x, y, victim){
  this.pos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  this.victim = victim;
  this.victim.monster = this;
  this.speed = this.victim.speed/2;
  this.rot = 0;
  this.rotspeed = 0.05;
  this.glitchchance = 0.1;
  this.killMode = false;

  this.update = function(){
    this.pos.add(this.vel);
    this.vel.mult(0.9);
    if(this.victimVulnerable()||this.killMode){
      this.moveTowardVictim();
    }
    if(random(0,1)>(1-this.glitchchance)){
      this.glitch();
    }
    this.checkCollision();
  }

  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    fill(255, 35, 0);//evil
    circle(0, 0, 15);
    pop();
  }

  this.checkWalls = function() {
    this.pos.x=this.pos.x<0?0:this.pos.x>width?width:this.pos.x;
    this.pos.y=this.pos.y<0?0:this.pos.y>height?height:this.pos.y;
  }

  this.moveTowardVictim = function(){
    var a = p5.Vector.sub(this.victim.pos.copy(), this.pos);
    var b = createVector(this.vel.x, this.vel.y);
    var cross = a.cross(b);//left or right of me?

    var arrive = map(dist(this.pos.x, this.pos.y, this.victim.pos.x, this.victim.pos.y), 0, width, 0.5, 1.5);
    this.applyForce(p5.Vector.fromAngle(this.rot, this.speed+random(-0.05, 0.05)).mult(this.victimVulnerable()?arrive:1));

    this.rot += (cross.z>0?-this.rotspeed:this.rotspeed);//turn towards where they are
  }

  this.checkCollision = function(){
    var d = dist(this.pos.x, this.pos.y, this.victim.pos.x, this.victim.pos.y);
    if(d<30&&!this.killMode){
      this.killMode = true;
      this.speed*=3.35;//make it faster
      this.rs*=35;//make it better at turning and make it spawn ahead of you
      this.pos = p5.Vector.fromAngle(player.rot+random(-Math.PI/4, Math.PI/4), width/2).add(player.pos);
    }
    if(d<13&&this.killMode){//if too close ya get ded :/
      this.jumpscare();
    }
  }

  this.victimVulnerable = function(){//too far or looking away from me?
    var vr = p5.Vector.fromAngle(this.victim.rot,1).heading();
    var mr = p5.Vector.sub(this.victim.pos, this.pos).heading();
    return (Math.abs(vr-mr)<Math.PI/3.25||dist(this.pos.x, this.pos.y, this.victim.pos.x, this.victim.pos.y)>width/3);
  }

  this.glitch = function(){
    var mp = random(1, 2);
    var turn = random(0, Math.PI*2);//random direction
    this.pos.add(p5.Vector.fromAngle(turn, mp));
  }

  this.applyForce = function(force){
    this.acc = force.copy();
    this.vel.add(this.acc);
  }

  this.jumpscare = function(){//nice >:)
    backgroundMusic.stop();
    if(random(1)>0.5){
      monsterScream1.play();
    }else{
      monsterScream2.play();
    }
    noLoop();
  }
}
