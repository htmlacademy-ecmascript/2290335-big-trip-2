import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {templateCreatePointView} from './new-point-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const blankPoint = {
  basePrice: 1,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

export default class NewPoinView extends AbstractStatefulView {
  #checkedOffers = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #offers = null;
  #destinations = null;
  #datepicker = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;

  constructor({
    onFormSubmit,
    onFormClose,
    onDeleteClick,
    offers,
    destinations,
  }) {
    super();
    this._setState(NewPoinView.parseTaskToState({point: blankPoint}));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#registerEvents();
  }

  static parseTaskToState ({point}) {
    const task = {point};
    task.point.isDisabled = false;
    task.point.isSaving = false;
    task.point.isDeleting = false;

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
    return templateCreatePointView(this._state, this.#destinations, this.#offers);
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
    // console.log(this._state.point.offers);
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
    this.#handleFormSubmit(NewPoinView.parseStateToTask(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(NewPoinView.parseStateToTask(this._state));
  };

  // Календарик
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

    // Меняет point/offers внутри состояния при клике на элементы от concreateOffers(без отрисовки)
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    }

    // Меняет point/destination внутри состояния при изменении города(с отрисовкой)
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    // Меняет point/basePrice внутри состояния при изменении цены(без отрисовки)
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    // if (this.element.querySelector('.event__available-offers')) {
    //   this.element.querySelector('.event__type-group').addEventListener('change', this.#offerChangeHandler);
    // }
    // Сохраняет информацию point #handleFormSubmit(UserAction.UPDATE_TASK, UpdateType.MINOR, point)
    this.element?.addEventListener('submit', this.#formSubmitHandler);
    // Сворачивает point
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
    // Удаляет point #handlePointChange(UserAction.DELETE_TASK, UpdateType.MINOR, point)
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.#setDatepickers();
  };
}
