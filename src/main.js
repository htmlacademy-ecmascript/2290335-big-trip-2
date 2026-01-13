import MainPresenter from './presenter/main-presenter.js';
import PointModel from './models/points-model.js';
import OfferModel from './models/offers-model.js';
import DestinationModel from './models/destinations-model.js';

const pointModel = new PointModel();
const offerModel = new OfferModel();
const destinationModel = new DestinationModel();

const mainPresenter = new MainPresenter(pointModel, offerModel, destinationModel);
mainPresenter.init();

