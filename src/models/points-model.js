import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mock/points.js';

const POINTS_COUNT = 3;

export default class PointsModel extends Observable {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  // Все возможные поинты
  get total() {
    return this.#points;
  }
}

