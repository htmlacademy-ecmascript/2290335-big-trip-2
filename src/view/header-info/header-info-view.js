import { createElement } from '../../render.js';
import { createHeaderInfoTemplate } from './header-info-template.js';

export default class HeaderInfo {

  getTemplate() {
    return createHeaderInfoTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

