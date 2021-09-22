class InputBox extends ForeignObject {
  constructor(parent, x, y, shape, settingsObject) {
    super(parent, "input", x, y, shape, settingsObject);

    let element = this;
    this.realElement.oninput = function() {
      element.oninput.call(element);
    }

    this.realElement.onblur = function() {
      element.onblur.call(element);
    }

    this.realElement.setAttribute("type", "text");
    this.realElement.setAttribute("class", "sliderTextBox noselect");
  }

  onmousedown(event) {
    //this.realElement.setAttribute("class", "sliderTextBox");
    //this.realElement.focus();
  }

  oninput() {
    this.settings.oninput.call(this);

    this.lastValue = this.realElement.value;
  }

  onblur() {
    this.realElement.setAttribute("class", "sliderTextBox noselect");
  }

  onmouseover(event) {
    if (currentObject == undefined || currentObject == this) {
      this.realElement.setAttribute("class", "sliderTextBox");
    }
  }

  onmouseleave(event) {
    if (currentObject != this) {
      this.realElement.setAttribute("class", "sliderTextBox noselect");
    }
  }
}