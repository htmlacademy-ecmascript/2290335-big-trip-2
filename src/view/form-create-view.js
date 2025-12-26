import { createElement } from '../render.js';
import { createCreationMenuTemplate } from './templates/form-create-template.js';

export default class CreationMenu {

  getTemplate() {
    return createCreationMenuTemplate();
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
