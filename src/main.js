import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';
import FilterModel from './models/filters-model.js';

const pointModel = new PointsModel();
const offerModel = new OffersModel();
const destinationModel = new DestinationsModel();
const filterModel = new FilterModel();


const mainPresenter = new MainPresenter(pointModel, offerModel, destinationModel, filterModel);
mainPresenter.init();


const createPointButtonElement = document.querySelector('.trip-main__event-add-btn');
createPointButtonElement.addEventListener('click', handleNewPointButtonClick);

function handleNewPointButtonClick() {
  mainPresenter.boardPresenter.createTask();
  createPointButtonElement.disabled = true;
}

