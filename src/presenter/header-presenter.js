import {render, RenderPosition} from '../framework/render.js';
import {generateFilter} from '../filter.js';
import HeaderInfoView from '../view/header-info/header-info-view.js';
import HeaderFiltersView from '../view/filter/filter-view.js';

export default class HeaderPresenter {

  constructor({ container, pointModel}) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    render(new HeaderInfoView(), this.container, RenderPosition.AFTERBEGIN);

    const filters = generateFilter(this.pointModel.total);
    render(new HeaderFiltersView({filters}), this.container);
  }
}

