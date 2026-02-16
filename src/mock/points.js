import {nanoid} from 'nanoid';
import {getRandomArrayElement} from '../utils/common-utils.js';

// Структура данных точек маршрута Points
const mockPoints = [
  {
    basePrice: 3000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edaaa',
    isFavorite: true,
    offers: [],
    type: 'taxi',
  },
  {
    basePrice: 2500,
    dateFrom: '2025-07-10T22:55:56.845Z',
    dateTo: '2025-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edbbb',
    isFavorite: true,
    offers: [],
    type: 'train',
  },
  {
    basePrice: 10000,
    dateFrom: '2026-07-10T22:55:56.845Z',
    dateTo: '2026-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    isFavorite: true,
    offers: [],
    type: 'flight',
  },
  {
    basePrice: 800,
    dateFrom: '2026-07-10T22:55:56.845Z',
    dateTo: '2026-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edbbb',
    isFavorite: true,
    offers: [],
    type: 'bus',
  },
  {
    basePrice: 535000,
    dateFrom: '2026-07-10T22:55:56.845Z',
    dateTo: '2026-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    isFavorite: true,
    offers: [],
    type: 'ship',
  },
  {
    basePrice: 999,
    dateFrom: '2026-07-10T22:55:56.845Z',
    dateTo: '2026-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    isFavorite: true,
    offers: [],
    type: 'drive',
  },
  {
    basePrice: 300,
    dateFrom: '2026-02-10T22:55:56.845Z',
    dateTo: '2026-02-10T11:22:30.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    isFavorite: true,
    offers: [],
    type: 'check-in',
  },
  {
    basePrice: 10,
    dateFrom: '2026-02-10T22:55:56.845Z',
    dateTo: '2026-02-10T11:22:30.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    isFavorite: true,
    offers: [],
    type: 'sightseeing',
  },
  {
    basePrice: 500,
    dateFrom: '2025-07-10T22:55:56.845Z',
    dateTo: '2025-08-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edbbb',
    isFavorite: false,
    offers: [],
    type: 'restaurant',
  },
];


function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export { getRandomPoint };
