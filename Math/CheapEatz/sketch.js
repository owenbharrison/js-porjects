var tbsp = 1;
var cup = 48 * tbsp;
var ouncespercup = 8; //array; this dep. on food item
var oz = cup * (ouncespercup);
var lb = 8 * oz;

//var fooitems = {banana:{num: 1, unit:unit}, flour:{num:2,unit:cups}};
var cost = {banana:{king:0.69, safeway:0.59},flour:{king:1.78, safeway:2.12}, eggs:{king:2.99, safeway:3.99}}
var kingtotal = 0;
var safetotal = 0;
var cheaptotal = 0;

var table;

function setup(){
  createCanvas(600, 600);
  background(255);
  table = document.getElementById("table");
  var y = 50
  text("Krogers Price", 155, y-21);
  text("Safeway Price", 255, y-21);
  text("Cheaper Price", 355, y-21)
  showFood("banana", y);
  y+=21;
  showFood("flour", y);
  y+=21;
  showFood("eggs", y);
  y+=21;
  text("Total:", 115, y)
  showTotal(y);
}

function showTotal(y){
  text("$"+kingtotal, 200, y);
  text("$"+safetotal, 300, y);
  push();
  stroke(255, 0, 0);
  text("$"+cheaptotal, 400, y);
  pop();
}

function showFood(food){
  //line(50, y+5, 450, y+5);
  //line(50, y-16, 450, y-16);
  //line(50, y+5, 50, y-16);
  //text(food, 60, y);
  //line(150, y+5, 150, y-16);
  //text("$"+cost[food].king, 200, y);
  //line(250, y+5, 250, y-16);
  //text("$"+cost[food].safeway, 300, y);
  //line(350, y+5, 350, y-16);
  //text("$"+cheaperCost(food), 400, y);
  //line(450, y+5, 450, y-16);
  document.getElem

  kingtotal += cost[food].king;
  safetotal += cost[food].safeway;
  cheaptotal += cheaperCost(food);
}

function cheaperCost(food){
  if(cost[food].king>cost[food].safeway){
    return cost[food].safeway;
  }
  else{
    return cost[food].king;
  }
}
