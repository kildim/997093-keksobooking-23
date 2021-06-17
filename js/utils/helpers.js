const convertToSelector = (features) => features.map((feature) => `popup__feature--${feature}`);

const isOfferFeaturesIntersectingElementClasses = (classesArray, element) =>
  convertToSelector(classesArray).find(
    (className) => element.classList.contains(className),
  );

export {isOfferFeaturesIntersectingElementClasses};
