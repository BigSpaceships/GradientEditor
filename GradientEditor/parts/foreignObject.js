class ForeignObject extends Part {


  constructor(parent, type, x, y, shape, settingsObject = {}) {

    super(parent, "foreignObject", x, y, [shape[0], shape[1]], settingsObject);
    this.settings = settingsObject;

    this.realElement = document.createElement(type);
    this.element.appendChild(this.realElement);
  }
}