import {render, RenderPosition} from '../framework/render.js';
import {updateItem} from '../utils/common-utils.js';
import {sortByTime, sortByPrice} from '../utils/task-utils.js';
import SortView from '../view/sort/sort-view.js';
import {SortType} from '../const.js';
import PointListView from '../view/event-list/event-list-view.js';
import NoPointView from '../view/no-event-item/no-event-item-view.js';
import TaskPresenter from './task-presenter.js';

export default class BoardPresenter {
  #sortComponent = null;
  #eventListComponent = new PointListView();
  #container = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #taskPresenters = new Map();
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

  init() {
    this.#modelBoardPoints = [...this.#pointModel.getAllPoints()];
    this.#startedBoardPoints = [...this.#pointModel.getAllPoints()];
    this.#renderSortAndPointsList();
    this.#renderPoints();
  }

  #renderPoint(task, offers, destinations) {
    const taskPresenter = new TaskPresenter({
      taskListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleTaskChange,
      onModeChange: this.#handleModeChange,
      offers,
      destinations
    });
    taskPresenter.init(task);
    this.#taskPresenters.set(task.id, taskPresenter);
  }

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

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderSortAndPointsList() {
    this.#renderSort();
    render(this.#eventListComponent, this.#container);
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

  #handleModeChange = () => {
    this.#taskPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearTaskList() {
    this.#taskPresenters.forEach((presenter) => presenter.destroy());
    this.#taskPresenters.clear();
  }

  #handleTaskChange = (updatedTask) => {
    this.#modelBoardPoints = updateItem(this.#modelBoardPoints, updatedTask);
    this.#startedBoardPoints = updateItem(this.#startedBoardPoints, updatedTask);
    this.#taskPresenters.get(updatedTask.id).init(updatedTask);
  };

}
