import {getRandomPositiveFloat, getRandomPositiveInteger} from './numbers-generation.js';

const RESIDENCE_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIME_VALUES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME_VALUES = ['12:00', '13:00', '14:00'];
const FEATURE_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_VALUES = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;

const mockAvatar = () => `img/avatars/user0${getRandomPositiveInteger(1, 8)}.png`;

const mockArray = (sources) => {
  let results = [];
  const resultsPower = getRandomPositiveInteger(1, sources.length);
  const sourcesLocal = sources.slice(0);
  for (let iterator = 0; iterator < resultsPower; iterator++) {
    const randomIndex = getRandomPositiveInteger(0, sourcesLocal.length - 1);
    results = results.concat(sourcesLocal.splice(randomIndex, 1));
  }
  return results;
};

const mockAd = () => {
  const lat = getRandomPositiveFloat(MIN_LAT, MAX_LAT, 5);
  const lng = getRandomPositiveFloat(MIN_LNG, MAX_LNG, 5);
  return {
    author: {
      avatar: mockAvatar(),
    },
    location: {
      lat: lat,
      lng: lng,
    },
    offer: {
      title: 'Best vocation',
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(0, 10000000),
      type: String(RESIDENCE_TYPES[getRandomPositiveInteger(0, RESIDENCE_TYPES.length - 1)]),
      rooms: getRandomPositiveInteger(1, 100),
      guests: getRandomPositiveInteger(1, 100),
      checkin: CHECKIN_TIME_VALUES[getRandomPositiveInteger(0, 2)],
      checkout: CHECKOUT_TIME_VALUES[getRandomPositiveInteger(0, 2)],
      features: mockArray(FEATURE_VALUES),
      description: 'Advertisement description',
      photos: mockArray(PHOTO_VALUES),
    },
  };
};

export {mockAd};
