import {render, RenderPosition, remove} from '../framework/render.js';
import {DATE_FORMAT} from '../const.js';
import {humanizeDueDate} from '../utils/utils-point.js';
import InfoView from '../views/header-info/info-view.js';

export default class InfoPresenter {
  #container = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #infoViewComponent = null;
  #totalPrice = null;
  #firstCity = null;
  #middleCity = null;
  #lastCity = null;
  #startTripDay = null;
  #endTripDay = null;

  constructor({container, pointModel, destinationModel, offerModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#startTripDay = '';
    this.#endTripDay = '';
    this.#firstCity = '';
    this.#middleCity = ' ... ';
    this.#lastCity = '';
    this.#totalPrice = 0;
  }

  init() {
    this.renderContent();
  }

  renderComponent() {
    this.#infoViewComponent = new InfoView(
      this.#startTripDay,
      this.#endTripDay,
      this.#firstCity,
      this.#middleCity,
      this.#lastCity,
      this.#totalPrice);
    render(this.#infoViewComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  clearComponent() {
    remove(this.#infoViewComponent);
  }

  renderContent() {
    this.clearComponent();
    this.defineRouteCities();
    this.defineRouteDates();
    this.calculateTotalPrice();
    this.renderComponent();
    console.table(this.#pointModel.total);
  }

  defineRouteCities() {
    const allPoints = this.#pointModel.total;
    const allDestinations = this.#destinationModel.total;
    const firstCity = allDestinations.find((item) => item.id === allPoints[0].destination).name,
      lastCity = allDestinations.find((item) => item.id === allPoints[allPoints.length - 1].destination).name;

    if (allPoints.length <= 3) {
      this.#middleCity = allDestinations.find((item) => item.id === allPoints[allPoints.length - 2].destination).name;
    }
    this.#firstCity = firstCity;
    this.#lastCity = lastCity;
  }

  defineRouteDates() {
    const allPoints = this.#pointModel.total;
    const startTripDay = humanizeDueDate(allPoints[0].dateFrom, DATE_FORMAT.monthDay),
      endTripDay = humanizeDueDate(allPoints[allPoints.length - 1].dateTo, DATE_FORMAT.monthDay);
    this.#startTripDay = startTripDay;
    this.#endTripDay = endTripDay;
  }

  calculatePointsPrice() {
    const allPoints = this.#pointModel.total;
    const allPointsPrices = allPoints.reduce((sum, current) => sum + current.basePrice, 0);
    return allPointsPrices;
  }

  calculateOffersPrice() {
    const allPoints = this.#pointModel.total;
    const allSelectedOffers = [];

    allPoints.forEach((point) => {
      const {offers} = point;

      if (offers.length) {
        const specialTypeOffers = this.#offerModel.getAllOffersBySpecificType(point.type).offers;
        for (let i = 0; i < offers.length; i++) {
          const singleSelectedOffer = specialTypeOffers.filter((item) => offers[i] === item.id);
          allSelectedOffers.push(singleSelectedOffer);
        }
      }
    });
    const allSelectedOffersPrices = allSelectedOffers.flat().reduce((sum, current) => sum + current.price, 0);
    return allSelectedOffersPrices;
  }

  calculateTotalPrice() {
    const totalPrice = this.calculatePointsPrice() + this.calculateOffersPrice();
    this.#totalPrice = totalPrice;
    return totalPrice;
  }

  #handleModelEvent = () => {
    this.init();
  };

}
