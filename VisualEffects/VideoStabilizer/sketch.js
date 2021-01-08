var similarity;

var smile;

function preload(){
  smile = loadImage("data/smile.jpg");
}

function setup(){
  var pixset1, pixset2;
  createCanvas(100, 100);
  similarity = createDiv("Similarity: 0");
}

function draw(){
  push();
  background(0);
  image(smile, 0, 0, width, height);
  pop();
  loadPixels();
  pixset1 = pixels;
  updatePixels();
  push();
  background(0);
  imageMode(CENTER, CENTER);
  image(smile, mouseX, mouseY, width, height);
  pop();
  loadPixels();
  pixset2 = pixels;
  updatePixels();
  similarity.html("Similarity: "+comparePixsets(pixset1, pixset2));
}

function comparePixsets(pixset1, pixset2){
  var sum1 = 0;
  var count1 = 0;
  var sum2 = 0;
  var count2 = 0;
  for(var i=0;i<pixset1.length;i+=4){
    sum1+=pixset1[i]+pixset1[i+1]+pixset1[i+2];
    count1+=3;
  }
  for(var i=0;i<pixset2.length;i+=4){
    sum2+=pixset2[i]+pixset2[i+1]+pixset2[i+2];
    count2+=3;
  }
  return (255-Math.abs(sum1/count1-sum2/count2))/255;
}
