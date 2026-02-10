import {render, RenderPosition} from '../framework/render.js';
import HeaderInfoView from '../view/header-info/header-info-view.js';
import FilterPresenter from './filter-presenter.js';

export default class HeaderPresenter {
  constructor({container, pointModel, filterModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.filterModel = filterModel;

    this.filterPresenter = new FilterPresenter({
      container: this.container.querySelector('.trip-controls'),
      filterModel,
      pointModel
    });
  }

  init() {
    render(new HeaderInfoView(), this.container, RenderPosition.AFTERBEGIN);
    this.filterPresenter.init();
  }
}

