import {render, RenderPosition} from '../framework/render.js';
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
    return this.#pointModel.total;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    render(this.#eventListComponent, this.#container);
    this.#renderPoints();
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      eventListComponent: this.#eventListComponent.element,
      // onDataChange: this.#handlePointChange,
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
  // #handlePointChange = (updatedPoint) => {
  //   this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  // };
  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

}
