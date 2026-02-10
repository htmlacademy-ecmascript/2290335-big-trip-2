import AbstractView from '../../framework/view/abstract-view.js';
import {FilterType} from '../../const.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Нет вообще поинтов',
  [FilterType.FUTURE]: 'В планах нет поинтов',
  [FilterType.PRESENT]: 'На сегодня нет поинтов',
  [FilterType.PAST]: 'В прошлом нет поинтов',
};

function templateNoPoint(filterType) {
  const noPointTextValue = NoTasksTextType[filterType];
  return (
    `<h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">${noPointTextValue}</p>`
  );
}

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return templateNoPoint(this.#filterType);
  }
}
