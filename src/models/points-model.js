import { mockOffers } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';
import { getRandomPoints } from '../mock/points.js';

const POINTS_COUNT = 3;

export default class PointModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoints);
  offers = mockOffers;
  destinations = mockDestinations;

  getPoint() {
    return this.points;
  }

  getOffer() {
    return this.offers;
  }

  getOfferByTipe(type) {
    const allOffers = this.getOffer();
    return allOffers.find((offer) => offer.type === type);
  }

  getOfferById(type, itemsId) {
    const offersType = this.getOfferByTipe(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  getDestination() {
    return this.destinations;
  }

  getDestinationById(id) {
    const allDestinations = this.getDestination();
    return allDestinations.find((item) => item.id === id);
  }
}
