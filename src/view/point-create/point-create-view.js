import AbstractView from '../../framework/view/abstract-view.js';
import {templateCreatePoint} from './point-create-template.js';

export default class CreatePointView extends AbstractView {
  get template() {
    return templateCreatePoint();
  }
}
