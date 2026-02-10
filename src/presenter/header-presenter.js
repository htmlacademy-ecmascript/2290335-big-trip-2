import {render, RenderPosition} from '../framework/render.js';
import HeaderInfoView from '../view/header-info/header-info-view.js';
import FiltersView from '../view/filter/filter-view.js';

const filters = [
  {
    type: 'all',
    count: 0,
  },
];

export default class HeaderPresenter {
  constructor({container, pointModel, filterModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.filterModel = filterModel;
  }

  init() {
    render(new HeaderInfoView(), this.container, RenderPosition.AFTERBEGIN);
    render(new FiltersView({filters, currentFilterType: 'all', onFilterTypeChange: () => {}}), this.container);
  }
}

