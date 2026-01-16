import { mockOffers } from '../mock/offers.js';

export default class OffersModel {
  #offers = mockOffers;
  // Все возможные офферы
  getAllOffers() {
    return this.#offers;
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
}
