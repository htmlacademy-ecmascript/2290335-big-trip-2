import SortView from '../view/sort-view';
import EventList from '../view/event-list-view';
import PointView from '../view/event-item-view.js';
import CreationMenu from '../view/form-create-view.js';
import EditMenu from '../view/form-edit-view.js';
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
    this.boardPoints = [...this.pointModel.getPoint()];
    render(this.sortComponent, this.container, RenderPosition.AFTERBEGIN);
    render(this.EventListComponent, this.container);
    // render(this.EditMenuComponent, this.EventListComponent.getElement());
    render(new EditMenu({
      point: this.boardPoints[0],
      checkedOffers: [...this.pointModel.getOfferById(this.boardPoints[0].type, this.boardPoints[0].offers)],
      offers: this.pointModel.getOfferByTipe(this.boardPoints[0].type),
      destination: this.pointModel.getDestinationById(this.boardPoints[0].destination)
    }), this.EventListComponent.getElement());

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

