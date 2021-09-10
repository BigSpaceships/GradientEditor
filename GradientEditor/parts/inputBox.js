class InputBox extends ForeignObject {
  constructor(parent, x, y, shape, settingsObject) {
    super(parent, "input", x, y, shape, settingsObject);


    this.realElement.setAttribute("type", "text");
    this.realElement.setAttribute("class", "sliderTextBox");
  }
}