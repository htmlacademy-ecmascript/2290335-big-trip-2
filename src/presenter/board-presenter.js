import {render, RenderPosition, replace} from '../framework/render.js';
import SortView from '../view/sort/sort-view.js';
import PointListView from '../view/event-list/event-list-view.js';
import PointView from '../view/event-item/event-item-view.js';
import EditFormView from '../view/form-edit/form-edit-view.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  EventListComponent = new PointListView();

  constructor({
    container,
    pointModel,
    offerModel,
    destinationModel
  }) {
    this.container = container;
    this.pointModel = pointModel;
    this.offerModel = offerModel;
    this.destinationModel = destinationModel;
  }

  init() {
    this.modelBoardPoints = [...this.pointModel.getAllPoints()];
    render(this.sortComponent, this.container, RenderPosition.AFTERBEGIN);
    render(this.EventListComponent, this.container);

    for (let i = 1; i < this.modelBoardPoints.length; i++) {
      this.#renderPoint(this.modelBoardPoints[i]);
    }
  }

  #renderPoint(task) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const taskComponent = new PointView({
      point: task,
      offers: [...this.offerModel.getOfferById(task.type, task.offers)],
      destination: this.destinationModel.getDestinationById(task.destination),
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const taskEditComponent = new EditFormView({
      point: task,
      offers: [...this.offerModel.getOfferById(task.type, task.offers)],
      destination: this.destinationModel.getDestinationById(task.destination),
      checkedOffers: [...this.offerModel.getOfferById(task.type, task.offers)],
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormClose: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(taskEditComponent, taskComponent);
    }

    function replaceFormToCard() {
      replace(taskComponent, taskEditComponent);
    }

    render(taskComponent, this.EventListComponent.element);
  }

}

