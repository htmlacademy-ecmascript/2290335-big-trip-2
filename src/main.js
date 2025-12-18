import { render } from './render.js';
import HeaderInfo from './view/header-info-view.js';
import HeaderFilters from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';

// Содержимое хедера
const pageHeaderContainer = document.querySelector('.page-header__container');
const tripMainElement = pageHeaderContainer.querySelector('.trip-main');
const filterContainer = pageHeaderContainer.querySelector('.trip-controls__filters');

// Основное содержимое
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({container: tripEventsElement});

render(new HeaderInfo(), tripMainElement);
render(new HeaderFilters, filterContainer);
boardPresenter.init();

