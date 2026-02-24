import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import PointListView from '../views/point-list/point-list-view.js';
import EditPointView from '../views/point-edit/edit-point-view.js';

export default class NewPointPresenter {
  #eventListComponent = new PointListView();
  #points = null;
  #offers = null;
  #destinations = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #newPointComponent = null;

  constructor({
    points,
    offers,
    destinations,
    onDataChange,
    onDestroy
  }) {
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
    this.#newPointComponent = new EditPointView({
      offers: this.#offers.total,
      destinations: this.#destinations.total,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleCloseForm,
      onDeleteClick: this.#handleDeleteClick,
    });
    const listContainer = document.querySelector('.trip-events__list');
    if (!listContainer) {
      render(this.#eventListComponent, document.querySelector('.trip-events'), RenderPosition.AFTERBEGIN);
    }
    render(this.#newPointComponent, document.querySelector('.trip-events__list'), RenderPosition.AFTERBEGIN);
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

  setSaving() {
    this.#newPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  #handleFormSubmit = (task) => {
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      task
    );
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

  #handleCloseForm = () => {
    this.destroy();
  };

  setAborting() {
    const resetFormState = () => {
      this.#newPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newPointComponent.shake(resetFormState);
  }
}
