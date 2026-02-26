import AbstractView from '../../framework/view/abstract-view';

const text = 'Failed to load latest route information';

function createInfoMessage() {
  return (
    `<p class="trip-events__msg">${text}</p>`
  );
}

export default class InfoMessageView extends AbstractView {
  get template() {
    return createInfoMessage();
  }
}

