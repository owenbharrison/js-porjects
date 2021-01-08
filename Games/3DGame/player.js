class Player{
  constructor(x, y, z, renderDistance, fov){
    this.pos = createVector(x, y, z);
    this.vel = createVector(0, 0, 0);
    this.facing = createVector(0, 0, 0);
    this.renderDistance = renderDistance;
    this.fov = fov;
    this.rot = 0;
    this.speed = 4;
    this.walking = false;
    this.strafing = true;
    this.jumping = false;
    this.zooming = false;
    this.sneaking = false;
    this.sprinting = false;
  }

  update(){
    this.vel.add(GRAVITY);
    this.pos.add(this.vel);
    this.constrain();
    if(this.sneaking)this.sprinting=false;
  }

  constrain(){
    if(this.pos.y>0){
      this.pos.y = 0;
      this.vel.y = 0;
      this.jumping?this.jump():null;
    }
  }

  jump(){
    this.vel.y = -11.7;
  }

  walk(val){
    this.walking = true;
    val*=this.sneaking?0.5:1;
    val*=this.sprinting?1.5:1;
    this.pos.x+=val*this.speed*sin(this.rot);
    this.pos.z+=val*this.speed*cos(this.rot);
  }

  strafe(val){
    this.strafing = true;
    val*=this.sneaking?0.5:1;
    this.pos.x+=val*this.speed*sin(this.rot+PI/2);
    this.pos.z+=val*this.speed*cos(this.rot+PI/2);
  }

  collisionOnBox(b){
    if(this.pos.y>box.pos.y+UNIT/2){
      this.pos.y = 0;
      this.vel.y = 0;
      this.jumping?this.jump():null;
    }
  }

  updateCamera(x, y, sen){
    //cameraController
    var alpha = map(y, 0, sen, PI/2, -PI/2);
    var beta = map(x, 0, sen, 0, -PI);
    this.rot = beta;
    var dir = createVector(cos(alpha)*sin(beta), -sin(alpha), cos(alpha)*cos(beta));
    this.facing = p5.Vector.add(this.pos, dir);
  }

  showCamera(){
    var offset = UNIT-(this.sneaking*UNIT/3);
    var fov = this.fov;
    if(this.zooming){
      fov/=4;
    }
    camera(this.pos.x, this.pos.y-offset, this.pos.z, this.facing.x, this.facing.y-offset, this.facing.z, 0, 1, 0);
    perspective(fov, width/height, 0.01, this.renderDistance);
  }
}
