import HeaderPresenter from './header-presenter.js';
import BoardPresenter from './board-presenter.js';
// import {render} from '../framework/render.js';
// import NewPointButtonView from '../view/new-point-button/new-point-button-view.js';

const headerContainerElement = document.querySelector('.page-header__container .trip-main');
const pageContainerElement = document.querySelector('.page-main .trip-events');
const createPointButtonElement = document.querySelector('.trip-main__event-add-btn');

export default class MainPresenter {
  constructor(pointModel, offerModel, destinationModel, filterModel) {
    this.headerPresenter = new HeaderPresenter({container: headerContainerElement, pointModel, filterModel});
    this.boardPresenter = new BoardPresenter({container: pageContainerElement, pointModel, offerModel, destinationModel,
      filterModel, onNewTaskDestroy: this.#handleNewPointFormClose});
  }

  init() {
    this.headerPresenter.init();
    console.log(this.boardPresenter);
    this.boardPresenter.init();
    this.#registerEvents();
  }

  handleNewPointButtonClick() {
    console.log(this.boardPresenter);
    this.boardPresenter.createTask();
    createPointButtonElement.disabled = true;
  }

  #handleNewPointFormClose() {
    createPointButtonElement.disabled = false;
  }

  #registerEvents() {
    createPointButtonElement.addEventListener('click', this.handleNewPointButtonClick);
  }
}

