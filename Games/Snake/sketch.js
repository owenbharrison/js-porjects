var snake;
var size = 30;
var food;
var w;
var h;

function setup(){
  createCanvas(600, 600);
  w = floor(width/size);
  h = floor(height/size);
  snake = new Snake();
  foodLocation();
}

function foodLocation(){
  var x = floor(random(w));
  var y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed(){
  if(keyCode===UP_ARROW&&snake.dir.y!=1){
    snake.dir.set(0, -1)
  } else if(keyCode===DOWN_ARROW&&snake.dir.y!=-1){
    snake.dir.set(0, 1)
  } else if(keyCode===LEFT_ARROW&&snake.dir.x!=1){
    snake.dir.set(-1, 0)
  } else if(keyCode===RIGHT_ARROW&&snake.dir.x!=-1){
    snake.dir.set(1, 0)
  } else if (key = ' '){
    snake.grow();
  }
}

function draw(){
  background(170);
  scale(size);
  frameRate(10);
  if(snake.eat(food)){
    foodLocation();
  };
  snake.update();
  snake.show();

  noStroke();
  fill(255,0,0);
  rect(food.x, food.y, 1, 1);

  if(snake.snakedead()){
    noLoop();
    background(0);
  }
}
