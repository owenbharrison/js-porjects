function Metaball(x, y){
  this.pos = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.vel.mult(3);
  this.r = 75;

  this.update = function(){
    this.pos.x+=this.vel.x;
    this.pos.y+=this.vel.y;
    if(this.pos.x<-width/2||this.pos.x>width/2){
      this.vel.x*=-1;
    }
    if(this.pos.y<-height/2||this.pos.y>height/2){
      this.vel.y*=-1;
    }
  }
}
