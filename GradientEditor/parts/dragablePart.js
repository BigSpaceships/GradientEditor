class DragablePart extends Part {
  mouseMove(event) {
    super.mouseMove(event);
    
    this.offset(event.movementX, event.movementY);
  }
}