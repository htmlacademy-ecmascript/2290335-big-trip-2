import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort/sort-view.js';
import PointListView from '../view/event-list/event-list-view.js';
import PointView from '../view/event-item/event-item-view.js';
import EditFormView from '../view/form-edit/form-edit-view.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  EventListComponent = new PointListView();

  constructor({ container, pointModel, offerModel, destinationModel }) {
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
    const pointComponent = new PointView({
      point: task,
      offers: [...this.offerModel.getOfferById(task.type, task.offers)],
      destination: this.destinationModel.getDestinationById(task.destination)
    });
    render(pointComponent, this.EventListComponent.element);
  }

}

