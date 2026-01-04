import { getRandomArrayElement } from '../utils.js';

// Destinations. Получение списка пунктов назначения
const mockDestinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edaaa',
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
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edbbb',
    description: 'London, is a capital of Great Britan',
    name: 'London',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'London`s Big-Ban',
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    description: 'Paris is my love. Beloved city. One love',
    name: 'Paris',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Eiffel tower',
      }
    ]
  },
];

function getRandomDestinations() {
  return getRandomArrayElement(mockDestinations);
}

export { getRandomDestinations, mockDestinations };
