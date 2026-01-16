import AbstractView from '../../framework/view/abstract-view.js';
import { createPointTemplate } from './event-item-template.js';

export default class PointView extends AbstractView {
  #handleEditClick = null;
  constructor({
    point,
    offers,
    destination,
    onEditClick
  }) {
    super();
    this.point = point;
    this.offers = offers;
    this.destination = destination;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.point, this.offers, this.destination);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}

