let main = document.getElementById("main");

let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
main.appendChild(defs);

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

let elements = new Map()

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