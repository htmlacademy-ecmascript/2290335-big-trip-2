import SortView from '../view/sort-view';
import EventList from '../view/event-list-view';
import PointView from '../view/event-item-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  EventListComponent = new EventList();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.EventListComponent, this.container);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.EventListComponent.getElement());
    }
  }
}

