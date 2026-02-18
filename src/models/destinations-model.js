import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class DestinationsModel extends Observable{
  #tasksApiService = null;
  #destinations = [];

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get total() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#tasksApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  // Только маршруты из поинтов
  getDestinationById(id) {
    return this.total.find((item) => item.id === id);
  }
}
