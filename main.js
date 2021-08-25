let main = document.getElementById("main");

let height = window.innerHeight;
let width = window.innerWidth;

var currentObject = undefined;

window.onmouseup = function (event) {
  currentObject = undefined;
}

window.onmousemove = function (event) {
  if (currentObject != undefined) {
    currentObject.mouseMove(event)
  }
}

let part1 = new ColorTab(null, 0, 0);

console.log(part1)