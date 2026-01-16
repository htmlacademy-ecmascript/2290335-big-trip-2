import { getRandomArrayElement } from '../utils.js';

// Получение списка дополнительных предложений

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'f4b62001-293f-4c3d-a702-94eec4a2808c',
        title: 'Luggage and overall cargo',
        price: 150
      },
      {
        id: 'f4b62002-293f-4c3d-a702-94eec4a2808c',
        title: 'Have a heart-to-heart talk with driver',
        price: 0
      },
      {
        id: 'f4b62003-293f-4c3d-a702-94eec4a2808c',
        title: 'City guide services',
        price: 5000
      },
      {
        id: 'f4b62004-293f-4c3d-a702-94eec4a2808c',
        title: 'Selecting a radio station',
        price: 50
      },
      {
        id: 'f4b62005-293f-4c3d-a702-94eec4a2808b',
        title: 'Upgrade to tariff',
        price: 120
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'aaaaaa1-293f-4c3d-a702-94eec4a2808b',
        title: 'Bed set',
        price: 450
      },
      {
        id: 'aaaaaa2-293f-4c3d-a702-94eec4a2808b',
        title: 'Buying a lottery ticket',
        price: 200
      },
      {
        id: 'aaaaaa3-293f-4c3d-a702-94eec4a2808b',
        title: 'Waffles or cookies for tea',
        price: 300
      },
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'bbbbbb1-293f-4c3d-a702-94eec4a2808b',
        title: 'Additional luggage',
        price: 5000
      },
      {
        id: 'bbbbbb2-293f-4c3d-a702-94eec4a2808b',
        title: 'Meals on board',
        price: 2500
      },
      {
        id: 'bbbbbb3-293f-4c3d-a702-94eec4a2808b',
        title: 'Selecting a seat',
        price: 500
      },
      {
        id: 'bbbbbb4-293f-4c3d-a702-94eec4a2808b',
        title: 'Souvenirs',
        price: 3000
      },
      {
        id: 'bbbbbb5-293f-4c3d-a702-94eec4a2808b',
        title: 'Alcohol',
        price: 3000
      },
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'cccccc1-293f-4c3d-a702-94eec4a2808b',
        title: 'Luggage space',
        price: 500
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'dddddd1-293f-4c3d-a702-94eec4a2808b',
        title: 'Karaoke',
        price: 2000
      },
      {
        id: 'dddddd2-293f-4c3d-a702-94eec4a2808b',
        title: 'Beauty treatments',
        price: 2000
      },
      {
        id: 'dddddd3-293f-4c3d-a702-94eec4a2808b',
        title: 'Bar/Restaurant',
        price: 2000
      },
    ]
  },
  {
    type: 'drive',
    offers: [
    ]
  },
  {
    type: 'check-in',
    offers: [
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'eeeeee1-293f-4c3d-a702-94eec4a2808b',
        title: 'Walking tour',
        price: 200
      },
      {
        id: 'eeeeee2-293f-4c3d-a702-94eec4a2808b',
        title: 'City tour',
        price: 1000
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'fffffff1-293f-4c3d-a702-94eec4a2808b',
        title: 'Breakfast',
        price: 500
      },
      {
        id: 'fffffff2-293f-4c3d-a702-94eec4a2808b',
        title: 'Business lunch',
        price: 700
      },
      {
        id: 'fffffff3-293f-4c3d-a702-94eec4a2808b',
        title: 'Set Lunch',
        price: 1000
      },
      {
        id: 'fffffff4-293f-4c3d-a702-94eec4a2808b',
        title: 'Dinner',
        price: 700
      },
      {
        id: 'fffffff5-293f-4c3d-a702-94eec4a2808b',
        title: 'Stop by for coffee',
        price: 200
      }
    ]
  },
];

function getRandomOffers() {
  return getRandomArrayElement(mockOffers);
}

export { mockOffers, getRandomOffers };
