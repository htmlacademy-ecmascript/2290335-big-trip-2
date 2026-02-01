import {DATE_FORMAT, POINTS_TYPE} from '../../const.js';
import {humanizeDueDate} from '../../utils/task-utils.js';

function templateType(type) {
  return (
    `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
      </div> `
  );
}

function templateDescription(description) {
  return (
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
      </section>`
  );
}

function templateOffer(offer, checkedOffers) {
  const {id, title, price} = offer;
  const isChecked = checkedOffers.map((item) => item.id).includes(id) ? 'checked' : '';
  return (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${id}" ${isChecked}>
        <label class="event__offer-label" for="${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`
  );
}

function templateOffers(offers, checkedOffers) {
  return offers.length > 0 ? `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers.map((offer) => templateOffer(offer, checkedOffers)).join('')}
      </dv>
    </section>
    ` : '';
}

function templateDestinationOption(destination) {
  return (
    `<option value="${destination.name}">${destination.name}</option>`
  );
}

function getDestinationListTemplate(name, type, destinations) {
  return (
    `<label class="event__label  event__type-output" for="event-destination-1">${type}</label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${templateDestinationOption(destinations[0])}
        ${templateDestinationOption(destinations[1])}
        ${templateDestinationOption(destinations[2])}
      </datalist>`
  );
}

function templateEditFormView(state, offers, concreateDestination, destinations, checkedOffers) {
  const { point: {type, dateFrom, dateTo, basePrice, } } = state;
  const { name, description } = concreateDestination;
  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${POINTS_TYPE.map((item) => templateType(item)).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          ${getDestinationListTemplate(name, type, destinations)}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDueDate(dateFrom, DATE_FORMAT.dayHours)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDueDate(dateTo, DATE_FORMAT.dayHours)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${templateOffers(offers, checkedOffers)}
        ${templateDescription(description)}
      </section>
</form>`);
}

export {templateEditFormView};
