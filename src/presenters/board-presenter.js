import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import {POINTS_COUNT, SortType, UserAction, UpdateType, FilterType} from '../const.js';
import {sortByTime, sortByPrice, sortByDefault} from '../utils/utils-point.js';
import {filter} from '../utils/utils-filter.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import SortView from '../views/sort/sort-view.js';
import PointListView from '../views/point-list/point-list-view.js';
import EmptyListView from '../views/empty-list/empty-list-view.js';
import LoadingView from '../views/loading/loading-view.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

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
  #filterType = FilterType.EVERYTHING;
  #noPointComponent = null;
  #newPointPresenter = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({
    container,
    pointModel,
    offerModel,
    destinationModel,
    filterModel,
    onNewTaskDestroy
  }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#newPointPresenter = new NewPointPresenter({
      points: this.#pointModel,
      offers: this.#offerModel,
      destinations: this.#destinationModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTaskDestroy
    });
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.total;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDefault);
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

  createTask() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#pointModel.total.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    // console.log(this.#container);
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
    this.#noPointComponent = new EmptyListView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#container);
  }

  #renderPoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.#offerModel, this.#destinationModel);
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
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
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // - Преображаем поинт
  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updateTask(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TASK:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addTask(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TASK:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deleteTask(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
        this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const taskCount = this.points.length;
    this.#newPointPresenter.destroy();

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
    remove(this.#loadingComponent);

    if (resetRenderedTaskCount) {
      this.#renderedTaskCount = POINTS_COUNT;
    } else {
      this.#renderedTaskCount = Math.min(taskCount, this.#renderedTaskCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
