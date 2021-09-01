let main = document.getElementById("main");

let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
main.appendChild(defs);

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

var slider;

let sliderid = 0;

let part1 = new ColorTab(undefined, 0, 0);