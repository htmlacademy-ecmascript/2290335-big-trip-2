import {render, RenderPosition, remove} from '../framework/render.js';
import InfoView from '../views/header-info/info-view.js';

export default class InfoPresenter {
  #container = null;
  #pointModel = null;
  #offerModel = null;
  #points = null;
  #infoViewComponent = null;
  #totalPrice = null;

  constructor({container, pointModel, offerModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#totalPrice = 0;
    // this.#infoViewComponent = new InfoView(this.#pointModel, this.#offerModel, this.#totalPrice);
  }

  init() {
    // console.table(this.#pointModel.total);
    this.renderContent();
  }

  renderComponent() {
    render(new InfoView(this.#pointModel, this.#offerModel, this.#totalPrice), this.#container, RenderPosition.AFTERBEGIN);
  }

  clearComponent() {
    remove(this.#infoViewComponent);
  }

  renderContent() {
    console.log('renderContent');
    this.calculateTotalPrice();
    console.log(this.#totalPrice);
    this.renderComponent();
  }

  calculatePointsPrice() {
    const allPoints = this.#pointModel.total;
    const allPointsPrices = allPoints.reduce((sum, current) => sum + current.basePrice, 0);
    console.log('allPointsPrices', allPointsPrices);
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
    console.log('allSelectedOffersPrices', allSelectedOffersPrices);
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
