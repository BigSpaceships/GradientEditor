class DragablePart extends Part {
  constructor(parent, type, x, y, shape, settingsObject = {}) {
    if (!settingsObject.hasOwnProperty("mouseMove")) {
      settingsObject["mouseMove"] = function mouseMove(event) {
        this.offset(event.movementX, event.movementY);
      }
    }

    super(parent, type, x, y, shape, settingsObject);
    this.settings = settingsObject;
  }
}