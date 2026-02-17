import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';
import FilterModel from './models/filters-model.js';
import TasksApiService from './tasks-api-service.js';

const AUTHORIZATION = 'Basic lalala123';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const pointModel = new PointsModel({
  tasksApiService: new TasksApiService(END_POINT, AUTHORIZATION)
});
const offerModel = new OffersModel({
  tasksApiService: new TasksApiService(END_POINT, AUTHORIZATION)
});
const destinationModel = new DestinationsModel({
  tasksApiService: new TasksApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();
pointModel.init();
offerModel.init();
destinationModel.init();
const mainPresenter = new MainPresenter(pointModel, offerModel, destinationModel, filterModel);
mainPresenter.init();


const createPointButtonElement = document.querySelector('.trip-main__event-add-btn');
createPointButtonElement.addEventListener('click', handleNewPointButtonClick);

function handleNewPointButtonClick() {
  mainPresenter.boardPresenter.createTask();
  createPointButtonElement.disabled = true;
}

