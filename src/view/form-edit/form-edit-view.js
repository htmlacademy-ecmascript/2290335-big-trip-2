import { createElement } from '../../render.js';
import { createEditFormTemplate } from './form-edit-template.js';

export default class EditFormView {
  constructor({point, offers, destination, checkedOffers}) {
    this.point = point;
    this.offers = offers;
    this.destination = destination;
    this.checkedOffers = checkedOffers;
  }

  getTemplate() {
    return createEditFormTemplate(this.point, this.offers, this.destination, this.checkedOffers);
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
