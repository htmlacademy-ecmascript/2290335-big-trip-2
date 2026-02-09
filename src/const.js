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
};

export { DATE_FORMAT, POINTS_TYPE, SortType, UserAction, UpdateType };
