import dayjs from 'dayjs';
import {render, RenderPosition, remove} from '../framework/render.js';
import {DATE_FORMAT} from '../const.js';
import {humanizeDueDate} from '../utils/utils-point.js';
import InfoView from '../views/header-info/info-view.js';

export default class InfoPresenter {
  #container = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #startTripDay = null;
  #endTripDay = null;
  #firstCity = null;
  #middleCity = null;
  #lastCity = null;
  #totalPrice = null;
  #infoViewComponent = null;

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
    this.renderBoard();
  }

  clearComponent() {
    remove(this.#infoViewComponent);
  }

  calculateInfo() {
    const allPoints = this.#pointModel.total;
    if (allPoints.length > 0) {
      this.defineRouteCities();
      this.defineRouteDates();
    }
  }

  defineRouteCities() {
    const allPoints = this.#pointModel.total;
    const allDestinations = this.#destinationModel.total;

    const oldestCityId = allPoints.reduce((min, current) => dayjs(current.dateFrom).isBefore(dayjs(min.dateFrom)) ? current : min).destination;
    const oldestCity = allDestinations.find((item) => item.id === oldestCityId).name;
    const freshCityId = allPoints.reduce((max, current) => dayjs(current.dateFrom).isAfter(dayjs(max.dateFrom)) ? current : max).destination;
    const freshCity = allDestinations.find((item) => item.id === freshCityId).name;
    this.#firstCity = oldestCity;
    this.#lastCity = freshCity;
    this.#middleCity = ' ... ';
    if (allPoints.length === 3) {
      this.#middleCity = allDestinations.find((item) => item.id === allPoints[allPoints.length - 2].destination).name;
    }
    if (allPoints.length === 0) {
      this.#firstCity = ' ... ';
      this.#lastCity = ' ... ';
    }
  }

  defineRouteDates() {
    const allPoints = this.#pointModel.total;
    const oldestTimeISO = allPoints.reduce((min, current) => dayjs(current.dateFrom).isBefore(dayjs(min.dateFrom)) ? current : min).dateFrom;
    const oldestTime = humanizeDueDate(oldestTimeISO, DATE_FORMAT.MONTHDAY);
    const freshTimeISO = allPoints.reduce((max, current) => dayjs(current.dateFrom).isAfter(dayjs(max.dateFrom)) ? current : max).dateFrom;
    const freshTime = humanizeDueDate(freshTimeISO, DATE_FORMAT.MONTHDAY);
    this.#startTripDay = oldestTime;
    this.#endTripDay = freshTime;
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

  renderBoard() {
    this.clearComponent();
    this.calculateInfo();
    this.calculateTotalPrice();
    this.#infoViewComponent = new InfoView(
      this.#startTripDay,
      this.#endTripDay,
      this.#firstCity,
      this.#middleCity,
      this.#lastCity,
      this.#totalPrice,
    );
    render(this.#infoViewComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.init();
  };

}
