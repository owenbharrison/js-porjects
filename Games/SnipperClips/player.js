class Player{
  constructor(x, y, keyCodes, col){
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.speed = 0.25;
    this.rot = 0;
    this.rs = 0.04;
    this.keyCodes = keyCodes;
    this.col = col;
    this.size = 10;
    this.pixels = [];
    for(var x=-this.size/2;x<=this.size/2;x++){
      for(var y=-this.size/2;y<=this.size;y++){
        this.pixels.push(new Pixel(x, y, this));
      }
    }
  }

  checkIntersect(player){
    var overlappingPixels = [];
    for(var i=0;i<this.pixels.length;i++){
      var pixel = this.pixels[i];
      var checkPixel = pixel.realPosition();
      if(player.pixels.map(p=>p.realPosition()).includes(checkPixel)){
        overlappingPixels.push(pixel);
      }
    }
    loadPixels();
    overlappingPixels.forEach(o=>{
      var z = (o.pos.x+o.pos.y*width)*4;
      pixels[z] = 0;
      pixels[z+1] = 0;
      pixels[z+2] = 0;
      pixels[z+3] = 255;
    });
    updatePixels();
  }

  update(){
    this.pos.add(this.vel);
    this.vel.x*=0.9;
    this.vel.y*=0.95;
    if(this.checkGround()){
      this.pos.add(this.vel);
      this.vel.y = 0;
      while(this.checkGround()){
        this.pos.y-=1;
      }
      keys[this.keyCodes.j]?this.jump():null;
    }
    else{
      this.applyForce(gravity);
    }
    this.turn(keys[this.keyCodes.tl]?-this.rs:keys[this.keyCodes.tr]?this.rs:0);
    this.applyForce(createVector(keys[this.keyCodes.ml]?-this.speed:keys[this.keyCodes.mr]?this.speed:0, 0));
  }

  checkGround(){
    var touch = false;
    var prev = null;
    ground.forEach(gp=>{
      if(prev!=null&&!touch){
        touch = pointlineintersect(prev, gp, createVector(this.pos.x, this.pos.y+this.size), 20);
      }
      prev = gp;
    });
    return touch;
  }

  jump(){
    this.applyForce(createVector(0, -6));
  }

  turn(r){
    this.rot += r;
  }

  show(){
    circle(this.pos.x, this.pos.y, 5);
    this.pixels.forEach(p=>{
      p.show();
    });
  }

  applyForce(force){
    this.acc = force;
    this.vel.add(this.acc);
  }
}

class Pixel{
  constructor(x, y, parent){
    this.pos = createVector(x, y);
    this.parent = parent;
  }

  realPosition(){
    var v = p5.Vector.fromAngle(this.parent.rot+this.pos.heading(), this.pos.mag()).add(this.parent.pos);
    return {x: round(v.x), y:round(v.y)};
  }

  show(){
    var v = this.realPosition();
    push();
    stroke(this.parent.col.r, this.parent.col.g, this.parent.col.b);
    point(v.x, v.y);
    pop();
  }
}

function pointlineintersect(a,b,p,s){
  var r=false;
  var θ=p5.Vector.sub(b,a).heading();
  for(var i=0;i<dist(a.x,a.y,b.x,b.y);i++){
    var v=p5.Vector.fromAngle(θ,i).add(a);
    if(dist(v.x,v.y,p.x,p.y)<s/2){r=true;}
  }
  return r;
}
