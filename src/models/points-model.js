import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
  #tasksApiService = null;
  #points = [];

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
    this.#tasksApiService.tasks.then((tasks) => {
      console.log(tasks);
    });
  }

  get total() {
    return this.#points;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#points = tasks.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  }

  updateTask(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Нельзя обновить несуществующий элемент');
    }

    this.#points = [...this.#points.slice(0, index), update, ...this.#points.slice(index + 1),];

    this._notify(updateType, update);
  }

  addTask(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deleteTask(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
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

