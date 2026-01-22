import {render, RenderPosition} from '../framework/render.js';
import {updateItem} from '../utils.js';
import SortView from '../view/sort/sort-view.js';
import PointListView from '../view/event-list/event-list-view.js';
import TaskPresenter from './task-presenter.js';

export default class BoardPresenter {
  #sortComponent = new SortView();
  #eventListComponent = new PointListView();
  #container = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #taskPresenters = new Map();
  #modelBoardPoints = [];

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
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    render(this.#eventListComponent, this.#container);

    for (let i = 0; i < this.#modelBoardPoints.length; i++) {
      this.#renderPoint(this.#modelBoardPoints[i], this.#offerModel, this.#destinationModel);
    }
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

  #handleModeChange = () => {
    this.#taskPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearTaskList() {
    this.#taskPresenters.forEach((presenter) => presenter.destroy());
    this.#taskPresenters.clear();
  }

  #handleTaskChange = (updatedTask) => {
    this.#modelBoardPoints = updateItem(this.#modelBoardPoints, updatedTask);
    this.#taskPresenters.get(updatedTask.id).init(updatedTask);
  };

}
