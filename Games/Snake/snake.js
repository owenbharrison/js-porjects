class Snake{

  constructor(){
    this.body = [];
    this.body[0] = createVector();
    this.dir = createVector();
  }

  update(){
    var head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.add(this.dir);
    this.body.push(head);
  }

  grow(){
    var head = this.body[this.body.length-1].copy();
    this.body.push(head);
  }

  snakedead(){
    var head = this.body[this.body.length-1].copy();
    if(head.x<0||head.x>w-1||head.y<0||head.y>h-1){
      return true;
    }
    for(var i=0;i<this.body.length-1;i++){
      var check = this.body[i];
      if(check.x==head.x&&check.y==head.y){
        return true;
      }
    }
    return false;
  }

  eat(pos){
    var amnt = 3;
    if(pos.x==this.body[this.body.length-1].x&&pos.y==this.body[this.body.length-1].y){
      for(var i=0;i<amnt;i++){
        this.grow();
      }
      return true;
    }
    return false;
  }

  show(){
    this.body.forEach(p=>{
      push();
      fill(0);
      rect(p.x, p.y, 1, 1);
      pop();
    });
  }
}
