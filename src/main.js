import MainPresenter from './presenters/main-presenter.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';
import FilterModel from './models/filters-model.js';
import ProjectApiService from './project-api-service.js';

const AUTHORIZATION = 'Basic lalala123';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const pointModel = new PointsModel({
  projectApiService: new ProjectApiService(END_POINT, AUTHORIZATION)
});
const offerModel = new OffersModel({
  projectApiService: new ProjectApiService(END_POINT, AUTHORIZATION)
});
const destinationModel = new DestinationsModel({
  projectApiService: new ProjectApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

Promise.all([offerModel.init(), destinationModel.init()]).finally(() => {
  pointModel.init();
});

const mainPresenter = new MainPresenter(pointModel, offerModel, destinationModel, filterModel);
mainPresenter.init();


const createPointButtonElement = document.querySelector('.trip-main__event-add-btn');
createPointButtonElement.addEventListener('click', handleNewPointButtonClick);

function handleNewPointButtonClick() {
  mainPresenter.boardPresenter.createTask();
  createPointButtonElement.disabled = true;
}

