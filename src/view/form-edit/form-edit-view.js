import AbstractView from '../../framework/view/abstract-view.js';
import { createEditFormTemplate } from './form-edit-template.js';

export default class EditFormView extends AbstractView {
  constructor({point, offers, destination, checkedOffers}) {
    super();
    this.point = point;
    this.offers = offers;
    this.destination = destination;
    this.checkedOffers = checkedOffers;
  }

  get template() {
    return createEditFormTemplate(this.point, this.offers, this.destination, this.checkedOffers);
  }
}
