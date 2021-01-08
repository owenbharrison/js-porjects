class Balloon extends Particle{
  constructor(x, y){
    super(x, y);
    this.size = 100;
  }

  update(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(airfriction);
    this.oldpos = this.pos.copy();
    if(!this.locked){
      this.pos.add(v);
      var float = gravity.copy().mult(-4.3);
      this.pos.add(float);
    }
    this.mouseConstraint();
  }

  show(){
    push();
    //stroke(55, 145, 123);
    //fill(103, 245, 209);
    //strokeWeight(3);
    //ellipse(this.pos.x, this.pos.y, this.size);
    imageMode(CENTER, CENTER);
    image(balloonImg, this.pos.x, this.pos.y, this.size, this.size);
    pop();
  }
}

class Anchor extends Particle{
  constructor(x, y){
    super(x, y);
    this.size = 32;
  }

  update(){
    var v=p5.Vector.sub(this.pos, this.oldpos).mult(airfriction);
    this.oldpos = this.pos.copy();
    if(!this.locked){
      this.pos.add(v);
      var float = gravity.copy().mult(4);
      this.pos.add(float);
    }
    this.mouseConstraint();
  }

  show(){
    push();
    //stroke(52, 25, 82);
    //fill(86, 43, 135);
    //strokeWeight(3);
    //ellipse(this.pos.x, this.pos.y, this.size);
    imageMode(CENTER, CENTER);
    image(anchorImg, this.pos.x, this.pos.y, this.size, this.size);
    pop();
  }
}
