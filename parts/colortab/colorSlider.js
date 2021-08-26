class ColorSlider extends Part{
  constructor(parent, x, y, type) {
    super(parent, "rect", x, y, [115, 15, 1])

    this.colorType = type;

    let element = this;
    
    this.addChild(new Part(this, "canvas", 0, 0, [85, 15, function call() {
      element.drawGradient.call(element)
    }]));
    this.drawGradient()

    this.addChild(new Part(this, "rect", 0, 0, [85, 15, 1], function setup(el) {
      el.element.style.fill = 'rgba(0, 0, 0, 0)'
    }, true))
  }

  mouseMove(event) {
    super.mouseMove(event);

    this.children[0].updatePart();
  }

  drawGradient() {
    let ctx = this.children[0].element.getContext("2d");

    for (var x = 0; x < 85; x++) {
      var rgb;
      switch(this.colorType) {
        case "red":
          rgb = `rgb(${x*3}, ${this.parent.green}, ${this.parent.blue})`
          break;
      }

      ctx.beginPath();
      ctx.strokeStyle = rgb;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 15);
      ctx.stroke();
    }

  }

  offset(x, y) {
    super.offset(x, y)
  }
}
