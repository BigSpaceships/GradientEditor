
/**
 * @class Part an element of the svg drawing
 */
 class Part {

  defaultSettingsObject = {
    mouseMove: function (event) {}, 
    setup: function () {},
    passClick: false,
    onmousedown: function(event) {}
  }

  get relativeX() {
    return this.x - this.parent.x;
  }

  get relativeY() {
    return this.y - this.parent.y;
  }

  set relativeX(x) {
    this.xSet(x + this.parent.x);
  }

  set relativeY(y) {
    this.ySet(y + this.parent.y);
  }

  /**
   * @returns the total number of children of the element including itsleft
   */
  getTotalChildren() {
    let z = 1;

    this.children.forEach(child => {
      z += child.getTotalChildren();
    });
    return z;
  }

  /**
   * Creates an element
   * @param {*} parent the parent element
   * @param {String} type type of element it is
   * @param {Number} x x position relative to the parent
   * @param {Number} y y position relative to the parent
   * @param {Array} shape array of data that has the additional shape data
   * @param {Function} setup function to call before we update the position and shape but after the element is created
   * @param {Boolean} passClick wather the element should pass its clicks onto the parent
   */
  constructor(parent, type, x, y, shape, settingsObject = {}) {

    Object.keys(this.defaultSettingsObject).forEach((key) => {
      if (!settingsObject.hasOwnProperty(key)) {
        settingsObject[key] = this.defaultSettingsObject[key];
      }
    })

    this.settings = settingsObject;

    switch(type) {
      case "canvas":
        this.element = document.createElement("canvas")
        break;
      default:
        this.element = document.createElementNS("http://www.w3.org/2000/svg", type);
    }

    if (parent != undefined) {
      x += parent.x;
      y += parent.y;
    }

    this.x = x;
    this.y = y;
    this.parent = parent;
    this.children = [];
    this.type = type;
    this.shape = shape;
    this.element.setAttribute("class", "tab");

    this.key = uuidv4();
    elements.set(this.key, this);
    this.element.setAttribute("key", this.key);

    settingsObject.setup.call(this);

    this.updatePosition();
    this.updateShape();

    let element = this;
    this.element.onmousedown = function(event) {
      element.onmousedown.call(element, event);
    }

    this.element.onmouseup = function(event) {
      element.onmouseup.call(element, event);
    }

    this.element.part = this;

    switch(type) {
      case "canvas": 
        main.parentElement.appendChild(this.element)
        break;
      default:
        main.appendChild(this.element);
    }
  }

  /**
   * sets the x value of the part
   * use this instead of part.x = x
   * @param {Number} x the x value to set
   */
  xSet(x) {
    this.x = x;
    this.updatePosition();
  }

  /**
   * sets the y value of the part
   * use this instead of part.y = y
   * @param {Number} y the y value to set
   */
  ySet(y) {
    this.y = y;
    this.updatePosition();
  }
  /**
   * updates the position of the element
   */
  updatePosition() {
    switch(this.type) {
      case "rect":
      case "text":
        this.element.setAttribute("x", this.x);
        this.element.setAttribute("y", this.y);
        break;
      case "line":
        this.element.setAttribute("x1", this.x);
        this.element.setAttribute("y1", this.y);
        this.updateShape();
        break;
      case "canvas":
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y +"px";
        break;
    }
  }

  /**
   * updates the shape of the element
   */
  updateShape() {
    switch(this.type) {
      case "rect":
        this.element.setAttribute("width", this.shape[0]);
        this.element.setAttribute("height", this.shape[1]);

        let css = document.styleSheets[0].cssRules[0];
        this.element.setAttribute("rx", css.style.getPropertyValue("border-radius"));
        this.element.setAttribute("ry", css.style.getPropertyValue("border-radius"));

        break;
      case "line":
        this.element.setAttribute("x2", Number(this.element.getAttribute("x1")) + this.shape[0]);
        this.element.setAttribute("y2", Number(this.element.getAttribute("y1")) + this.shape[1]);
        break;
      case "canvas" :
        this.element.setAttribute("width", this.shape[0]);
        this.element.setAttribute("height", this.shape[1]);
        break;
    }
  }

  /**
   * adds a child to the element
   * @param {Part} child 
   */
  addChild(child) {
    this.children.push(child);
  }

  /**
   * Offsets the element by the given ammount
   * @param {Number} x 
   * @param {Number} y 
   */
  offset(x, y) {
    this.x += x;
    this.y += y;

    switch (this.type) {
      case "rect":
      case "text":
        this.element.setAttribute("x", Number(this.element.getAttribute("x")) + x);
        this.element.setAttribute("y", Number(this.element.getAttribute("y")) + y);
        break;
      case "line":
        this.element.setAttribute("x1", Number(this.element.getAttribute("x1")) + x);
        this.element.setAttribute("y1", Number(this.element.getAttribute("y1")) + y);
        this.element.setAttribute("x2", Number(this.element.getAttribute("x2")) + x);
        this.element.setAttribute("y2", Number(this.element.getAttribute("y2")) + y);
        break;
      case "canvas":
        this.element.style.left = (Number(this.element.style.left.split(["px"])[0]) + x) + "px";
        this.element.style.top = (Number(this.element.style.top.split(["px"])[0]) + y) + "px";
    }

    this.children.forEach(child => {
      child.offset(x, y)
    })
  }

  /**
   * called when the element is clicked 
   */
  onmousedown(event) {
    if (this.settings.passClick) {
      this.parent.onmousedown.call(this, event);
    } else {
      currentObject = this;
      this.settings.onmousedown.call(this, event);
    }
  }

  onmouseup(event) {
    this.children.forEach(child => {
      child.onmouseup(event);
    })
  }

  /**
   * called when the mouse moves after the element has been clicked on
   */
  mouseMove(event) {
    //console.log(this)
    this.settings.mouseMove.call(this, event);
    //el = elements.get(this.getAttribute("key"));
    //el.settingsObject.mouseMove.call(el, event);
  }

  /**
   * called when the element should update
   */
  updatePart() {
    switch(this.type) {
      case "canvas":
        this.shape[2]();
        break;
    }
  }

  /**
   * 
   * @param {String} type the type to match 
   * @returns an array of the children of the element that match the given type
   */
  findChildrenByType(type) {
    let matches = [];

    this.children.forEach(child => {
      if (child.type == type) {
        matches.push(child);
      } else if (child.type == "foreignObject") {
        if (child.realType == type) {
          matches.push(child);
        } 
      }
    })

    return matches;
  }
}