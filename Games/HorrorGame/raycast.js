function raycast(start, dir, len, shrubs, show){
  var results = [];
  for(var a=dir-fov/2;a<dir+fov/2;a+=fov/60){
    var cp = p5.Vector.fromAngle(a, len).add(start);
    var rsd = Infinity;//record shortest dist
    var clp = null;//closest point
    var col = {r: 100, g: 100, b: 100};
    var type = "none";
    shrubs.forEach(shrub=>{
      var sli = squarelineintersect(start, cp, shrub.pos, shrub.size);
      if(sli!=null){
        var d = dist(start.x, start.y, sli.x, sli.y)*cos(a-dir);
        if(d<rsd){
          rsd=d,clp=sli,col={r:0,g:255,b:0},type="shrub";
        }
      }
    });
    walls.forEach(wall=>{
      var sli = intersectpoint(start, cp, wall.a, wall.b);
      if(sli!=null){
        var d = dist(start.x, start.y, sli.x, sli.y)*cos(a-dir);
        if(d<rsd){
          rsd=d,clp=sli,type="wall";
        }
      }
    });
    var sli = squarelineintersect(start, cp, monster.pos, 7);
    if(sli!=null){
      var d = dist(start.x, start.y, sli.x, sli.y)*cos(a-dir);
      if(d<rsd){
        rsd=d,clp=sli,col={r:255,g:0,b:0},type="monster";
      }
    }

    if(clp){//if something spotted
      if(show){
        push();
        stroke(col.r, col.g, col.b);
        line(start.x, start.y, clp.x, clp.y);//draw line to it
        pop();
      }
      results.push({height: dist(start.x, start.y, clp.x, clp.y), col: col, type: type});
    }
    else if(!clp){//if nothing been spotted
      if(show){
        push();
        stroke(col.r, col.g, col.b);
        line(start.x, start.y, cp.x, cp.y);
        pop();
      }
      results.push({height: len, col: col, type: type})
    }
  }
  return results;
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
