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
    this.addChild(new ColorSlider(this, 155, 35, "red"));
    this.addChild(new ColorSlider(this, 155, 60, "green"));
    this.addChild(new ColorSlider(this, 155, 85, "blue"));
    
    this.redVal = 255;
    this.blueVal = 255;
    this.greenVal = 255;

    this.updateValues()
  }

  onmousedown(event, element) {
    let x = event.x - this.x;
    let y = event.y - this.y;

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
    if (this.red < 0) {
      this.red = 0;
    }
    
    if (this.green < 0) {
      this.green = 0;
    }
    
    if (this.blue < 0) {
      this.blue = 0;
    }
    
    if (this.red > 255) {
      this.red = 255;
    }
    
    if (this.green > 255) {
      this.green = 255;
    }
    
    if (this.blue > 255) {
      this.blue = 255;
    }
    

    this.sliders.forEach(slide => {
      slide.updateColors();
    });
  }
}