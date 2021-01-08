function setup(){
  createCanvas(400, 400);
  const values = [];
  for(var i=0;i<30;i++){
    values[i] = random(100);
  }

  const shape = [2, 5, 3];

  const tense = tf.tensor(values, shape, "int32");

  tense.print();
  console.log(tense.dataSync());
}

function draw(){
  background(0);
}
