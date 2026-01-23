import AbstractView from '../../framework/view/abstract-view.js';
import { createSortTemplate } from './sort-template.js';


export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.classList.contains('filter-avaible')) {
      evt.preventDefault();
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }
  };
}
