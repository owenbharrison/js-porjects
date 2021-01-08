class Grid{
  constructor(img, difficulty){
    this.img = img;
    this.difficulty = difficulty;
    this.tileSize = (width-200)/this.difficulty;
    image(img, 100, 100, width-200, height-200);
    loadPixels();
    this.pixels = pixels;
    updatePixels();
    background(0);

    this.tiles = [];
    for(var y=100;y<height-100;y+=this.tileSize){
      for(var x=100;x<width-100;x+=this.tileSize){
        var index = (x+y*width)*4;
        var col = {r: this.pixels[index], g: this.pixels[index+1], b: this.pixels[index+2]};
        var type = (col.r+col.g+col.b)/3>90;//bright is B dark is X
        this.tiles.push(new Tile(type, x, y, this.tileSize, col));
      }
    }
  }

  reveal(){
    this.tiles.forEach(tile=>{
      tile.reveal();
    });
  }

  update(){
    this.tiles.forEach(tile=>{
      tile.checkClicked();
    });
  }

  finished(){
    var result = true;
    this.tiles.forEach(tile=>{
      if(tile.type&&!tile.found){
        result = false;
      }
    });
    return result;
  }

  show(){
    this.tiles.forEach(tile=>{
      tile.show();
    });
    push();
    stroke(0);
    strokeWeight(2);
    for(var x=100;x<width-100;x+=this.tileSize){
      line(x, 100, x, height-100);
    }
    for(var y=100;y<height-100;y+=this.tileSize){
      line(100, y, width-100, y);
    }
    pop();
  }

  showtabs(){
    //vertical tabs
    for(var x=0;x<this.difficulty;x++){
      var tab = [];
      var prev = null;
      for(var y=0;y<this.difficulty;y++){
        var index = x+y*this.difficulty;
        var current = this.tiles[index];
        if(current.type){
          if(!prev||!prev.type){
            tab.push(1);
          }
          if(prev&&prev.type){
            tab[tab.length-1]++;
          }
        }
        prev = current;
      }
      if(tab.length==0){tab=[0];}
      var p = this.tiles[x].pos;
      for(var i=0;i<tab.length;i++){
        textSize(this.tileSize/2);
        textAlign(CENTER, CENTER);
        text(tab[i], p.x+this.tileSize/2, p.y-this.tileSize/2*(tab.length-i));
      }
    }

    //horizontal tabs
    for(var y=0;y<this.difficulty;y++){
      var tab = [];
      var prev = null;
      for(var x=0;x<this.difficulty;x++){
        var index = x+y*this.difficulty;
        var current = this.tiles[index];
        if(current.type){
          if(!prev||!prev.type){
            tab.push(1);
          }
          if(prev&&prev.type){
            tab[tab.length-1]++;
          }
        }
        prev = current;
      }
      if(tab.length==0){tab=[0];}
      var p = this.tiles[y*this.difficulty].pos;
      for(var i=0;i<tab.length;i++){
        textSize(this.tileSize/2);
        textAlign(CENTER, CENTER);
        text(tab[i], p.x-this.tileSize/2*(tab.length-i), p.y+this.tileSize/2);
      }
    }
  }
}
