import AbstractView from '../../framework/view/abstract-view.js';
import {SortType} from '../../const.js';
import {templateSort} from './sort-template.js';


export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;
  #sortTypes = SortType;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return templateSort(this.#sortTypes, this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.classList.contains('filter-avaible')) {
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }
  };
}
