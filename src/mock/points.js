import { getRandomArrayElement } from '../utils.js';

// Структура данных точек маршрута Points

const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808a',
    basePrice: 3000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa32'],
    type: 'taxi',
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
    basePrice: 2500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: true,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa32'],
    type: 'train',
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 10000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa32'],
    type: 'flight',
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808d',
    basePrice: 800,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa32'],
    type: 'bus',
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808e',
    basePrice: 535000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [''],
    type: 'ship',
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808f',
    basePrice: 999,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [''],
    type: 'drive',
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808g',
    basePrice: 300,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:30.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [''],
    type: 'check-in',
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808h',
    basePrice: 10,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-09-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [''],
    type: 'sightseeing',
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808i',
    basePrice: 500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-08-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [''],
    type: 'restaurant',
  },
];

function getRandomPoints() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoints };
