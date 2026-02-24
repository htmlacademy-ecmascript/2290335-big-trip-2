import AbstractView from '../../framework/view/abstract-view.js';
import {templatePoint} from './point-template.js';

export default class PointView extends AbstractView {
  #concretePoint = null;
  #concreateOffers = null;
  #concreateDestination = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({
    concretePoint,
    concreateOffers,
    concreateDestination,
    onEditClick,
    onFavoriteClick,
  }) {
    super();
    this.#concretePoint = concretePoint;
    this.#concreateOffers = concreateOffers;
    this.#concreateDestination = concreateDestination;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return templatePoint(this.#concretePoint, this.#concreateOffers, this.#concreateDestination);
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

