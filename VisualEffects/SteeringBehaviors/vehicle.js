function Vehicle(x, y){
  this.pos = createVector(random(width), random(height));
  this.vel = createVector();
  this.acc = createVector();
  this.target = createVector(x, y);
  this.r = 8;
  this.maxspeed = 10;
  this.maxforce = 1;
  this.col = [x/(width/255), 0, y/(height/255)];

  this.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  this.flee = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if(d<50){
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    }
    else{
      return createVector();
    }
  }

  this.arrive = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if(d<100){
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  this.behaviors = function(){
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    arrive.mult(2);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.show = function(){
    stroke(this.col[0], this.col[1], this.col[2]);
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
  }
}
