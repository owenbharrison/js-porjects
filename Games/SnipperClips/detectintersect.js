function detectintersect(p1, p2){
  var overlappingPixels = [];
  var p1ps = p1.pixels.map(p=>JSON.stringify(p.realPosition()));
  var p2ps = p2.pixels.map(p=>JSON.stringify(p.realPosition()));
  var res = false;
  p1ps.forEach(p=>{
    if(p2ps.includes(p)){
      overlappingPixels.push(JSON.parse(p));
    }
  });
  overlappingPixels.forEach(p=>{
    push();
    stroke(0);
    point(p.x, p.y);
    pop();
  });
}
