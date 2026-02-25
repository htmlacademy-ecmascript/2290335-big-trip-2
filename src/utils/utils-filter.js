import dayjs from 'dayjs';
import {FilterType} from '../const.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function isPointInPastTime(point) {
  const endTime = point.dateTo;
  return endTime && dayjs(endTime).isBefore(dayjs(), 'D');
}

function isPontInFutureTime(point) {
  const startTime = point.dateFrom;
  return startTime && dayjs(startTime).isAfter(dayjs(), 'D');
}

function isPointInPresentTime(point) {
  const startTime = point.dateFrom;
  const endTime = point.dateTo;
  const now = dayjs();
  return dayjs(startTime).isSameOrBefore(now, 'D') && dayjs(endTime).isSameOrAfter(now, 'D');
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPontInFutureTime(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointInPresentTime(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPastTime(point)),
};

export {filter};
