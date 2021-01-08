class Ship{
  constructor(data){
    if(data.hasOwnProperty("pos")){
      this.info = data.info;
      this.pos = createVector(data.pos.x, data.pos.y);
      this.vel = createVector(data.vel.x, data.vel.y);
      this.size = data.size;
      this.rot = data.rot;
      this.flames = [];
      data.flames.forEach(fd=>{
        var f = new Flame(fd);
        f.col = this.info.col;
        this.flames.push(f);
      });
      this.lasers = [];
      data.lasers.forEach(ld=>{
        var l = new Laser(ld);
        l.col = this.info.col;
        this.lasers.push(l);
      });
      this.score = data.score;
      this.spacepressed = data.spacepressed;
    }else if(data.hasOwnProperty("message")){
      this.info = data;
      this.pos = createVector(600/2, 600/2);
      this.vel = createVector();
      this.size = 10;
      this.rot = 0;
      this.flames = [new Flame({pos:{x:1e4,y:1e4},vel:{x:0,y:0},alpha:255})];
      this.lasers = [new Laser({pos:{x:1e4,y:1e4},vel:{x:0,y:0}})];
      this.score = 0;
      this.spacepressed = false;
    }
  }

  update(){
    this.pos.add(this.vel);
    this.vel.mult(0.98);
    this.checkEdgeOverlap();
    this.checkFlames();
  }

  checkLasers(asteroids){
    [...this.lasers].forEach(las=>{
      las.update();
      [...asteroids].forEach(ast=>{
        if(las.hits(ast)){
          if(ast.radius>20){
            for(var i=0;i<2;i++){asteroids.push(new Asteroid(ast.pos, ast.radius/1.8));}
            this.score+=6;
          }
          else{
            this.score+=18;
          }
          asteroids.splice(asteroids.indexOf(ast), 1);
          this.lasers.splice(this.lasers.indexOf(las), 1);
        }
      });
      this.lasers.splice(this.lasers.indexOf(las), las.isOffscreen());
    });
    if(this.lasers.length==0){
      this.lasers[0] = new Laser({pos:{x:10000,y:10000},vel:{x:0,y:0}});
    }
    if(asteroids.length==0){
      asteroids[0] = new Asteroid({pos:{x:10000,y:10000},vel:{x:0,y:0},radius:5,sides:5,offset:[0,0,0,0,0]});
    }
  }

  checkFlames(){
    this.flames.forEach(flame=>{
      flame.update();
      this.flames.splice(this.flames.indexOf(flame), flame.finished()&&this.flames.length>1);
    });
    [...this.flames].forEach(f=>this.flames.splice(this.flames.indexOf(f), f.finished()&&this.flames.length>1))
  }

  boost(){
    this.vel.add(p5.Vector.fromAngle(this.rot, 0.3));
    for(var i=0;i<3;i++){
      this.flames.push(new Flame(p5.Vector.add(this.pos, p5.Vector.fromAngle(this.rot+Math.PI, 5)), this.rot+Math.PI));
    }
  }

  shoot(){
    this.lasers.push(new Laser(this.pos, this.rot));
  }

  show(){
    this.flames.forEach(f=>f.show());
    this.lasers.forEach(l=>l.show());
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    fill(0);
    strokeWeight(2);
    stroke(this.info.col.r, this.info.col.g, this.info.col.b);
    triangle(-this.size, -this.size, -this.size, this.size, this.size*1.2, 0);
    pop();
    push();
    fill(this.info.col.r, this.info.col.g, this.info.col.b);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(this.info.name+":\n"+this.info.message, this.pos.x, this.pos.y+25);
    pop();
  }

  checkEdgeOverlap(){
    this.pos.x=(this.pos.x)<0?600-1:(this.pos.x>600)?0:this.pos.x;
    this.pos.y=(this.pos.y)<0?600-1:(this.pos.y>600)?0:this.pos.y;
  }

  collides(asteroid){
    this.boundLines().forEach(tbl=>{
      asteroid.boundLines().forEach(abl=>{
        if(intersects(tbl.b0, tbl.b1, abl.b0, abl.b1)){
          return true;
        }
      });
    });
    return false;
  }

  checkCollisions(asteroids){
    asteroids.forEach(ast=>{
      if(this.collides(ast)){
        return true;
      }
    });
    return false;
  }

  boundLines(){
    var back = p5.Vector.fromAngle(this.rot, -this.size*1.2).add(this.pos);//back
    var p1 = p5.Vector.fromAngle(this.rot, this.size*1.2).add(this.pos);//front
    var p2 = p5.Vector.fromAngle(this.rot+Math.PI/2, this.size).add(back);//backleft
    var p3 = p5.Vector.fromAngle(this.rot-Math.PI/2, this.size).add(back);//backright
    return [{b0: p1, b1: p2}, {b0: p2, b1: p3}, {b0: p3, b1: p1}];
  }

  turn(angle){
    this.rot += angle;
  }

  toRawData(){
    var flames = [];
    var lasers = [];
    this.flames.forEach(f=>flames.push(f.toRawData()));
    this.lasers.forEach(l=>lasers.push(l.toRawData()));
    return {
      pos: {x: this.pos.x, y: this.pos.y},
      vel: {x: this.vel.x, y: this.vel.y},
      size: this.size,
      rot: this.rot,
      score: this.score,
      flames: flames,
      lasers: lasers,
      spacepressed: this.spacepressed,
      info: this.info
    }
  }
}

class Flame{
  constructor(posordata, rot){
    if(posordata&&!rot){
      this.pos = createVector(posordata.pos.x, posordata.pos.y);
      this.vel = createVector(posordata.vel.x, posordata.vel.y);
      this.alpha = posordata.alpha;
    }
    else{
      this.pos = createVector(posordata.x, posordata.y);
      this.vel = p5.Vector.fromAngle(rot+(random(-Math.PI/6, Math.PI/6)), random(1, 2));
      this.alpha = 255;
    }
    this.col = {r:0,g:0,b:0};
  }

  update(){
    this.pos.add(this.vel);
    this.alpha -= 15;
  }

  finished(){
    return this.alpha<0;
  }

  show(){
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    fill(this.col.r, this.col.g, this.col.b, this.alpha);
    circle(0, 0, 7);
    pop();
  }

  toRawData(){
    return {
      pos: {
        x: this.pos.x,
        y: this.pos.y
      },
      vel: {
        x: this.vel.x,
        y: this.vel.y
      },
      alpha: this.alpha
    }
  }
}

class Laser{
  constructor(posordata, rot){
    if(!rot){
      this.pos = createVector(posordata.pos.x, posordata.pos.y);
      this.vel = createVector(posordata.vel.x, posordata.vel.y);
    }
    else{
      this.pos = posordata.copy();
      this.vel = p5.Vector.fromAngle(rot, 5);
    }
    this.col = {r:0,g:0,b:0};
  }

  update(){
    this.pos.add(this.vel);
  }

  show(){
    push();
    translate(this.pos.x, this.pos.y);
    stroke(this.col.r, this.col.g, this.col.b);
    strokeWeight(4);
    point(0, 0);
    pop();
  }

  isOffscreen(){
    return (this.pos.x<0||this.pos.x>600||this.pos.y<0||this.pos.y>600);
  }

  hits(ast){
    var d = dist(this.pos.x, this.pos.y, ast.pos.x, ast.pos.y);
    return (d<ast.radius);
  }

  toRawData(){
    return {
      pos: {
        x: this.pos.x,
        y: this.pos.y
      },
      vel: {
        x: this.vel.x,
        y: this.vel.y
      }
    }
  }
}

class Asteroid{
  constructor(posordata, radius){
    if(posordata&&!radius){//if data
      this.pos = createVector(posordata.pos.x, posordata.pos.y);
      this.vel = createVector(posordata.vel.x, posordata.vel.y);
      this.radius = posordata.radius
      this.sides = posordata.sides;
      this.offset = posordata.offset;
    }
    else{
      this.pos = posordata?posordata.copy():(random(1)>0.5)?createVector(random(600),round(random(1))*600):createVector(round(random(1))*600,random(600));
      this.vel = p5.Vector.random2D();
      this.radius = radius?radius:random(35, 50);
      this.sides = floor(random(5, 15));
      this.offset = [];
      for(var i=0;i<this.sides;i++){
        this.offset[i] = random(-this.radius/2, this.radius/2);
      }
    }
  }

  update(){
    this.pos.add(this.vel);
    this.checkEdges();
  }

  show(){
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    beginShape();
    for(var i=0;i<this.sides;i++){
      var a = map(i, 0, this.sides, 0, Math.PI*2);
      var v = p5.Vector.fromAngle(a, this.radius+this.offset[i]);
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
  }

  boundLines(){
    var lines = [];
    var prev = null;
    for(var i=0;i<this.sides;i++){
      var angle = (map(i, 0, this.sides, 0, Math.PI*2));
      var current = p5.Vector.fromAngle(angle, this.radius+this.offset[i]).add(this.pos);
      if(prev!=null){
        lines.push({b0: prev, b1: current});
      }
      prev = current;
    }
    lines.push({b0: lines[0].b0, b1: lines[lines.length-1].b1});
    return lines;
  }

  checkEdges(){
    if(this.vel.x!=0&&this.vel.y!=0){
      this.pos.x=(this.pos.x)<0?600-1:(this.pos.x>600)?0:this.pos.x;
      this.pos.y=(this.pos.y)<0?600-1:(this.pos.y>600)?0:this.pos.y;
    }
  }

  toRawData(){
    return {
      pos: {
        x: this.pos.x,
        y: this.pos.y
      },
      vel: {
        x: this.vel.x,
        y: this.vel.y
      },
      radius: this.radius,
      sides: this.sides,
      offset: this.offset
    }
  }
}

function asteroidsDatabaseShow(ships, asteroids, stage){
  background(0);
  asteroids.forEach(a=>{
    a.update();
    a.show();
  });

  Object.keys(ships).forEach(uid=>{
    let ship = ships[uid];
    ship.update();
    ship.checkLasers(asteroids);
    if(uid==currentUser.uid){
      if(keys[32]&&!ship.spacepressed){
        ship.spacepressed = true;
        ship.shoot();
      }
      if(!keys[32]&&ship.spacepressed){
        ship.spacepressed = false;
      }
      keys[37]?ship.turn(-0.1):keys[39]?ship.turn(0.1):null;
      keys[38]?ship.boost():null;
      if(!frameCount%48){ship.score+=2;}
    }
  });

  Object.keys(ships).forEach(uid=>{
    let ship = ships[uid];
    ship.show();
  });

  push();
  fill(255);
  text("stage "+stage, 4, 600-16);
  text("score: "+ships[currentUser?.uid]?.score, 4, 600-6);
  pop();
  let numtoadd = 0;
  if(asteroids.length==1&&asteroids[0].radius<20){
    stage++;
    if(stage==10){
      push();
      textAlign(CENTER, CENTER);
      textSize(96);
      stroke(255);
      strokeWeight(0.5);
      noFill();
      text("You Win!", 600/2, 600/2);
      pop();
    }
    for(var i=0;i<stage*3;i++){
      asteroids.push(new Asteroid());
    }
  }
}

function asteroidsDatabaseUpdate(ship, asteroids, stage){
  database.ref("games/asteroids/gamedata/stage").set(stage);
  database.ref("games/asteroids/gamedata/asteroids").set(asteroids.map(a=>a.toRawData()));
  database.ref("games/asteroids/playerdata/"+currentUser.uid).set(ship.toRawData());
}
