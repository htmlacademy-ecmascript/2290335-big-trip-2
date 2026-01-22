import { nanoid } from 'nanoid';
import { getRandomArrayElement } from '../utils.js';

// Структура данных точек маршрута Points

const mockPoints = [
  {
    id: `${nanoid()}`,
    basePrice: 3000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edaaa',
    isFavorite: true,
    offers: [
      'f4b62001-293f-4c3d-a702-94eec4a2808c',
      'f4b62002-293f-4c3d-a702-94eec4a2808c',
      'f4b62003-293f-4c3d-a702-94eec4a2808c'
    ],
    type: 'taxi',
  },
  {
    id: `${nanoid()}`,
    basePrice: 2500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edbbb',
    isFavorite: true,
    offers: [
      'aaaaaa1-293f-4c3d-a702-94eec4a2808b',
      'aaaaaa2-293f-4c3d-a702-94eec4a2808b'
    ],
    type: 'train',
  },
  {
    id: `${nanoid()}`,
    basePrice: 10000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    isFavorite: true,
    offers: [
      'bbbbbb2-293f-4c3d-a702-94eec4a2808b',
      'bbbbbb4-293f-4c3d-a702-94eec4a2808b',
      'bbbbbb5-293f-4c3d-a702-94eec4a2808b'
    ],
    type: 'flight',
  },
  {
    id: `${nanoid()}`,
    basePrice: 800,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edbbb',
    isFavorite: true,
    offers: [
      'cccccc1-293f-4c3d-a702-94eec4a2808b',
    ],
    type: 'bus',
  },
  {
    id: `${nanoid()}`,
    basePrice: 535000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    isFavorite: true,
    offers: [
      'dddddd1-293f-4c3d-a702-94eec4a2808b',
      'dddddd2-293f-4c3d-a702-94eec4a2808b',
      'dddddd3-293f-4c3d-a702-94eec4a2808b',
    ],
    type: 'ship',
  },
  {
    id: `${nanoid()}`,
    basePrice: 999,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    isFavorite: true,
    offers: [''],
    type: 'drive',
  },
  {
    id: `${nanoid()}`,
    basePrice: 300,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:30.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    isFavorite: true,
    offers: [''],
    type: 'check-in',
  },
  {
    id: `${nanoid()}`,
    basePrice: 10,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-09-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    isFavorite: true,
    offers: [
      'eeeeee1-293f-4c3d-a702-94eec4a2808b',
      'eeeeee2-293f-4c3d-a702-94eec4a2808b'
    ],
    type: 'sightseeing',
  },
  {
    id: `${nanoid()}`,
    basePrice: 500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-08-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edbbb',
    isFavorite: false,
    offers: [
      'fffffff1-293f-4c3d-a702-94eec4a2808b',
      'fffffff2-293f-4c3d-a702-94eec4a2808b',
    ],
    type: 'restaurant',
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
