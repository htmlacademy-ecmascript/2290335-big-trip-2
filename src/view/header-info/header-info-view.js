import AbstractView from '../../framework/view/abstract-view.js';
import { createHeaderInfoTemplate } from './header-info-template.js';

export default class HeaderInfoView extends AbstractView {
  get template() {
    return createHeaderInfoTemplate();
  }
}

