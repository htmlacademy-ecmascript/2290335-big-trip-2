import InfoPresenter from './info-presenter.js';
import FilterPresenter from './filter-presenter.js';

export default class HeaderPresenter {
  #points = null;
  constructor({container, pointModel, filterModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.filterModel = filterModel;

    this.infoPresenter = new InfoPresenter({
      container: this.container,
      pointModel
    });

    this.filterPresenter = new FilterPresenter({
      container: this.container.querySelector('.trip-controls'),
      filterModel,
      pointModel
    });

  }

  init() {
    // const points = this.pointModel.total;
    // console.log(points);
    this.infoPresenter.init();
    this.filterPresenter.init();
  }

  get points() {
    const points = this.pointModel.total;
    // console.log(points);
    return points;
  }

}

