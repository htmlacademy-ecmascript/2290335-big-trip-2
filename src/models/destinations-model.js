import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class DestinationsModel extends Observable{
  #projectApiService = null;
  #destinations = [];

  constructor({projectApiService}) {
    super();
    this.#projectApiService = projectApiService;
  }

  get total() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#projectApiService.destinations;
      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#destinations = [];
      this._notify(UpdateType.ERROR);
    }
  }

  getDestinationById(id) {
    return this.total.find((item) => item.id === id);
  }
}
