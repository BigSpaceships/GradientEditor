class ColorTab extends DragablePart {

  set red(value) {
    this.redVal = value;
    this.updateValues();
  }

  set blue(value) {
    this.blueVal = value;
    this.updateValues();
  }

  set green(value) {
    this.greenVal = value;
    this.updateValues();
  }

  get red() {
    return this.redVal;
  }

  get blue() {
    return this.blueVal;
  }

  get green() {
    return this.greenVal;
  }

  constructor(parent, x, y) {
    super(parent, "rect", x, y, [300, 225])

    this.sliders = [];

    this.addChild(new Part(this, "line", 0, 20, [300, 0]));
    this.addChild(new TextNode(this, "text", 5, 15, ["Color"]));
    this.addChild(new ColorSlider(this, 170, 35, "red"));
    this.addChild(new ColorSlider(this, 170, 55, "green"));
    this.addChild(new ColorSlider(this, 170, 75, "blue"));
    
    this.red = 155;
    this.blue = 255;
    this.green = 255;
  }

  onmousedown(event, element) {
    let x = event.x - this.getX();
    let y = event.y - this.getY();

    if (y < 15) {
      currentObject = element;
    }
  }

  addChild(child) {
    super.addChild(child);

    if (child instanceof ColorSlider) {
      this.sliders.push(child);
    }
  }

  updateValues() {
    this.sliders.forEach(slide => {
      slide.updateGradient();
    });
  }
}