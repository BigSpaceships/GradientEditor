class ColorTab extends DragablePart {

  constructor(parent, x, y) {
    super(parent, "rect", x, y, [300, 225])
    
    this.red = 255;
    this.blue = 255;
    this.green = 255;

    this.addChild(new Part(this, "line", 0, 20, [300, 0]));
    this.addChild(new TextNode(this, "text", 5, 15, ["Color"]))
    this.addChild(new ColorSlider(this, 170, 35, "red"))

  }

  onmousedown(event, element) {
    let x = event.x - this.getX();
    let y = event.y - this.getY();

    if (y < 15) {
      currentObject = element;
    }
  }

  
}