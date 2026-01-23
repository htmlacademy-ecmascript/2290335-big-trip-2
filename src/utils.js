import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

const SECONDS_IN_MINUTES = 60;
const HOURS_IN_DAY = 24;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function getDifferenceInTime(start, end) {
  const difference = dayjs(end).diff(start); // По умолчанию: Миллисекунды в минутах
  switch (difference) {
    case difference < SECONDS_IN_MINUTES:
      return dayjs(difference).format('mm[M]');
    case difference > SECONDS_IN_MINUTES && difference < SECONDS_IN_MINUTES * HOURS_IN_DAY:
      return dayjs(difference).format('HH[H] mm[M]');
    default:
      return dayjs(difference).format('DD[D] HH[H] mm[M]');
  }
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}


export { getRandomArrayElement, humanizeDueDate, getDifferenceInTime, updateItem };
