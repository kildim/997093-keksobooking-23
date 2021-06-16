const RESIDENCE_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIME_VALUES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME_VALUES = ['12:00', '13:00', '14:00'];
const FEATURE_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_VALUES = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const ADS_COUNT = 10;

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveFloat(arg1, arg2, digits = 1) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(Math.abs(arg1), Math.abs(arg2));
  const upper = Math.max(Math.abs(arg1), Math.abs(arg2));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

function getRandomPositiveInteger (arg1, arg2) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(Math.abs(arg1), Math.abs(arg2)));
  const upper = Math.floor(Math.max(Math.abs(arg1), Math.abs(arg2)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

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
  const lat = getRandomPositiveFloat(35.65, 35.7, 5);
  const lng = getRandomPositiveFloat(139.7, 139.8, 5);
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
      type: String(RESIDENCE_TYPES[getRandomPositiveInteger(0, 5)]),
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

const advertisements = new Array(ADS_COUNT).fill(null).map(() => mockAd());

console.log(advertisements); // eslint-disable-line no-console
