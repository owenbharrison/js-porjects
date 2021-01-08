function make2DArray(cols, rows){
  var arr = new Array(cols);
  for(var i=0;i<cols;i++){
    arr[i] = new Array(rows);
  }
  return arr;
}
