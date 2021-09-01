class ColorSlider extends Part{
  constructor(parent, x, y, type) {
    super(parent, "rect", x, y, [115, 15, 1])

    this.colorType = type;

    let element = this;

    this.sliderId = sliderid++;

    this.setupLinearGradientDef();
    
    this.addChild(new Part(this, "rect", 0, 0, [85, 15, 0]));
    this.children[0].element.style.fill = "url(#" + this.sliderId + this.colorType + ")";
    this.addChild(new Part(this, "line", 85, 0, [0, 15]));
  }

  mouseMove(event) {
    super.mouseMove(event);

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
