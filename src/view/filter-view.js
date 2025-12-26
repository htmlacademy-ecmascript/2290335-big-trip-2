import { createElement } from '../render.js';
import { createHeaderFiltersTemplate } from './templates/filter-template.js';

export default class HeaderFilters {

  getTemplate() {
    return createHeaderFiltersTemplate();
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
