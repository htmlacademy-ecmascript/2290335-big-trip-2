import { render, RenderPosition } from '../render.js';
import HeaderInfo from '../view/header-info-view.js';
import HeaderFilters from '../view/filter-view.js';

export default class HeaderPresenter {
  headerInfoComponent = new HeaderInfo();
  headerFiltersComponent = new HeaderFilters();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.headerInfoComponent, this.container, RenderPosition.AFTERBEGIN);
    render(this.headerFiltersComponent, this.container);
  }
}

