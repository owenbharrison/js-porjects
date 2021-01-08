class Cop{
  constructor(x, y){
    this.chassis = new Chassis(x, y, 0.1, 14);
  }

  update(){
    this.chassis.update();
  }

  show(){
    push();
    translate(this.chassis.pos.x, this.chassis.pos.y);
    rotate(this.chassis.rot+Math.PI+this.chassis.turn/1.5);
    imageMode(CENTER, CENTER);
    image(copImg, 0, 0, 47, 26);
    pop();
  }
}
