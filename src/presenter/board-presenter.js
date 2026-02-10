import {render, RenderPosition, remove} from '../framework/render.js';
import {POINTS_COUNT, SortType, UserAction, UpdateType, FilterType} from '../const.js';
import {sortByTime, sortByPrice} from '../utils/task-utils.js';
import {filter} from '../utils/filter.js';
import SortView from '../view/sort/sort-view.js';
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
  #renderedTaskCount = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FilterType.ALL;
  #NoPointComponent = null;

  constructor({
    container,
    pointModel,
    offerModel,
    destinationModel,
    filterModel
  }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filters;
    const points = this.#pointModel.total;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
    }
    return filteredPoints;
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

  #renderNoPoints() {
    this.#NoPointComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#NoPointComponent, this.#container);
  }

  #renderPoints() {
    if (this.#pointModel.total.length === 0) {
      this.#renderNoPoints();
      return;
    }
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.#offerModel, this.#destinationModel);
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

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
      // Обновление одной задачи
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      // Обновление списка
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const taskCount = this.points.length;

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    if (this.#NoPointComponent) {
      remove(this.#NoPointComponent);
    }

    if (resetRenderedTaskCount) {
      this.#renderedTaskCount = POINTS_COUNT;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#renderedTaskCount = Math.min(taskCount, this.#renderedTaskCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }
}
