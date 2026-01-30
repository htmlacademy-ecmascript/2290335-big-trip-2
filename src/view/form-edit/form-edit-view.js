import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {createEditFormTemplate} from './form-edit-template.js';

export default class EditFormView extends AbstractStatefulView {
  #point = null;
  #offers = null;
  #destination = null;
  #destinations = null;
  #checkedOffers = null;
  #handleFormSubmit = null;
  #handleFormClose = null;

  constructor({
    point,
    offers,
    destination,
    destinations,
    checkedOffers,
    onFormSubmit,
    onFormClose
  }) {
    super();
    this._setState(EditFormView.parsePointToState({point: point}));
    this.#offers = offers;
    this.#destination = destination;
    this.#destinations = destinations;
    this.#checkedOffers = checkedOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#registerEvents();
    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state, this.#offers, this.#destination, this.#destinations, this.#checkedOffers);
  }

  _restoreHandlers() {
    this.#registerEvents();
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    }
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  }

  static parsePointToState = ({point}) => ({point});
  static parseStateToPoint = (state) => state.point;

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({point: {...this._state.point, type: evt.target.value, offers: []}});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destination.find((pointDestination) => pointDestination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({point: {...this._state.point, destination: selectedDestinationId}});
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({point: {...this._state.point, offers: checkedBoxes.map((item) => item.dataset.offerId)}});
  };

  #priceChangeHandler = (evt) => {
    this._setState({point: {...this._state.point, basePrice: evt.target.value}});
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #registerEvents = () => {
    this.element?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
  };
}
