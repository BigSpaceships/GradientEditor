
/**
 * @class Part an element of the svg drawing
 */
 class Part {

  /**
   * @returns the elements x position on the svg element
   */
  getX() {
    if (this.parent == null) {
      return Number(this.x);
    }

    return Number(this.x + this.parent.getX());
  }

  /**
   * @returns the elements y postition on the svg element
   */
  getY() {
    if (this.parent == null) {
      return Number(this.y);
    }

    return Number(this.y + this.parent.getY());
  }


  /**
   * Creates an element
   * @param {*} parent the parent element
   * @param {String} type type of element it is
   * @param {Number} x x position relative to the parent
   * @param {Number} y y position relative to the parent
   * @param {Array} shape array of data that has the additional shape data
   * @param {Function} setup function to call before we update the position and shape but after the element is created
   */
  constructor(parent, type, x, y, shape, setup = function () {}) {
    switch(type) {
      case "canvas":
        this.element = document.createElement("canvas")
        break;
      default:
        this.element = document.createElementNS("http://www.w3.org/2000/svg", type);
    }
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.children = [];
    this.type = type;
    this.shape = shape;
    this.element.setAttribute("class", "tab");

    setup(this);

    this.updatePosition();
    this.updateShape();

    let element = this;
    this.element.onmousedown = function(event) {
      element.onmousedown(event, element);
    }

    this.element.part = this;

    switch(type) {
      case "canvas": 
        main.parentElement.appendChild(this.element)
        break;
      default:
        main.appendChild(this.element);
    }
  }

  /**
   * updates the position of the element
   */
  updatePosition() {
    switch(this.type) {
      case "rect":
      case "text":
        this.element.setAttribute("x", this.getX());
        this.element.setAttribute("y", this.getY());
        break;
      case "line":
        this.element.setAttribute("x1", this.getX());
        this.element.setAttribute("y1", this.getY());
        break;
      case "canvas":
        this.element.style.left = this.getX();
        this.element.style.top = this.getY();
        console.log(this.getX())
        break;
    }
  }

  /**
   * updates the shape of the element
   */
  updateShape() {
    switch(this.type) {
      case "rect":
        this.element.setAttribute("width", this.shape[0]);
        this.element.setAttribute("height", this.shape[1]);

        let css = document.styleSheets[0].cssRules[0];
        this.element.setAttribute("rx", css.style.getPropertyValue("border-radius"));
        this.element.setAttribute("ry", css.style.getPropertyValue("border-radius"));

        break;
      case "line":
        this.element.setAttribute("x2", Number(this.element.getAttribute("x1")) + this.shape[0]);
        this.element.setAttribute("y2", Number(this.element.getAttribute("y1")) + this.shape[1]);
        break;
      case "canvas" :
        this.element.setAttribute("width", this.shape[0]);
        this.element.setAttribute("height", this.shape[1]);
        break;
    }
  }

  /**
   * adds a child to the element
   * @param {Part} child 
   */
  addChild(child) {
    this.children.push(child);
  }

  /**
   * Offsets the element by the given ammount
   * @param {Number} x 
   * @param {Number} y 
   */
  offset(x, y) {
    this.x += x;
    this.y += y;

    switch (this.type) {
      case "rect":
      case "text":
        this.element.setAttribute("x", Number(this.element.getAttribute("x")) + x);
        this.element.setAttribute("y", Number(this.element.getAttribute("y")) + y);
        break;
      case "line":
        this.element.setAttribute("x1", Number(this.element.getAttribute("x1")) + x);
        this.element.setAttribute("y1", Number(this.element.getAttribute("y1")) + y);
        this.element.setAttribute("x2", Number(this.element.getAttribute("x2")) + x);
        this.element.setAttribute("y2", Number(this.element.getAttribute("y2")) + y);
        break;
      case "canvas":
        console.log((this.element.style.left.split(["px"])[0]) + "px")
        this.element.style.left = (Number(this.element.style.left.split(["px"])[0]) + x) + "px";
        this.element.style.top = (Number(this.element.style.top.split(["px"])[0]) + y) + "px";
    }

    this.children.forEach(child => {
      child.offset(x, y)
    })
  }

  /**
   * called when the element is clicked 
   */
  onmousedown(event, element) {
    currentObject = element;
  }

  /**
   * called when the mouse moves after the element has been clicked on
   */
  mouseMove(event) {
  }

  /**
   * called when the element should update
   */
  updatePart() {
    switch(this.type) {
      case "canvas":
        this.shape[2]();
        break;
    }
  }
}