import { createElement } from '../render.js';
import { createListTemplate } from './templates/event-list-template.js';

export default class EventList {

  getTemplate() {
    return createListTemplate();
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
