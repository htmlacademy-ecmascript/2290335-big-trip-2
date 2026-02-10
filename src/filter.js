import dayjs from 'dayjs';
import {FilterType} from './const.js';

// function isPointInPastTime(dateTo) {
//   return dateTo && dayjs(dateTo).isBefore(dayjs(), 'D');
// }

// function isPontInFutureTime(dateTo) {
//   return dateTo && dayjs(dateTo).isAfter(dayjs(), 'D');
// }

// function isPointInPresentTime(dateTo) {
//   return dateTo && dayjs(dateTo).isSame(dayjs(), 'D');
// }

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  // [FilterType.FUTURE]: (points) => points.filter((point) => isPontInFutureTime(point.dateTo)),
  // [FilterType.PRESENT]: (points) => points.filter((point) => isPointInPresentTime(point.dateTo)),
  // [FilterType.PAST]: (points) => points.filter((point) => isPointInPastTime(point.dateTo)),
};

export {filter};
