import { getRandomArrayElement } from '../utils.js';

// Destinations. Получение списка пунктов назначения
const mockDestinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaa',
    description: 'London, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'London',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'London - is a capital of Great Britain',
      }
    ]
  },
];

function getRandomDestinations() {
  return getRandomArrayElement(mockDestinations);
}

export { getRandomDestinations, mockDestinations };
