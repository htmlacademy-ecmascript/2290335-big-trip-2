import AbstractView from '../../framework/view/abstract-view.js';
import {templateInfo} from './info-view-template.js';

export default class InfoView extends AbstractView {
  #pointModel = null;
  constructor(pointModel) {
    super();
    this.#pointModel = pointModel;
  }

  get template() {
    return templateInfo(this.#pointModel);
  }
}

