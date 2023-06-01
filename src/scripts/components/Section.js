export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;

    this._container = containerSelector;  
  }

  cardRenderer(items) {
    items.reverse().forEach(element => {
      this.addItem(this._renderer(element));
    });
  }
  
  addItem(element) {
    this._container.prepend(element);
  }
}