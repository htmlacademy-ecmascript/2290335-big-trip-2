import dayjs from 'dayjs';

const SECONDS_IN_MINUTES = 60;
const HOURS_IN_DAY = 24;

function humanizeDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function getDifferenceInTime(start, end) {
  const difference = dayjs(end).diff(start);
  switch (difference) {
    case difference < SECONDS_IN_MINUTES:
      return dayjs(difference).format('mm[M]');
    case difference > SECONDS_IN_MINUTES && difference < SECONDS_IN_MINUTES * HOURS_IN_DAY:
      return dayjs(difference).format('HH[H] mm[M]');
    default:
      return dayjs(difference).format('DD[D] HH[H] mm[M]');
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
