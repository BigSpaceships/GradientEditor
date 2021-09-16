class ColorSlider extends Part{
  constructor(parent, x, y, type) {
    super(parent, "rect", x, y, [115, 15, 1])

    this.colorType = type;

    let element = this;

    this.sliderId = sliderid++;

    this.setupLinearGradientDef();
    
    
    this.addChild(new Part(this, "rect", 0, 0, [85, 15, 0], {
      setup: function setup() {
        this.element.style.fill = "url(#" + this.parent.sliderId + this.parent.colorType + ")";
      }
    }));
    this.addChild(new DragablePart(this, 'line', 0, 0, [0, 15], {
      mouseMove: function(event) {
        this.offset((event.offsetX - this.x), 0);
        
        console.log(this.x)

        if (this.relativeX < 0) {
          this.xSet(this.parent.x);
        }

        if (this.relativeX > 85) {
          this.xSet(this.parent.x + 85);
        }
        
        switch (this.parent.colorType) {
          case "red": 
            this.parent.parent.red = this.relativeX * 3;
            break;
          case "blue":
            this.parent.parent.blue = this.relativeX * 3;
            break;
          case "green":
            this.parent.parent.green = this.relativeX * 3;
            break;
        }
      },
      setup: function() {
        this.element.setAttribute("class", "selector");
      }
    }))
    this.addChild(new InputBox(this, 85, 1, [29, 13], {}))
    this.addChild(new Part(this, "line", 85, 0, [0, 15]));
  }

  mouseMove(event) {

    if (Math.abs(event.offsetX - this.x) > 5) {
      this.children[4].mouseMove.call(this.children[4], (event));
    }

    this.children[0].updatePart();
  }

  updateGradient() {
    switch (this.colorType) {
      case "red":
        this.linearGradientDef.children[0].setAttribute("stop-color", `rgb(${0}, ${this.parent.green}, ${this.parent.blue})`);
        this.linearGradientDef.children[1].setAttribute("stop-color", `rgb(${255}, ${this.parent.green}, ${this.parent.blue})`);
        break;
      case "green":
        this.linearGradientDef.children[0].setAttribute("stop-color", `rgb(${this.parent.red}, ${0}, ${this.parent.blue})`);
        this.linearGradientDef.children[1].setAttribute("stop-color", `rgb(${this.parent.red}, ${255}, ${this.parent.blue})`);
        break;
      case "blue":
        this.linearGradientDef.children[0].setAttribute("stop-color", `rgb(${this.parent.red}, ${this.parent.green}, ${0})`);
        this.linearGradientDef.children[1].setAttribute("stop-color", `rgb(${this.parent.red}, ${this.parent.green}, ${255})`);
        break;
    }
  }

  setupLinearGradientDef() {
    this.linearGradientDef = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    defs.appendChild(this.linearGradientDef);
    this.linearGradientDef.setAttribute("id", this.sliderId + this.colorType);

    let stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    this.linearGradientDef.appendChild(stop1);
    
    let stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    this.linearGradientDef.appendChild(stop2);

    this.updateGradient();
  }
}
