import AbstractView from '../../framework/view/abstract-view.js';
import { createPointTemplate } from './event-item-template.js';

export default class PointView extends AbstractView {
  #concretePoint = null;
  #specialOffers = null;
  #concreateDestination = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({
    concretePoint,
    specialOffers,
    concreateDestination,
    onEditClick,
    onFavoriteClick,
  }) {
    super();
    this.#concretePoint = concretePoint;
    this.#specialOffers = specialOffers;
    this.#concreateDestination = concreateDestination;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#concretePoint, this.#specialOffers, this.#concreateDestination);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

}

