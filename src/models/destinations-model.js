import { mockDestinations } from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = mockDestinations;
  // Все возможные маршруты
  get total() {
    return this.#destinations;
  }

  // Только маршруты из поинтов
  getDestinationById(id) {
    return this.total.find((item) => item.id === id);
  }
}
