import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class OffersModel extends Observable {
  #projectApiService = null;
  #offers = [];

  constructor({projectApiService}) {
    super();
    this.#projectApiService = projectApiService;
  }

  get total() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#projectApiService.offers;
      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#offers = [];
      this._notify(UpdateType.ERROR);
    }
  }

  getAllOffersBySpecificType(type) {
    return this.total.find((offer) => offer.type === type);
  }

  getOfferById(type, itemsId) {
    const offersType = this.getAllOffersBySpecificType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }
}
