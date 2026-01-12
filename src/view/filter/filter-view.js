import AbstractView from '../../framework/view/abstract-view.js';
import { createHeaderFiltersTemplate } from './filter-template.js';

export default class HeaderFiltersView extends AbstractView {
  get template() {
    return createHeaderFiltersTemplate();
  }
}
