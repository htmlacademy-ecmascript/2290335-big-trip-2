import { createElement } from '../render.js';
import { createEditMenuTemplate } from './templates/form-edit-template.js';

export default class EditMenu {

  getTemplate() {
    return createEditMenuTemplate();
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
