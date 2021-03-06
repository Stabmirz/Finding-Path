var button = document.querySelector('.start');
var matrix = document.querySelector('.array');
var walk = document.querySelector('.path');
var size = 11;
var old_i = 0;
var old_j = 0;
var pathX = new Array();
var pathY = new Array();

var [S, E] = ['S', 'E']
var array = [
  [S, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, E]
]

matrix.innerHTML = arrTable();

function findPath() {
  var element;
  var done = false;
  for (var i = 0; i < array.length && !done; i++) {
    for (var j = 0; j < array[i].length; j++) {
      element = array[i][j];
      if (element === S) {
        pathX[0] = i;
        pathY[0] = j;
        done = true;
        break;
      }
    }
  }
  var x;
  var y;
  var m, n;
  while (element !== E) {
    x = pathX[pathX.length - 1];
    y = pathY[pathY.length - 1];
    m = pathX[pathX.length - 2];
    n = pathY[pathY.length - 2];
    point({ i: parseInt(x), j: parseInt(y) }, { i: parseInt(m), j: parseInt(n) });
    x = pathX[pathX.length - 1];
    y = pathY[pathY.length - 1];
    element = array[x][y];
  }
}

function point(pos, last) {

  if (array[pos.i][pos.j] === E) {
    pathX.push([pos.i]);
    pathY.push([pos.j]);
    return true;

  }
  if (pos.i < (array.length - 1) && array[pos.i + 1][pos.j] && !(pos.i + 1 === last.i && pos.j === last.j)) {
    pathX.push([pos.i + 1]);
    pathY.push([pos.j]);
    return true;
  }
  if (pos.j < array[0].length - 1 && array[pos.i][pos.j + 1] && !(pos.i === last.i && pos.j + 1 === last.j)) {
    pathX.push([pos.i]);
    pathY.push([pos.j + 1]);
    return true;
  }
  if (pos.i > 0 && array[pos.i - 1][pos.j] && !(pos.i - 1 === last.i && pos.j === last.j)) {
    pathX.push([pos.i - 1]);
    pathY.push([pos.j]);
    return true;
  }
  if (pos.j > 0 && array[pos.i][pos.j - 1] && !(pos.i === last.i && pos.j - 1 === last.j)) {
    pathX.push([pos.i]);
    pathY.push([pos.j - 1]);
    return true;
  }
}

function start() {
  var result = '';
  findPath();
  for (var i = 0; i < pathX.length; i++) {
    result += '(' + pathX[i] + ',' + pathY[i] + ')' + '<br/>';
  }
  walk.innerHTML = result;

}

function arrTable() {
  var result = [];
  for (var k = 0; k < size; k++) {
    result += array[k].join('  ') + '<br/>';
  }
  return result;
}

button.addEventListener('click', function (e) {
  start();
})