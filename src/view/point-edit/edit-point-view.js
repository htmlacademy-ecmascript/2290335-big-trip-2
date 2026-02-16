import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {templateEditPointView} from './edit-point-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditPointView extends AbstractStatefulView {
  #selectedOffers = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #allOffers = null;
  #allDestinations = null;
  #datepicker = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;

  constructor({
    concretePoint,
    concreateOffers,
    concreateDestination,
    selectedOffers,
    onFormSubmit,
    onFormClose,
    onDeleteClick,
    offers,
    destinations
  }) {
    super();
    this._setState(EditPointView.parseTaskToState({
      point: concretePoint,
      offers: concreateOffers,
      destination: concreateDestination,
      selectedOffers: selectedOffers
    }));
    this.#selectedOffers = selectedOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#allOffers = offers;
    this.#allDestinations = destinations;
    this.#handleDeleteClick = onDeleteClick;
    this.#registerEvents();
  }

  static parseTaskToState = ({point, offers, destination, selectedOffers}) => ({point, offers, destination, selectedOffers});
  static parseStateToTask = (state) => state.point;

  get template() {
    // console.log('На входе: ', this._state);
    return templateEditPointView(this._state, this.#allDestinations);
  }

  #typeChangeHandler = (evt) => {
    console.log('Type change');
    this.updateElement({point: {...this._state.point, type: evt.target.value, offers: []}});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#allDestinations.find((pointDestination) => pointDestination.name === evt.target.value);
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
    if (this.concreateOffers > 0) {
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
