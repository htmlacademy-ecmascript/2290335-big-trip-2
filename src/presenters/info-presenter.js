import {render, RenderPosition} from '../framework/render.js';
import InfoView from '../views/header-info/info-view.js';

export default class InfoPresenter {
  #container = null;
  #pointModel = null;
  #points = null;
  #infoViewComponent = null;

  constructor({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.renderContent();
  }

  renderContent() {
    render(new InfoView(this.#pointModel), this.#container, RenderPosition.AFTERBEGIN);
  }


  #handleModelEvent = () => {
    this.init();
  };

}
