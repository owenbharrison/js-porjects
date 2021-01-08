
var lp1;
var lp2;
var rps = [];
var rs = 60;

var size = 10;

function setup(){
  createCanvas(400, 400);
  lp1 = createVector(200, 200);
  lp2 = createVector(300, 100);
  for(var i=0;i<10;i++){
    rps.push(createVector(random(width), random(height)));
  }
}

function draw(){
  background(150);

  for(var a=0;a<Math.PI*2;a+=Math.PI/256){
    var mv = createVector(mouseX, mouseY);
    lp2 = p5.Vector.fromAngle(a, width*2).add(mv);
    rps.forEach(rp=>{
      var ip = squarelineintersect(mv, lp2, rp, rs);
      if(ip){
        strokeWeight(2);
        line(lp2.x, lp2.y, ip.x, ip.y);
      }
    });
  }
}

function squarelineintersect(lp1, lp2, rp, rs){
  var rps = [createVector(rp.x-rs/2,rp.y-rs/2),createVector(rp.x-rs/2,rp.y+rs/2),createVector(rp.x+rs/2,rp.y+rs/2),createVector(rp.x+rs/2,rp.y-rs/2)];
  var rls = [];
  var prev = rps[3];
  rps.forEach(p=>{
    rls.push({b0:prev,b1:p});
    prev = p;
  });
  var slp = null;
  var rs = Infinity;
  rls.forEach(l=>{
    var ip = intersectpoint(l.b0, l.b1, lp1, lp2);
    if(ip!=null){
      var d = dist(lp1.x, lp1.y, ip.x, ip.y);
    }
    if(ip!=null&&d<rs){
      rs = d;
      slp = ip;
    }
  });
  return slp;
}

function intersectpoint(a,b,c,d){
  var den = (a.x-b.x)*(c.y-d.y)-(a.y-b.y)*(c.x-d.x);
  var t = ((a.x-c.x)*(c.y-d.y)-(a.y-c.y)*(c.x-d.x))/den;
  var u = -((a.x-b.x)*(a.y-c.y)-(a.y-b.y)*(a.x-c.x))/den;
  if(t>0&&t<1&&u>0&&u<1){
    return createVector(a.x+t*(b.x-a.x), a.y+t*(b.y-a.y));
  }else{
    return null;
  }
}
