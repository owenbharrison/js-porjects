class Player{
  constructor(x, y){
    this.chassis = new Chassis(x, y, 0.15, 12);
  }

  update(){
    this.chassis.update();
    keys[32]||keys[38]?this.chassis.forward():keys[40]?this.chassis.backward():null;
    keys[37]?this.chassis.left():keys[39]?this.chassis.right():null;
    cops.forEach(cop=>{
      var collide = this.checkCollision(cop);
      if(collide){
        push();
        textAlign(CENTER, CENTER);
        textSize(96);
        stroke(255);
        strokeWeight(0.5);
        noFill();
        text("you are jail", width/2, height/2);
        pop();
        noLoop();
      }
    });
  }

  checkCollision(other){
    this.chassis.boundingBox().forEach(bl=>{
      other.chassis.boundingBox().forEach(ol=>{
        var ip = intersectpoint(bl.a, bl.b, ol.a, ol.b);
        if(ip){
          return true;
        }
      });
    });
    return false;
  }

  show(){
    push();
    translate(this.chassis.pos.x, this.chassis.pos.y);
    rotate(this.chassis.rot+this.chassis.turn/1.5);
    imageMode(CENTER, CENTER);
    image(playerImg, 0, 0, 36, 18);
    pop();
  }
}
