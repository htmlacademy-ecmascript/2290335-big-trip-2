import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destinations.js';

export default class DestinationsModel extends Observable{
  #destinations = mockDestinations;
  #tasksApiService = null;

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;

    this.#tasksApiService.destinations.then((destinations) => {
      console.log(destinations);
    });
  }

  // Все возможные маршруты
  get total() {
    return this.#destinations;
  }

  // Только маршруты из поинтов
  getDestinationById(id) {
    return this.total.find((item) => item.id === id);
  }
}
