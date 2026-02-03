import {getRandomArrayElement} from '../utils/common-utils.js';

// Destinations. Получение списка пунктов назначения
const mockDestinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edaaa',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: './images/chamonix1.jpg',
        description: 'Chamonix parliament building',
      },
      {
        src: './images/chamonix2.jpg',
        description: 'Chamonix central street',
      },
      {
        src: './images/chamonix3.jpg',
        description: 'Chamonix museum',
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
        src: './images/london2.jpg',
        description: 'London`s double-decker-bus',
      },
      {
        src: './images/london3.jpg',
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
        src: './images/paris1.jpg',
        description: 'Eiffel tower',
      },
      {
        src: './images/paris2.webp',
        description: 'Елисейские поля',
      },
      {
        src: './images/paris3.jpg',
        description: 'Мулен Руж',
      }
    ]
  },
];

function getRandomDestinations() {
  return getRandomArrayElement(mockDestinations);
}

export { getRandomDestinations, mockDestinations };
