import {remove, render, RenderPosition} from '../framework/render.js';
import NewPoinView from '../view/point-new/new-point-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #listContainer = null;
  #points = null;
  #offers = null;
  #destinations = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #newPointComponent = null;

  constructor({
    listContainer,
    points,
    offers,
    destinations,
    onDataChange,
    onDestroy
  }) {
    this.#listContainer = listContainer;
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#newPointComponent !== null) {
      return;
    }

    this.#newPointComponent = new NewPoinView({
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handlCloseForm,
      onDeleteClick: this.#handleDeleteClick,
      offers: this.#offers.total,
      destinations: this.#destinations.total,
    });

    render(this.#newPointComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newPointComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#newPointComponent);
    this.#newPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (task) => {
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      {id: nanoid(), ...task},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handlCloseForm = () => {
    this.destroy();
  };
}
