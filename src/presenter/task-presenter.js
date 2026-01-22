import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/event-item/event-item-view.js';
import EditFormView from '../view/form-edit/form-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TaskPresenter {
  #taskListContainer = null;
  #handleDataChange = null;

  #taskComponent = null;
  #taskEditComponent = null;

  #task = null;
  #offers = null;
  #destinations = null;

  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({
    taskListContainer,
    offers,
    destinations,
    onDataChange,
    onModeChange
  }) {
    this.#taskListContainer = taskListContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(task) {
    this.#task = task;

    const prevTaskComponent = this.#taskComponent;
    const prevTaskEditComponent = this.#taskEditComponent;

    this.#taskComponent = new PointView({
      point: this.#task,
      offers: [...this.#offers.getOfferById(task.type, task.offers)],
      destination: this.#destinations.getDestinationById(task.destination),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#taskEditComponent = new EditFormView({
      point: this.#task,
      offers: [...this.#offers.getOfferById(task.type, task.offers)],
      destination: this.#destinations.getDestinationById(task.destination),
      checkedOffers: [...this.#offers.getOfferById(this.#task.type, this.#task.offers)],
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose
    });

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#taskComponent, this.#taskListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#taskComponent, prevTaskComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  destroy() {
    remove(this.#taskComponent);
    remove(this.#taskEditComponent);
  }

  #handleFavoriteClick = () => {
    // console.log('dfdfd');
    // console.log(this.#task);
    this.#handleDataChange({...this.#task, isFavorite: !this.#task.isFavorite});
  };

  #replaceCardToForm() {
    replace(this.#taskEditComponent, this.#taskComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#taskComponent, this.#taskEditComponent);
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

  #handleFormSubmit = (task) => {
    this.#handleDataChange(task);
    this.#replaceFormToCard();
  };

  #handleFormClose = () => {
    this.#replaceFormToCard();
  };

}
