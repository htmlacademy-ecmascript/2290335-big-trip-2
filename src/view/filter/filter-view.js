import AbstractView from '../../framework/view/abstract-view.js';
import { createHeaderFiltersTemplate } from './filter-template.js';

export default class HeaderFiltersView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createHeaderFiltersTemplate(this.#filters);
  }
}
