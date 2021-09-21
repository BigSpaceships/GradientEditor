class ColorSlider extends Part{
  constructor(parent, x, y, type) {
    super(parent, "rect", x, y, [130, 15, 1])

    this.colorType = type;

    let element = this;

    this.sliderId = sliderid++;

    this.setupLinearGradientDef();
    
    
    this.addChild(new Part(this, "rect", 0, 0, [85, 15, 0], {
      setup: function setup() {
        this.element.style.fill = "url(#" + this.parent.sliderId + this.parent.colorType + ")";
      }
    }));
    this.addChild(new InputBox(this, 100, 1, [29, 13], {}))
    this.addChild(new Part(this, "line", 85, 0, [0, 15]));
    this.addChild(new Part(this, "line", 100, 0, [0, 15]));
    //buttons
    this.addChild(new Part(this, "rect", 85, 0, [15, 7.5], {
      setup: function() {
        this.element.setAttribute("class", "tab sliderButton");
      },
      onmousedown: function() {
        this.parent.parent[this.parent.colorType]++;
      }
    }));
    let index = this.children.length - 1;
    this.children[index].addChild(new Part(this.children[index], "line", 3, 5, [4.5, -3], {passClick: true}));
    this.children[index].addChild(new Part(this.children[index], "line", 7.5, 2, [4.5, 3], {passClick: true}));
    
    this.addChild(new Part(this, "rect", 85, 7.5, [15, 7.5], {
      setup: function() {
        this.element.setAttribute("class", "tab sliderButton");
      },
      onmousedown: function() {
        this.parent.parent[this.parent.colorType]--;
      }
    }))
    index++;
    this.children[index].addChild(new Part(this.children[index], "line", 3, 2, [4.5, 3], {passClick: true}));
    this.children[index].addChild(new Part(this.children[index], "line", 7.5, 5, [4.5, -3], {passClick: true}));

    this.addChild(new DragablePart(this, 'line', 0, 0, [0, 15], {
      mouseMove: function(event) {
        this.offset((event.offsetX - this.x), 0);

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
  }

  mouseMove(event) {

    if (Math.abs(event.offsetX - this.x) > 5) {
      this.children[3].mouseMove.call(this.children[4], (event));
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
  }

  updateColors() {
    let value;

    switch(this.colorType) {
      case "red":
        value = this.parent.red;
        break;
      case "green":
        value = this.parent.green;
        break;
      case "blue":
        value = this.parent.blue;
        break;
    }

    this.updateGradient();

    this.findChildrenByType("input")[0].realElement.value = value;
    this.children[this.children.length - 1].relativeX = value / 3;
  }
}
