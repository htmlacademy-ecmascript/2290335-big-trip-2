import { getRandomArrayElement } from '../utils.js';

// Получение списка дополнительных предложений

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
        title: 'Taking coffee',
        price: 300
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to a business class',
        price: 5000
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to a business class',
        price: 1000
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to a business class',
        price: 1000
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to a business class',
        price: 1000
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to a business class',
        price: 1000
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to a business class',
        price: 1000
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to a business class',
        price: 1000
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'f4b62099-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to a business class',
        price: 1000
      }
    ]
  },
];

function getRandomOffers() {
  return getRandomArrayElement(mockOffers);
}

export { mockOffers, getRandomOffers };
