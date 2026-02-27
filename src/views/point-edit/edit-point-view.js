import flatpickr from 'flatpickr';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {templateEditPointView} from './edit-point-template.js';
import 'flatpickr/dist/flatpickr.min.css';

const pointBlank = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

export default class EditPointView extends AbstractStatefulView {
  #concretePoint = null;
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #handleDeleteClick = null;
  #datepicker = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({
    concretePoint,
    offers,
    destinations,
    onFormSubmit,
    onFormClose,
    onDeleteClick,
  }) {
    super();
    this.#concretePoint = concretePoint;
    this.getPointBlank();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#handleDeleteClick = onDeleteClick;
    this._setState(EditPointView.parseTaskToState({point: this.#concretePoint}));
    this.#registerEvents();
  }

  getPointBlank() {
    if (!this.#concretePoint) {
      this.#concretePoint = pointBlank;
    }
  }

  static parseTaskToState ({point}) {
    const task = {point};
    task.isDisabled = false;
    task.isSaving = false;
    task.isDeleting = false;
    return task;
  }

  static parseStateToTask(state) {
    const task = state.point;
    delete task.isDisabled;
    delete task.isSaving;
    delete task.isDeleting;
    return task;
  }

  get template() {
    return templateEditPointView(this._state, this.#destinations, this.#offers);
  }

  #typeChangeHandler = (evt) => {
    this.updateElement({point: {...this._state.point, type: evt.target.value, offers: []}});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((pointDestination) => pointDestination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({point: {...this._state.point, destination: selectedDestinationId}});
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const selectedOffersId = checkedBoxes.map((element) => element.id);
    this._setState({point: {...this._state.point, offers: selectedOffersId}});
  };

  #priceChangeHandler = (evt) => {
    this._setState({point: {...this._state.point, basePrice: evt.target.value}});
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToTask(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToTask(this._state));
  };

  #setDatepickers() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1}, 'time_24hr': true,
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateFrom,
        maxDate: this._state.point.dateTo,
        onChange: this.#dateFromHandler,
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateTo,
        minDate: this._state.point.dateFrom,
        onChange: this.#dateToHandler,
      }
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  #dateFromHandler = ([userDate]) => {
    this.updateElement({point: {...this._state.point, dateFrom: userDate}});
  };

  #dateToHandler = ([userDate]) => {
    this.updateElement({point: {...this._state.point, dateTo: userDate}});
  };

  _restoreHandlers() {
    this.#registerEvents();
  }

  #registerEvents = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', (evt) => {
      let value = evt.target.value;
      value = value.replace(/\D/g, '');
      value = value.replace(/^0+/, '');
      evt.target.value = value;
    });
    this.#setDatepickers();
  };
}
