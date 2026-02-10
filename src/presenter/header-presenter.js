import {render, RenderPosition} from '../framework/render.js';
import HeaderInfoView from '../view/header-info/header-info-view.js';

export default class HeaderPresenter {
  constructor({container, pointModel, filterModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.filterModel = filterModel;
  }

  init() {
    render(new HeaderInfoView(), this.container, RenderPosition.AFTERBEGIN);
  }
}

