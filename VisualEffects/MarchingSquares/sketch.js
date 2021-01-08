var res = 10;
var cols, rows;
var field;
var offset = 0;

var dots;

function setup(){
  createCanvas(400, 400);
  cols = width/res+1;
  rows = height/res+1;
  field = make2darray(cols, rows);
}

function draw(){
  dots = [];
  push();
  fill(255,80);
  noStroke();
  rect(0, 0, width, height);
  pop();
  for(var i=0;i<cols-1;i++){
    for(var j=0;j<rows-1;j++){
      var x=i*res;
      var y=j*res;
      var state = field[i][j]*8+field[i+1][j]*4+field[i+1][j+1]*2+field[i][j+1];
      var a=createVector(x+res/2,y);
      var b=createVector(x+res,y+res/2);
      var c=createVector(x+res/2,y+res);
      var d=createVector(x,y+res/2);
      switch(state){
        case 1:case 14:connect(c,d);break;
        case 2:case 13:connect(b,c);break;
        case 3:case 12:connect(b,d);break;
        case 4:case 11:connect(a,b);break;
        case 5:connect(a,b),connect(c,d);break;
        case 6:case 9:connect(a,c);break;
        case 7:case 8:connect(a,d);break;
        case 10:connect(a,d),connect(c,b);break;
      }
    }
  }
  for(var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      field[i][j] = round(noise(i/5, j/5+100, offset));
    }
  }
  offset+=0.002;
}

function connect(a,b){
  dots.push(a);
  dots.push(b);
  line(a.x,a.y,b.x,b.y);
}

function make2darray(w, h){
  var arr = [];
  for(var i=0;i<w;i++){
    arr[i]=[];
    for(var j=0;j<h;j++){
      arr[i][j] = round(noise(i/5, j/5+100, offset));
    }
  }
  return arr;
}
