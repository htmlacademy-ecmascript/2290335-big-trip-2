import {render, RenderPosition, remove} from '../framework/render.js';
import {sortByTime, sortByPrice} from '../utils/task-utils.js';
import SortView from '../view/sort/sort-view.js';
import {SortType, UserAction, UpdateType} from '../const.js';
import PointListView from '../view/event-list/event-list-view.js';
// import NoPointView from '../view/no-event-item/no-event-item-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #sortComponent = null;
  #eventListComponent = new PointListView();
  #container = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.Day;

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
    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointModel.total].sort(sortByPrice);
      case SortType.TIME:
        return [...this.#pointModel.total].sort(sortByTime);
    }
    return this.#pointModel.total;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    render(this.#eventListComponent, this.#container);
    this.#renderPoints();
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      eventListComponent: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      offers,
      destinations
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    // if (this.#modelBoardPoints.length === 0) {
    //   render(new NoPointView(), this.#eventListComponent.element);
    //   return;
    // }
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.#offerModel, this.#destinationModel);
    }
  }

  ///// Код, связанный с работой сортировки /////

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    // - Сортируем задачи
    this.#currentSortType = sortType;
    // - Очищаем список
    this.#clearTaskList();
    // - Рендерим список заново
    render(this.#eventListComponent, this.#container);
    this.#renderPoints();
  };

  #clearTaskList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  // - Меняем режим просмотра поинта
  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // - Преображаем поинт
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #clearBoard({resetSortType = false} = {}) {

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    // remove(this.#noTaskComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }
}
