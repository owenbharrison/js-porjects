
function pointlineintersect(a,b,p,s){
  var r=!1;
  var θ=p5.Vector.sub(b,a).heading();
  for(var i=0;i<dist(a.x,a.y,b.x,b.y);i++){
    var v=p5.Vector.fromAngle(θ,i).add(a);
    if(dist(v.x,v.y,p.x,p.y)<s/2){r=!0;}
  }
  return r;
}

function intersects(x,y,n,r){
  var t,e,c;
  return 0!==(t=(y.x-x.x)*(r.y-n.y)-(r.x-n.x)*(y.y-x.y))&&(c=((r.y-n.y)*(r.x-x.x)+(n.x-r.x)*(r.y-x.y))/t,e=((x.y-y.y)*(r.x-x.x)+(y.x-x.x)*(r.y-x.y))/t,0<c&&c<1&&0<e&&e<1)
}
