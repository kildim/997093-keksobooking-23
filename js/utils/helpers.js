const CONJUGATION_CASES = [2, 0, 1, 1, 1, 2];
const HUNDRED = 100;
const DECIMALS =10;
const FORTH = 4;
const TWENTY = 20;
const TWO =2;
const FIVE = 5;
const ONE = 1;
const GUEST_LIMIT = 99;

const convertToSelector = (features) => features.map((feature) => `popup__feature--${feature}`);

const isOfferFeaturesIntersectingElementClasses = (classesArray, element) =>
  convertToSelector(classesArray).find(
    (className) => element.classList.contains(className),
  );

// https://gist.github.com/realmyst/1262561
const declareNumerals = (number, titles) => titles[(number % HUNDRED > FORTH && number % HUNDRED < TWENTY) ?
  TWO
  : CONJUGATION_CASES[(number % DECIMALS < FIVE) ? number % DECIMALS : FIVE] ];

const  declareGuestsNumber = (guests) => {
  let guestsNumberString;
  guestsNumberString = guests % DECIMALS === ONE ? `для ${guests} гостя` : `для ${guests} гостей`;
  guestsNumberString = guests > GUEST_LIMIT ? 'не для гостей' : guestsNumberString;
  return guestsNumberString;
};

const dropValidity = (...fields) => {
  for (const field of fields) { field.setCustomValidity(''); }
};

export {isOfferFeaturesIntersectingElementClasses, declareNumerals, declareGuestsNumber, dropValidity};
