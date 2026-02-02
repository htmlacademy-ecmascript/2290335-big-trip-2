import {getRandomArrayElement} from '../utils/common-utils.js';

// Destinations. Получение списка пунктов назначения
const mockDestinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edaaa',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: './images/london1.jpg',
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
        src: './images/london1.jpg',
        description: 'London`s Big-Ban',
      },
      {
        src: './images/london1.jpg',
        description: 'London`s double-decker-bus',
      },
      {
        src: './images/london1.jpg',
        description: 'London`s Eye',
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edccc',
    description: 'Paris is my love. Beloved city. One love',
    name: 'Paris',
    pictures: [
      {
        src: './images/london1.jpg',
        description: 'Eiffel tower',
      },
      {
        src: './images/london1.jpg',
        description: 'Елисейские поля',
      },
      {
        src: './images/london1.jpg',
        description: 'Мулен Руж',
      }
    ]
  },
];

function getRandomDestinations() {
  return getRandomArrayElement(mockDestinations);
}

export { getRandomDestinations, mockDestinations };
