import HeaderPresenter from './header-presenter.js';
import BoardPresenter from './board-presenter.js';

const headerContainerElement = document.querySelector('.page-header__container .trip-main');
const pageContainerElement = document.querySelector('.page-main .trip-events');

export default class MainPresenter {
  constructor(pointModel, offerModel, destinationModel) {
    this.headerPresenter = new HeaderPresenter({container: headerContainerElement});
    this.boardPresenter = new BoardPresenter({container: pageContainerElement, pointModel, offerModel, destinationModel});
  }

  init () {
    this.headerPresenter.init();
    this.boardPresenter.init();
  }
}

