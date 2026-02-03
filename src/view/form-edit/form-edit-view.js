import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {templateEditFormView} from './form-edit-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditFormView extends AbstractStatefulView {
  #checkedOffers = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #allOffers = null;
  #allDestinations = null;
  #datepicker = null;

  constructor({
    concretePoint,
    concreateOffers,
    checkedOffers,
    concreateDestination,
    onFormSubmit,
    onFormClose,
    offers,
    destinations,
  }) {
    super();
    this._setState(EditFormView.parseTaskToState({
      point: concretePoint,
      offers: concreateOffers,
      destination: concreateDestination
    }));
    this.#checkedOffers = checkedOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#allOffers = offers;
    this.#allDestinations = destinations;
    this.#registerEvents();
  }

  get template() {
    console.log(this._state);
    return templateEditFormView(this._state, this.#allDestinations, this.#checkedOffers);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  #dueDateChangeHandler = ([userDate]) => {
    this.updateElement({point: {...this._state.point, dateFrom: userDate}});
  };

  #setDatepicker() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        locale: {firstDayOfWeek: 1}, 'time_24hr': true,
        defaultDate: this._state.point.dateFrom,
        onChange: this.#dueDateChangeHandler,
      },
    );
  }

  _restoreHandlers() {
    this.#registerEvents();
  }

  static parseTaskToState = ({point, offers, destination}) => ({point, offers, destination});
  static parseStateToTask = (state) => state.point;

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToTask(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({point: {...this._state.point, type: evt.target.value, offers: []}});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#allDestinations.find((pointDestination) => pointDestination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({point: {...this._state.point, destination: selectedDestinationId}});
    this.updateElement({destination: selectedDestination});
  };

  #offerChangeHandler = () => {
    // const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const specialOffers = this.#allOffers.find((item) => item.type === this._state.point.type);
    this.updateElement({point: {...this._state.point, offers: specialOffers.offers}});
    this.updateElement({offers: specialOffers.offers});
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
      this.element.querySelector('.event__type-group').addEventListener('change', this.#offerChangeHandler);
    }
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.#setDatepicker();
  };
}
