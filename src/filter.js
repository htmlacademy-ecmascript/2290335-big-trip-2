import dayjs from 'dayjs';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const filter = {
  [FilterType.EVERYTHING]: (tasks) => tasks.filter((task) => task),
  [FilterType.PRESENT]: (tasks) => tasks.filter((task) => isPointInPresentTime(task.dueDate)),
  [FilterType.FUTURE]: (tasks) => tasks.filter((task) => isPontInFutureTime(task.dueDate)),
  [FilterType.PAST]: (tasks) => tasks.filter((task) => isPointInPastTime(task.dueDate)),
};

function isPointInPastTime(dueDate) {
  return dueDate && dayjs(dueDate).isBefore(dayjs(), 'D');
}

function isPontInFutureTime(dueDate) {
  return dueDate && dayjs(dueDate).isAfter(dayjs(), 'D');
}

function isPointInPresentTime(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

function generateFilter(tasks) {
  return Object.entries(filter).map(
    ([filterType, filterTasks]) => ({
      type: filterType,
      count: filterTasks(tasks).length,
    }),
  );
}

export {generateFilter};
