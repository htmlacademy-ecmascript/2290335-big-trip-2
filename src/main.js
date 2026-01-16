import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';

const pointModel = new PointsModel();
const offerModel = new OffersModel();
const destinationModel = new DestinationsModel();

const mainPresenter = new MainPresenter(pointModel, offerModel, destinationModel);
mainPresenter.init();

