import HeaderPresenter from './header-presenter.js';
import BoardPresenter from './board-presenter.js';

const headerContainerElement = document.querySelector('.page-header__container .trip-main');
const pageContainerElement = document.querySelector('.page-main .trip-events');
const createPointButtonElement = document.querySelector('.trip-main__event-add-btn');

export default class MainPresenter {
  constructor(pointModel, offerModel, destinationModel, filterModel) {
    this.headerPresenter = new HeaderPresenter({container: headerContainerElement, pointModel, filterModel});
    this.boardPresenter = new BoardPresenter({
      container: pageContainerElement,
      pointModel,
      offerModel,
      destinationModel,
      filterModel,
      onNewTaskDestroy: this.handleNewPointFormClose
    });
  }

  init() {
    this.headerPresenter.init();
    this.boardPresenter.init();
  }

  handleNewPointFormClose() {
    createPointButtonElement.disabled = false;
  }

}

