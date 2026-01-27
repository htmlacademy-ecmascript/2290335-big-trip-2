import AbstractView from '../../framework/view/abstract-view.js';
import {createCreationMenuTemplate} from './form-create-template.js';

export default class CreationFormView extends AbstractView {
  get template() {
    return createCreationMenuTemplate();
  }
}
