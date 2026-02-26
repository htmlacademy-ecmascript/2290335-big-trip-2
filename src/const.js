const POINTS_COUNT = 3;

const DATE_FORMAT = {
  MONTHDAY: 'MMM DD',
  HOURS: 'HH[:]mm',
  DAYHOURS: 'DD[/]MM[/]YY HH[:]MM'
};

const POINTS_TYPE = ['taxi', 'train', 'flight', 'bus', 'ship', 'drive', 'check-in', 'sightseeing', 'restaurant'];

const SortType = {
  DAY: 'DAY',
  PRICE: 'PRICE',
  TIME: 'TIME',
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
  ERROR: 'ERROR',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
};

export {POINTS_COUNT, DATE_FORMAT, POINTS_TYPE, SortType, UserAction, UpdateType, FilterType};
