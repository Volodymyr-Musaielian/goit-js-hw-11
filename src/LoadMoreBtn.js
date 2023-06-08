export default class LoadMoreBtn {
  static classes = {
    hidden: 'hidden',
  };

  constructor({ selector, isHidden = false }) {
    this.button = this.getButton(selector);
    if (isHidden) {
      this.hide();
    }
  }
  getButton(selector) {
    return document.querySelector(selector);
  }

  hide() {
    this.button.classList.add(LoadMoreBtn.classes.hidden);
  }
  show() {
    this.button.classList.remove(LoadMoreBtn.classes.hidden);
  }
}
