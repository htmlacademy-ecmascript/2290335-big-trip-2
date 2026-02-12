import HeaderPresenter from './header-presenter.js';
import BoardPresenter from './board-presenter.js';
import {render} from '../framework/render.js';
import NewPointButtonView from '../view/new-point-button/new-point-button-view.js';

const headerContainerElement = document.querySelector('.page-header__container .trip-main');
const pageContainerElement = document.querySelector('.page-main .trip-events');

export default class MainPresenter {
  constructor(pointModel, offerModel, destinationModel, filterModel) {
    this.headerPresenter = new HeaderPresenter({container: headerContainerElement, pointModel, filterModel});
    this.boardPresenter = new BoardPresenter({container: pageContainerElement, pointModel, offerModel, destinationModel,
      filterModel, onNewTaskDestroy: this.#handleNewPointFormClose});
  }

  #newPointButtonComponent = new NewPointButtonView({
    onClick: this.#handleNewPointButtonClick
  });

  #renderNewPointButton() {
    render(this.#newPointButtonComponent, headerContainerElement);
  }

  #handleNewPointFormClose() {
    this.#newPointButtonComponent.element.disabled = false;
  }

  #handleNewPointButtonClick() {
    this.boardPresenter.createTask();
    this.#newPointButtonComponent.element.disabled = true;
  }

  init () {
    this.headerPresenter.init();
    this.boardPresenter.init();
    this.#renderNewPointButton();
  }
}

