import * as DataProvider from '../services/data-provider.js';
import * as locationsMap from './map.js';
import {debounce} from '../utils/debounce.js';

const WORD_POSITION_OF_NAME = 1;
const NAME_OF_SELECTOR_ELEMENT = 'select-one';
const NAME_OF_CHECKBOX_ELEMENT = 'checkbox';
const PRICE_SELECTOR = 'price';
const TYPE_SELECTOR = 'type';
const ROOMS_SELECTOR = 'rooms';
const GUEST_SELECTOR = 'guests';
const CHARACTERISTICS = 'characteristics';
const FEATURES = 'features';
const PRICE_BOUNDS = {
  'middle': {'min': 10000, 'max': 50000},
  'low': {'min': 0, 'max': 9999},
  'high': {'min': 50000, 'max': Number.POSITIVE_INFINITY},
};
const RERENDER_DELAY = 500;

const mapFilters = document.querySelector('.map__filters');
const interactiveControls = mapFilters.querySelectorAll('input, select, fieldset');

const buildFilterElementsMap = (elements) => {
  const filterElementsMap = new Map().set(CHARACTERISTICS, new Map()).set(FEATURES, new Set());
  const parsElNameToKey = (name) => name.split('-')[WORD_POSITION_OF_NAME];
  for (const el of elements) {
    switch (el.type) {
      case NAME_OF_SELECTOR_ELEMENT:
        if (el.value !== 'any') {filterElementsMap.get(CHARACTERISTICS).set(parsElNameToKey(el.name), el.value);}
        break;
      case NAME_OF_CHECKBOX_ELEMENT :
        if (el.checked) {
          filterElementsMap.get(FEATURES).add(el.value);
        }
    }
  }
  return filterElementsMap;
};

const filtersValues  = () => buildFilterElementsMap(mapFilters);
const isPriceInBounds = (booking, bound) => booking.offer.price >= PRICE_BOUNDS[bound]['min'] && booking.offer.price <= PRICE_BOUNDS[bound]['max'];
const isTypeConvenient = (booking, accommodation) => booking.offer.type === accommodation;

const isRoomsNumberConvenient = (booking, roomNumber) => booking.offer.rooms === Number(roomNumber);
const isGuestsNumberConvenient = (booking, housingGuests) => booking.offer.guests === Number(housingGuests);

const getCharacteristicsCheckers = () => new Map ()
  .set(PRICE_SELECTOR, isPriceInBounds)
  .set(TYPE_SELECTOR, isTypeConvenient)
  .set(ROOMS_SELECTOR, isRoomsNumberConvenient)
  .set(GUEST_SELECTOR, isGuestsNumberConvenient);

const applyFilter = (filters, booking) => {
  const CHARACTERISTICS_CHECKERS = getCharacteristicsCheckers();
  let compliance = true;

  const checkCharacteristicCompliance =
    (value, key) => compliance = compliance && CHARACTERISTICS_CHECKERS.get(key)(booking, value);
  const checkFeaturesCompliance =
    (filterFeature) => compliance = compliance && ((booking.offer.features === undefined) ?
      false :
      booking.offer.features.find((offerFeature) => offerFeature === filterFeature));

  filters.get(CHARACTERISTICS).forEach(checkCharacteristicCompliance);
  filters.get(FEATURES).forEach(checkFeaturesCompliance);

  return compliance;
};

const processBookings = (data) => {
  const MAX_REPRESENTATION_COUNT = 10;
  let iterationsCounter = 0;
  const representation = [];

  while (iterationsCounter < data.length && representation.length < MAX_REPRESENTATION_COUNT) {
    if (applyFilter(filtersValues(), data[iterationsCounter])) {
      representation.push(data[iterationsCounter]);
    }
    iterationsCounter++;
  }

  locationsMap.renderMarkers(representation);
};

const getData = () => {DataProvider.getData(processBookings);};

const onFieldSetChange = debounce(() => getData(), RERENDER_DELAY);

const onFieldSetFocus = () => {
  locationsMap.hidePopups();
};

const activate = () => {
  getData();
  mapFilters.classList.remove('map__filters--disabled');
  interactiveControls.forEach((el) => {
    el.removeAttribute('disabled', '');
    if (el.type !== 'fieldset') {
      el.addEventListener('focus', onFieldSetFocus);
      el.addEventListener('change', onFieldSetChange);
    }
  });
};

const deactivate = () => {
  mapFilters.removeEventListener('focus', onFieldSetFocus);
  mapFilters.classList.add('map__filters--disabled');
  interactiveControls.forEach((el) => {
    el.setAttribute('disabled', '');
    if (el.type !== 'fieldset') {
      el.addEventListener('focus', onFieldSetFocus);
      el.removeEventListener('change', onFieldSetChange);
    }
  });
};

const resetData = () => {
  mapFilters.reset();
  getData();
};

export {activate, deactivate, resetData};
