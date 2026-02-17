import AbstractView from '../../framework/view/abstract-view.js';
import {templateHeaderFilters} from './header-filter-template.js';

export default class HeaderFilterView extends AbstractView {
  #activeFilter = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({activeFilter, currentFilterType, onFilterTypeChange}) {
    super();
    this.#activeFilter = activeFilter;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return templateHeaderFilters(this.#activeFilter, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
