const convertToSelector = (features) => features.map((feature) => `popup__feature--${feature}`);

const isOfferFeaturesIntersectingElementClasses = (classesArray, element) =>
  convertToSelector(classesArray).find(
    (className) => element.classList.contains(className),
  );

// https://gist.github.com/realmyst/1262561
const declareNumerals = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
};

const  declareGuestsNumber = (guests) => {
  let guestsNumberString = 'не для гостей';
  guestsNumberString = (guests % 10 === 1 && guests < 100) ? `${guests} гостя` : `${guests} гостей`;
  return guestsNumberString;
};

export {isOfferFeaturesIntersectingElementClasses, declareNumerals, declareGuestsNumber};
