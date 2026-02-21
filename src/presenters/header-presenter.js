import {render, RenderPosition} from '../framework/render.js';
import FilterPresenter from './filter-presenter.js';
import HeaderInfoView from '../views/header-info/header-info-view.js';

export default class HeaderPresenter {
  #points = null;
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
    // const points = this.pointModel.total;
    // console.log(points);
    render(new HeaderInfoView(), this.container, RenderPosition.AFTERBEGIN);
    this.filterPresenter.init();
  }

  get points() {
    const points = this.pointModel.total;
    console.log(points);
  }

  render

}

