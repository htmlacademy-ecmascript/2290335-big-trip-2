import {render, RenderPosition} from '../framework/render.js';
import {updateItem} from '../utils/common-utils.js';
import {sortByTime, sortByPrice} from '../utils/task-utils.js';
import SortView from '../view/sort/sort-view.js';
import {SortType} from '../const.js';
import PointListView from '../view/event-list/event-list-view.js';
import NoPointView from '../view/no-event-item/no-event-item-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #sortComponent = null;
  #eventListComponent = new PointListView();
  #container = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #pointPresenters = new Map();
  #modelBoardPoints = [];
  #currentSortType = SortType.Day;
  #startedBoardPoints = [];

  constructor({
    container,
    pointModel,
    offerModel,
    destinationModel
  }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
  }

  get points() {
    return this.#pointModel.total;
  }

  init() {
    this.#modelBoardPoints = [...this.#pointModel.total];
    this.#startedBoardPoints = [...this.#pointModel.total];
    this.#renderBoard();
    this.#renderPoints();
  }

  #renderBoard() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    render(this.#eventListComponent, this.#container);
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      eventListComponent: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      offers,
      destinations
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    if (this.#modelBoardPoints.length === 0) {
      render(new NoPointView(), this.#eventListComponent.element);
      return;
    }
    for (let i = 0; i < this.#modelBoardPoints.length; i++) {
      this.#renderPoint(this.#modelBoardPoints[i], this.#offerModel, this.#destinationModel);
    }
  }

  ///// Код, связанный с работой сортировки /////

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    // - Сортируем задачи
    this.#sortTasks(sortType);
    // - Очищаем список
    this.#clearTaskList();
    // - Рендерим список заново
    render(this.#eventListComponent, this.#container);
    this.#renderPoints();
  };

  #sortTasks(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#modelBoardPoints.sort(sortByPrice);
        break;
      case SortType.TIME:
        this.#modelBoardPoints.sort(sortByTime);
        break;
      case SortType.Day:
        this.#modelBoardPoints = [...this.#startedBoardPoints];
        break;
    }
    this.#currentSortType = sortType;
  }

  #clearTaskList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }


  // - Меняем режим просмотра поинта
  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // - Преображаем поинт
  #handlePointChange = (updatedPoint) => {
    this.#modelBoardPoints = updateItem(this.#modelBoardPoints, updatedPoint);
    this.#startedBoardPoints = updateItem(this.#startedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

}
