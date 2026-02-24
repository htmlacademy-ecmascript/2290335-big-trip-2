import InfoPresenter from './info-presenter.js';
import FilterPresenter from './filter-presenter.js';

export default class HeaderPresenter {
  constructor({container, pointModel, offerModel, destinationModel, filterModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.offerModel = offerModel;
    this.filterModel = filterModel;

    this.infoPresenter = new InfoPresenter({
      container: this.container,
      pointModel,
      offerModel,
      destinationModel,
    });

    this.filterPresenter = new FilterPresenter({
      container: this.container.querySelector('.trip-controls'),
      filterModel,
      pointModel
    });

  }

  init() {
    this.infoPresenter.init();
    this.filterPresenter.init();
  }

  get points() {
    const points = this.pointModel.total;
    return points;
  }
}

