class User{
  constructor(data){
    if(data){
      this.name = data.name;
      this.message = data.message;
      this.col = data.col;
    }
    else{
      this.name = prompt("What would you like your username to be?");
      this.message = "";
      var col, coltest = /(\d+,\d+,\d+)/;
      while(!coltest.test(col)){
        col=prompt("What color do you want your player to be? hint: r,g,b");
      }
      this.col = JSON.parse(col.replace(coltest, "[$1]"));
    }
  }
}
