function Asteroid(pos, r){
  this.pos = pos?pos.copy():(random(1)>0.5)?createVector(random(width), round(random(1))*height):this.pos = createVector(round(random(1))*width, random(height));
  this.vel = p5.Vector.random2D();
  this.r = r?r:random(35, 50);
  this.total = floor(random(5, 15));
  this.offset = [];
  for(var i=0;i<this.total;i++){
    this.offset[i] = random(-this.r/2, this.r/2);
  }

  this.update = function(){
    this.pos.add(this.vel);
    this.edges();
  }

  this.render = function(){
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    beginShape();
    for(var i=0;i<this.total;i++){
      var angle = (map(i, 0, this.total, 0, Math.PI*2));
      var pos = p5.Vector.fromAngle(angle, this.r+this.offset[i]);
      vertex(pos.x, pos.y);
    }
    endShape(CLOSE);
    pop();
  }

  this.break = function(){
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r/1.3);
    newA[1] = new Asteroid(this.pos, this.r/1.3);
    return newA;
  }

  this.boundLines = function(){
    var lines = [];
    var prev = null;
    for(var i=0;i<this.total;i++){
      var angle = (map(i, 0, this.total, 0, Math.PI*2));
      var current = p5.Vector.fromAngle(angle, this.r+this.offset[i]).add(this.pos);
      if(prev!=null){
        lines.push({b0: prev, b1: current});
      }
      prev = current;
    }
    lines.push({b0: lines[0].b0, b1: lines[lines.length-1].b1});
    return lines;
  }

  this.edges = function(){
    this.pos.x=(this.pos.x)<0?width-1:(this.pos.x>width)?0:this.pos.x;
    this.pos.y=(this.pos.y)<0?height-1:(this.pos.y>height)?0:this.pos.y;
  }
}
