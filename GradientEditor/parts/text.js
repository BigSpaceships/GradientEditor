class TextNode extends Part {

  constructor(parent, type, x, y, shape) {
    super(parent, type, x, y, shape, function setup(element){
      element.textNode = document.createTextNode(shape[0]);
      element.element.appendChild(element.textNode);
    })
  }

  updatePosition() {
    this.element.setAttribute("x", this.getX());
    this.element.setAttribute("y", this.getY());
    //this.textNode.setAttribute("x", this.getX());
    //this.textNode.setAttribute("y", this.getY());
  }

  updateShape() {
    //this.textNode.nodeValue = this.shape[0];
  }
}