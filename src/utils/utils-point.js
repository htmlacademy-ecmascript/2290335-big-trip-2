import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const MSEC_IN_A_DAY = 86400000;
const MSEC_IN_A_HOUR = 3600000;

function humanizeDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function getDifferenceInTime(start, end) {
  const durationInMsec = dayjs(end).diff(start);
  switch (true) {
    case durationInMsec < MSEC_IN_A_HOUR:
      return dayjs.duration(durationInMsec).format('mm[M]');
    case durationInMsec > MSEC_IN_A_HOUR && durationInMsec < MSEC_IN_A_DAY:
      return dayjs.duration(durationInMsec).format('HH[H] mm[M]');
    case durationInMsec > MSEC_IN_A_DAY:
      return dayjs.duration(durationInMsec).format('DD[D] HH[H] mm[M]');
  }
}

function getEventDuration(event) {
  return dayjs(event.dateTo).diff(dayjs(event.dateFrom));
}

function sortByTime(pointA, pointB) {
  const pointADuration = getEventDuration(pointA);
  const pointBDuration = getEventDuration(pointB);
  return pointBDuration - pointADuration;
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {humanizeDueDate, getDifferenceInTime, sortByTime, sortByPrice};
