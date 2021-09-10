class ForeignObject extends Part {


  constructor(parent, type, x, y, shape, settingsObject = {}) {

    super(parent, "foreignObject", x, y, [shape[0], shape[1]], settingsObject);
    this.settings = settingsObject;

    this.realElement = document.createElementNS("http://www.w3.org/1999/xhtml", type);
    this.element.appendChild(this.realElement);

    this.element.setAttribute("class", "");
  }

  updatePosition() {
    this.element.setAttribute("x", this.x);
    this.element.setAttribute("y", this.y);
  }

  updateShape() {
    this.element.setAttribute("width", this.shape[0]);
    this.element.setAttribute("height", this.shape[1]);
  }
}