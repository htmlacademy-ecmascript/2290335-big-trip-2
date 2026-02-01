import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {templateEditFormView} from './form-edit-template.js';

export default class EditFormView extends AbstractStatefulView {
  #specialOffers = null;
  #destinations = null;
  #checkedOffers = null;
  #handleFormSubmit = null;
  #handleFormClose = null;

  constructor({
    concretePoint,
    specialOffers,
    concreateDestination,
    destinations,
    checkedOffers,
    onFormSubmit,
    onFormClose
  }) {
    super();
    this._setState(EditFormView.parseTaskToState({
      point: concretePoint,
      destination: concreateDestination
    }));
    this.#specialOffers = specialOffers;
    this.#destinations = destinations;
    this.#checkedOffers = checkedOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#registerEvents();
  }

  get template() {
    // console.log('ActiveDestination: ', this.#activeDestination, 'Состояние конкретного поинта: ', this._state);
    // console.log(this._state);
    return templateEditFormView(this._state, this.#specialOffers, this.#destinations, this.#checkedOffers);
  }

  _restoreHandlers() {
    this.#registerEvents();
  }

  static parseTaskToState = ({point, destination}) => ({point, destination});
  static parseStateToTask = (state) => state.point;

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToTask(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({point: {...this._state.point, type: evt.target.value, offers: []}});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((pointDestination) => pointDestination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({point: {...this._state.point, destination: selectedDestinationId}});
    this.updateElement({destination: selectedDestination});
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
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    }
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  };
}
