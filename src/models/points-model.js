import { mockOffers } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';
import { getRandomPoint } from '../mock/points.js';

const POINTS_COUNT = 3;

export default class PointModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  offers = mockOffers;
  destinations = mockDestinations;

  // Все возможные поинты
  getAllPoints() {
    return this.points;
  }

  // Все возможные офферы
  getAllOffers() {
    return this.offers;
  }

  // Все офферы по определенным типам: такси, автобус и прочее
  getAllOffersBySpecificType(type) {
    const allOffers = this.getAllOffers();
    return allOffers.find((offer) => offer.type === type);
  }

  // Только офферы из поинтов
  getOfferById(type, itemsId) {
    const offersType = this.getAllOffersBySpecificType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  // Все возможные маршруты
  getAllDestinations() {
    return this.destinations;
  }

  // Только маршруты из поинтов
  getDestinationById(id) {
    const allDestinations = this.getAllDestinations();
    return allDestinations.find((item) => item.id === id);
  }
}
