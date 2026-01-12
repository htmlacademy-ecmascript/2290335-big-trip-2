import AbstractView from '../../framework/view/abstract-view.js';
import { createPointTemplate } from './event-item-template.js';

export default class PointView extends AbstractView {
  constructor({point, offers, destination}) {
    super();
    this.point = point;
    this.offers = offers;
    this.destination = destination;
  }

  get template() {
    return createPointTemplate(this.point, this.offers, this.destination);
  }
}

