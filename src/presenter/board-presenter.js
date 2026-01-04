import SortView from '../view/sort/sort-view.js';
import EventList from '../view/event-list/event-list-view.js';
import PointView from '../view/event-item/event-item-view.js';
import CreationMenu from '../view/form-create/form-create-view.js';
import EditMenu from '../view/form-edit/form-edit-view.js';
import { render, RenderPosition } from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  EventListComponent = new EventList();
  CreationMenuComponent = new CreationMenu();
  EditMenuComponent = new EditMenu();

  constructor({ container, pointModel }) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoints = [...this.pointModel.getAllPoints()];
    // Начальный рендер: сортировка и пустой список
    render(this.sortComponent, this.container, RenderPosition.AFTERBEGIN);
    render(this.EventListComponent, this.container);

    // Рендер первого поинта
    render(new EditMenu({
      point: this.boardPoints[0],
      offers: this.pointModel.getAllOffersBySpecificType(this.boardPoints[0].type),
      destination: this.pointModel.getDestinationById(this.boardPoints[0].destination),
      checkedOffers: [...this.pointModel.getOfferById(this.boardPoints[0].type, this.boardPoints[0].offers)]
    }), this.EventListComponent.getElement());

    // Рендер последующих поинтов
    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointView({
        point: this.boardPoints[i],
        offers: [...this.pointModel.getOfferById(this.boardPoints[i].type, this.boardPoints[i].offers)],
        destination: this.pointModel.getDestinationById(this.boardPoints[0].destination)
      }), this.EventListComponent.getElement());
    }

    render(this.CreationMenuComponent, this.container);
  }
}

