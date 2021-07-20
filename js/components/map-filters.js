import * as DataProvider from '../services/data-provider.js';
import * as locationsMap from './map.js';
import {debounce} from '../utils/debounce.js';

const PRICE_BOUNDS = {
  'middle': {'min': 10000, 'max': 50000},
  'low': {'min': 0, 'max': 9999},
  'high': {'min': 50000, 'max': Number.POSITIVE_INFINITY},
};
const RERENDER_DELAY = 500;
const SHOWN_BOOKINGS_LIMIT = 10;

const mapFilters = document.querySelector('.map__filters');
const interactiveControls = mapFilters.querySelectorAll('input, select, fieldset');

const _buildFilterElementsMap = (elements) => {
  const filterElementsMap = new Map().set('characteristics', new Map()).set('features', new Set());
  const _parsElNameToKey = (name) => name.split('-')[1];
  for (const el of elements) {
    switch (el.type) {
      case 'select-one':
        if (el.value !== 'any') {filterElementsMap.get('characteristics').set(_parsElNameToKey(el.name), el.value);}
        break;
      case 'checkbox' :
        if (el.checked) {
          filterElementsMap.get('features').add(el.value);
        }
    }
  }
  return filterElementsMap;
};

const _filtersValues  = () => _buildFilterElementsMap(mapFilters);
const _rankByFeatures = (featureCountA, featureCountB) => !!(featureCountA - featureCountB);
const _isPriceInBounds = (booking, bound) => booking.offer.price >= PRICE_BOUNDS[bound]['min'] && booking.offer.price <= PRICE_BOUNDS[bound]['max'];
const _isTypeConvenient = (booking, accommodation) => booking.offer.type === accommodation;

const _isRoomsNumberConvenient = (booking, roomNumber) => booking.offer.rooms === Number(roomNumber);
const _isGuestsNumberConvenient = (booking, housingGuests) => booking.offer.capacity === Number(housingGuests);

const getCharacteristicsCheckers = () => new Map ()
  .set('price', _isPriceInBounds)
  .set('type', _isTypeConvenient)
  .set('rooms', _isRoomsNumberConvenient)
  .set('guests', _isGuestsNumberConvenient);

const _applyFilter = (filters, booking) => {
  const CHARACTERISTICS_CHECKERS = getCharacteristicsCheckers();
  let compliance = true;

  const _checkCharacteristicCompliance =
    (value, key) => compliance = compliance && CHARACTERISTICS_CHECKERS.get(key)(booking, value);
  const _checkFeaturesCompliance =
    (filterFeature) => compliance = compliance && ((booking.offer.features === undefined) ?
      false :
      booking.offer.features.find((offerFeature) => offerFeature === filterFeature));

  filters.get('characteristics').forEach(_checkCharacteristicCompliance);
  filters.get('features').forEach(_checkFeaturesCompliance);

  return compliance;
};

const processBookings = (data) => {
  const MAX_REPRESENTATION_COUNT = 10;
  let iterationsCounter = 0;
  const representation = [];

  while (iterationsCounter < data.length && representation.length < MAX_REPRESENTATION_COUNT) {
    if (_applyFilter(_filtersValues(), data[iterationsCounter])) {
      representation.push(data[iterationsCounter]);
    }
    iterationsCounter++;
  }

  locationsMap.renderMarkers(representation);
};

const getData = () => {DataProvider.getData(processBookings);};

const onFilterChange = debounce(() => getData(), RERENDER_DELAY);

const onFocus = () => {
  locationsMap.hidePopups();
};

const activate = () => {
  getData();
  mapFilters.classList.remove('map__filters--disabled');
  interactiveControls.forEach((el) => {
    el.removeAttribute('disabled', '');
    if (el.type !== 'fieldset') {
      el.addEventListener('focus', onFocus);
      el.addEventListener('change', onFilterChange);
    }
  });
};

const deactivate = () => {
  mapFilters.removeEventListener('focus', onFocus);
  mapFilters.classList.add('map__filters--disabled');
  interactiveControls.forEach((el) => {
    el.setAttribute('disabled', '');
    if (el.type !== 'fieldset') {
      el.addEventListener('focus', onFocus);
      el.removeEventListener('change', onFilterChange);
    }
  });
};

const resetData = () => {
  mapFilters.reset();
  getData();
};

export {activate, deactivate, resetData};
