class Chassis{
  constructor(x, y, acc, drift){
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = acc;
    this.crashed = false;
    this.drift = drift;
    this.width = 20;
    this.height = 40;
    this.speed = 0;
    this.rot = 0;
    this.turn = 0;
  }

  update(){
    this.rot+=this.turn*this.speed/25;
    this.pos.add(this.vel);
    this.vel.mult(0.9);
    this.turn *= 0.9;
    this.speed *= 0.9;
    this.pos.x=this.pos.x<0?0:this.pos.x>width?width:this.pos.x;
    this.pos.y=this.pos.y<0?0:this.pos.y>height?height:this.pos.y;
  }

  forward(){
    this.speed+=this.acc;
    var v = p5.Vector.fromAngle(this.rot+this.turn, 0.8);
    this.vel.add(v);
  }


  backward(){
    this.speed+=this.acc;
    this.vel.x -= cos(this.rot+this.turn)*0.8;
    this.vel.y -= sin(this.rot+this.turn)*0.8;
  }

  left(){this.turn-=this.drift/100;}
  right(){this.turn+=this.drift/100;}

  boundingBox(){
    var front = p5.Vector.fromAngle(this.rot+this.turn/2,this.height/2),
        back = p5.Vector.fromAngle(this.rot+this.turn/2+Math.PI,this.height/2),
        left = p5.Vector.fromAngle(this.rot+this.turn/2-Math.PI/2,this.width/2),
        right = p5.Vector.fromAngle(this.rot+this.turn/2+Math.PI/2,this.width/2);
    var fl = p5.Vector.add(front,left).add(this.pos),
        fr = p5.Vector.add(front,right).add(this.pos),
        bl = p5.Vector.add(back,left).add(this.pos),
        br = p5.Vector.add(back,right).add(this.pos);
    return [{a:fl,b:fr},{a:fr,b:br},{a:br,b:bl},{a:bl,b:fl}];
  }

  moveTo(x, y){
    var place = createVector(x, y);
    var a = p5.Vector.sub(place, this.pos);
    var b = createVector(this.vel.x, this.vel.y);
    var cross = a.cross(b);
    this.forward();
    cross.z>0?this.left():this.right();
  }
}
