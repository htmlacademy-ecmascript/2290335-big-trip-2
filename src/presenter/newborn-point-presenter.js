import {remove, render, RenderPosition} from '../framework/render.js';
import CreatePointView from '../view/point-newborn/newborn-point-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #allPoints = null;
  #allOffers = null;
  #allDestinations = null;
  #taskListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #taskCreateComponent = null;

  constructor({
    allPoints,
    allOffers,
    allDestinations,
    taskListContainer,
    onDataChange,
    onDestroy
  }) {
    this.#allPoints = allPoints;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#taskListContainer = taskListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#taskCreateComponent !== null) {
      return;
    }

    this.#taskCreateComponent = new CreatePointView({
      points: this.#allPoints,
      offers: this.#allOffers,
      destinations: this.#allDestinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#taskCreateComponent, this.#taskListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#taskCreateComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#taskCreateComponent);
    this.#taskCreateComponent = null;

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
}
