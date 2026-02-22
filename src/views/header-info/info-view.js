import AbstractView from '../../framework/view/abstract-view.js';
import {templateInfo} from './info-template.js';

export default class InfoView extends AbstractView {
  #pointModel = null;
  #offerModel = null;
  #totalPrice = null;
  constructor(pointModel, offerModel, totalPrice) {
    super();
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#totalPrice = totalPrice;
  }

  get template() {
    return templateInfo(this.#pointModel, this.#offerModel, this.#totalPrice);
  }
}

