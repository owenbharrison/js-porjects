function array2d(cols, rows, val){
  var grid = [];
  for(var i=0;i<cols;i++){
    grid[i] = [];
    for(var j=0;j<rows;j++){
      grid[i][j] = val;
    }
  }
  return grid;
}
