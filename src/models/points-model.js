import { getRandomPoint } from '../mock/points.js';

const POINTS_COUNT = 3;

export default class PointModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  // Все возможные поинты
  getAllPoints() {
    return this.#points;
  }
}
