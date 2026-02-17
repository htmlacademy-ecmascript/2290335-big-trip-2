import Observable from '../framework/observable.js';
import {getRandomPoint} from '../mock/points.js';
import {POINTS_COUNT} from '../const.js';

export default class PointsModel extends Observable {
  #tasksApiService = null;
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;

    this.#tasksApiService.tasks.then((tasks) => {
      console.log(tasks.map(this.#adaptToClient));
    });
  }

  // Все возможные поинты
  get total() {
    return this.#points;
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

    // Ненужные ключи мы удаляем
    delete adaptedTask['base_price'];
    delete adaptedTask['date_from'];
    delete adaptedTask['date_to'];
    delete adaptedTask['is_favorite'];

    return adaptedTask;
  }
}

