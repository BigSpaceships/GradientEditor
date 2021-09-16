class InputBox extends ForeignObject {
  constructor(parent, x, y, shape, settingsObject) {
    super(parent, "input", x, y, shape, settingsObject);


    this.realElement.setAttribute("type", "text");
    this.realElement.setAttribute("class", "sliderTextBox");

    this.realElement.style.pointerEvents = "none";
  }

  onmousedown(event, element) {
    super.onmousedown(event, element);

    this.realElement.style.pointerEvents = "auto";
  }

  onmouseup(event) {
    super.onmouseup(event);

    this.realElement.style.pointerEvents = "none";
  }
}