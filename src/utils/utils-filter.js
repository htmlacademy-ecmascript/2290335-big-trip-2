import dayjs from 'dayjs';
import {FilterType} from '../const.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function getPointsFromPast(point) {
  const endTime = point.dateTo;
  return endTime && dayjs(endTime).isBefore(dayjs(), 'D');
}

function getPointsFromFuture(point) {
  const startTime = point.dateFrom;
  return startTime && dayjs(startTime).isAfter(dayjs(), 'D');
}

function getPointsFromPresent(point) {
  const startTime = point.dateFrom;
  const endTime = point.dateTo;
  const now = dayjs();
  return dayjs(startTime).isSameOrBefore(now, 'D') && dayjs(endTime).isSameOrAfter(now, 'D');
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => getPointsFromFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => getPointsFromPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => getPointsFromPast(point)),
};

export {filter};
