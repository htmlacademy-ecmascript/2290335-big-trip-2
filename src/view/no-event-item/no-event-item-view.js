import AbstractView from '../../framework/view/abstract-view.js';

export default class NoPointView extends AbstractView {
  get template() {
    return (
      `<h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">Click New Event to create your first point</p>`
    );
  }
}
