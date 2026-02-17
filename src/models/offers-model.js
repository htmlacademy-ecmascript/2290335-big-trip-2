import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class OffersModel extends Observable {
  #tasksApiService = null;
  #offers = [];

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get total() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#tasksApiService.offers;
    } catch(err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
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
