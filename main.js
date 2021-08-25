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

function Hi() {
  var bar = new Bar()

  bar.prototype
}

class Bar {
  constructor() {
    this.hi = 10;
  }
}

Hi.prototype = Object.create(Bar.prototype);
Object.defineProperty(Hi.prototype, 'constructor', {
  value: Hi,
  enumerable: false,
  writable: true
});

Hi()