import { mockDestinations } from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = mockDestinations;
  // Все возможные маршруты
  getAllDestinations() {
    return this.#destinations;
  }

  // Только маршруты из поинтов
  getDestinationById(id) {
    const allDestinations = this.getAllDestinations();
    return allDestinations.find((item) => item.id === id);
  }
}
