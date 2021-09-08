class TextNode extends Part {

  constructor(parent, type, x, y, shape) {
    super(parent, type, x, y, shape, function setup(){
      this.textNode = document.createTextNode(shape[0]);
      this.element.appendChild(this.textNode);
    })
  }

  updatePosition() {
    this.element.setAttribute("x", this.y);
    this.element.setAttribute("y", this.y);
  }

  updateShape() {
    this.element.nodeValue = this.shape[0];
  }
}