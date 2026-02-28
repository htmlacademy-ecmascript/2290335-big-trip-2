import MainPresenter from './presenters/main-presenter.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';
import FiltersModel from './models/filters-model.js';
import ProjectApiService from './project-api-service.js';

const AUTHORIZATION = 'Basic lalala123';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const addPointButtonElement = document.querySelector('.trip-main__event-add-btn');

const pointModel = new PointsModel({
  projectApiService: new ProjectApiService(END_POINT, AUTHORIZATION)
});
const offerModel = new OffersModel({
  projectApiService: new ProjectApiService(END_POINT, AUTHORIZATION)
});
const destinationModel = new DestinationsModel({
  projectApiService: new ProjectApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FiltersModel();


Promise.all([offerModel.init(), destinationModel.init()]).finally(() => {
  pointModel.init();
});

const mainPresenter = new MainPresenter(pointModel, offerModel, destinationModel, filterModel);
mainPresenter.init();

addPointButtonElement.addEventListener('click', addPointButtonClickHandler);

function addPointButtonClickHandler() {
  mainPresenter.boardPresenter.createTask();
  addPointButtonElement.disabled = true;
}

