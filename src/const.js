const POINTS_COUNT = 3;

const DATE_FORMAT = {
  monthDay: 'MMM DD',
  hours: 'HH mm',
  dayHours: 'DD[/]MM[/]YY HH[:]MM'
};

const POINTS_TYPE = ['taxi', 'train', 'flight', 'bus', 'ship', 'drive', 'check-in', 'sightseeing', 'restaurant'];

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time',
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export {POINTS_COUNT, DATE_FORMAT, POINTS_TYPE, SortType, UserAction, UpdateType, FilterType};
