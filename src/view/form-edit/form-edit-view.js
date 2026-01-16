import AbstractView from '../../framework/view/abstract-view.js';
import { createEditFormTemplate } from './form-edit-template.js';

export default class EditFormView extends AbstractView {
  #handleFormSubmit = null;
  #handleFormClose = null;

  constructor({
    point,
    offers,
    destination,
    checkedOffers,
    onFormSubmit,
    onFormClose
  }) {
    super();
    this.point = point;
    this.offers = offers;
    this.destination = destination;
    this.checkedOffers = checkedOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#registerEvents();
  }

  get template() {
    return createEditFormTemplate(this.point, this.offers, this.destination, this.checkedOffers);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #registerEvents = () => {
    this.element?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
  };
}
