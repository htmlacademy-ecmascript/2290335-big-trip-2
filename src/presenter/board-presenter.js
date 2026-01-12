import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort/sort-view.js';
import PointListView from '../view/event-list/event-list-view.js';
import PointView from '../view/event-item/event-item-view.js';
import EditFormView from '../view/form-edit/form-edit-view.js';
// import CreationFormView from '../view/form-create/form-create-view.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  EventListComponent = new PointListView();
  // CreationMenuComponent = new CreationFormView();

  constructor({ container, pointModel }) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.modelBoardPoints = [...this.pointModel.getAllPoints()];
    // Начальный рендер: сортировка и пустой список
    render(this.sortComponent, this.container, RenderPosition.AFTERBEGIN);
    render(this.EventListComponent, this.container);

    // Рендер первого поинта
    render(new EditFormView({
      point: this.modelBoardPoints[0],
      offers: this.pointModel.getAllOffersBySpecificType(this.modelBoardPoints[0].type),
      destination: this.pointModel.getDestinationById(this.modelBoardPoints[0].destination),
      checkedOffers: [...this.pointModel.getOfferById(this.modelBoardPoints[0].type, this.modelBoardPoints[0].offers)]
    }), this.EventListComponent.element);

    // Рендер последующих поинтов
    for (let i = 1; i < this.modelBoardPoints.length; i++) {
      render(new PointView({
        point: this.modelBoardPoints[i],
        offers: [...this.pointModel.getOfferById(this.modelBoardPoints[i].type, this.modelBoardPoints[i].offers)],
        destination: this.pointModel.getDestinationById(this.modelBoardPoints[0].destination)
      }), this.EventListComponent.element);
    }
    // render(this.CreationMenuComponent, this.container);
  }
}

