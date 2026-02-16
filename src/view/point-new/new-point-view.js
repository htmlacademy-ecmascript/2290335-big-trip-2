import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {templateCreatePointView} from './new-point-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const blankPoint = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [
    {
      id: 'f4b62001-293f-4c3d-a702-94eec4a2808c',
      title: 'Luggage and overall cargo',
      price: 150
    },
    {
      id: 'f4b62002-293f-4c3d-a702-94eec4a2808c',
      title: 'Have a heart-to-heart talk with driver',
      price: 0
    },
    {
      id: 'f4b62003-293f-4c3d-a702-94eec4a2808c',
      title: 'City guide services',
      price: 5000
    },
    {
      id: 'f4b62004-293f-4c3d-a702-94eec4a2808c',
      title: 'Selecting a radio station',
      price: 50
    },
    {
      id: 'f4b62005-293f-4c3d-a702-94eec4a2808b',
      title: 'Upgrade to tariff',
      price: 120
    },
  ],
  type: 'taxi',
};

export default class NewPoinView extends AbstractStatefulView {
  #checkedOffers = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #allOffers = null;
  #allDestinations = null;
  #datepicker = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;

  constructor({
    offers,
    destinations,
    onFormSubmit,
    onDeleteClick,
    onFormClose
  }) {
    super();

    this._setState(NewPoinView.parseTaskToState({
      point: blankPoint,
      offers: blankPoint.offers,
      destination: blankPoint.destination
    }));
    this.#allOffers = offers.total;
    this.#allDestinations = destinations;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#registerEvents();
  }

  get template() {
    return templateCreatePointView(this._state, this.#allDestinations.total);
  }

  static parseTaskToState = ({point, offers, destination}) => ({point, offers, destination});
  static parseStateToTask = (state) => state.point;


  #typeChangeHandler = (evt) => {
    this.updateElement({point: {...this._state.point, type: evt.target.value, offers: []}});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#allDestinations.total.find((pointDestination) => pointDestination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({point: {...this._state.point, destination: selectedDestinationId}});
    this.updateElement({destination: selectedDestination});
  };

  #offerChangeHandler = () => {
    const specialOffers = this.#allOffers.find((item) => item.type === this._state.point.type);
    console.log(specialOffers);
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

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(NewPoinView.parseStateToTask(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(NewPoinView.parseStateToTask(this._state));
  };

  // Календарик. Ничего интересного
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
    this.element?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__type-group').addEventListener('change', this.#offerChangeHandler);
    }
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.#setDatepickers();
  };
}
