import AbstractView from '../../framework/view/abstract-view.js';
import {templateInfo} from './info-template.js';

export default class InfoView extends AbstractView {
  #endTripDay = null;
  #startTripDay = null;
  #firstCity = null;
  #middleCity = null;
  #lastCity = null;
  #totalPrice = null;
  #pointModel = null;
  constructor(startTripDay, endTripDay, firstCity, middleCity, lastCity, totalPrice, pointModel) {
    super();
    this.#firstCity = firstCity;
    this.#middleCity = middleCity;
    this.#lastCity = lastCity;
    this.#startTripDay = startTripDay;
    this.#endTripDay = endTripDay;
    this.#totalPrice = totalPrice;
    this.#pointModel = pointModel;
  }

  get template() {
    return templateInfo(this.#startTripDay, this.#endTripDay, this.#firstCity, this.#middleCity, this.#lastCity, this.#totalPrice, this.#pointModel);
  }
}

