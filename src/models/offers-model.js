import Observable from '../framework/observable.js';
import {mockOffers} from '../mock/offers.js';

export default class OffersModel extends Observable {
  #tasksApiService = null;
  #offers = mockOffers;

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;

    this.#tasksApiService.offers.then((offers) => {
      console.log(offers);
    });
  }

  // Все возможные офферы
  get total() {
    return this.#offers;
  }

  // Все офферы по определенным типам: такси, автобус и прочее
  getAllOffersBySpecificType(type) {
    return this.total.find((offer) => offer.type === type);
  }

  // Только офферы из поинтов
  getOfferById(type, itemsId) {
    const offersType = this.getAllOffersBySpecificType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }
}
