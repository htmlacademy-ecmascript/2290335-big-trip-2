import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
  #projectApiService = null;
  #points = [];

  constructor({projectApiService}) {
    super();
    this.#projectApiService = projectApiService;
  }

  get total() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#projectApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updateTask(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Нельзя обновить несуществующий элемент');
    }

    try {
      const response = await this.#projectApiService.updateTask(update);
      const updatedTask = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedTask,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedTask);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  async addTask(updateType, update) {
    try {
      const response = await this.#projectApiService.addTask(update);
      const newTask = this.#adaptToClient(response);
      this.#points = [newTask, ...this.#points];
      this._notify(updateType, newTask);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  async deleteTask(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    try {
      await this.#projectApiService.deleteTask(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete task');
    }
  }

  #adaptToClient(task) {
    const adaptedTask = {...task,
      basePrice: task['base_price'],
      dateFrom: task['date_from'],
      dateTo: task['date_to'],
      isFavorite: task['is_favorite']
    };

    delete adaptedTask['base_price'];
    delete adaptedTask['date_from'];
    delete adaptedTask['date_to'];
    delete adaptedTask['is_favorite'];
    return adaptedTask;
  }
}

