import {render, replace, remove} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import PointView from '../view/event-item/event-item-view.js';
import EditFormView from '../view/form-edit/form-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #eventListComponent = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = null;
  #destinations = null;

  #handlePointChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({
    eventListComponent,
    offers,
    destinations,
    onDataChange,
    onModeChange
  }) {
    this.#eventListComponent = eventListComponent;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handlePointChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      concretePoint: this.#point,
      specialOffers: [...this.#offers.getOfferById(point.type, point.offers)],
      concreateDestination: this.#destinations.getDestinationById(point.destination),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditFormView({
      concretePoint: this.#point,
      concreateOffers: [...this.#offers.getOfferById(point.type, point.offers)],
      checkedOffers: [...this.#offers.getOfferById(this.#point.type, this.#point.offers)],
      concreateDestination: this.#destinations.getDestinationById(point.destination),
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      offers: this.#offers.total,
      destinations: this.#destinations.total,
    });

    // - Проверка на наличие в DOM, чтобы не пытаться заменить то, что не было отрисовано
    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventListComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #handleFavoriteClick = () => {
    // this.#handlePointChange({...this.#point, isFavorite: !this.#point.isFavorite});
    this.#handlePointChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (point) => {
    // this.#handlePointChange(point);
    this.#handlePointChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      point,
    );
    this.#replaceFormToCard();
  };

  #handleFormClose = () => {
    this.#replaceFormToCard();
  };

}
