import * as DataProvider from '../services/data-provider.js';
import * as locationsMap from './map.js';
import {debounce} from '../utils/debounce.js';

const mapFilters = document.querySelector('.map__filters');
const interactiveControls = mapFilters.querySelectorAll('input, select, fieldset');
const PRICE_BOUNDS = {
  'middle': {'min': 10000, 'max': 50000},
  'low': {'min': 0, 'max': 9999},
  'high': {'min': 50000, 'max': Number.POSITIVE_INFINITY},
};
const RERENDER_DELAY = 500;
const _buildFilterElementsArray = (elements) => {
  const filterElements = [];
  for (const el of elements) {if (el.type === 'select-one' || el.type === 'checkbox') {filterElements.push(el);}}
  return filterElements;
};
const _parsFilterElementsArrayToMap = (filterElementsArray) => {
  const _parsElNameToKey = (name) => name.split('-')[1];
  const filterValuesMap = new Map();
  filterElementsArray.forEach((el) => {
    switch (el.type) {
      case 'select-one':
        if (el.value !== 'any') {filterValuesMap.set(_parsElNameToKey(el.name), el.value);}
        break;
      case 'checkbox' :
        if (el.checked) {
          filterValuesMap.set(el.value, 'on');
        }
    }
  });
  return filterValuesMap;
};
const _filtersValues  = () => _parsFilterElementsArrayToMap(_buildFilterElementsArray(mapFilters));
const _rankByFeatures = (featureCountA, featureCountB) => !!(featureCountA - featureCountB);
const _isPriceInBounds = (price, bound) => price >= PRICE_BOUNDS[bound]['min'] && price <= PRICE_BOUNDS[bound]['max'];
const _isTypeConvenient = (type, accommodation) => type === accommodation;
const _isRoomsNumberConvenient = (housingRooms, roomNumber) => housingRooms === Number(roomNumber);
const _isGuestsNumberConvenient = (capacity, housingGuests) => capacity === Number(housingGuests);
const _isFeaturePresent = (features, featureCriteria) => features === undefined ? false : features.find((el) => el === featureCriteria);

const _applyFilter = (filter) => (booking) => {
  let compliance = true;
  for (const criteria of filter) {
    switch (criteria[0]) {
      case 'price':
        compliance = compliance && _isPriceInBounds (booking.offer.price, criteria[1]);
        break;
      case 'type':
        compliance = compliance && _isTypeConvenient (booking.offer.type, criteria[1]);
        break;
      case 'rooms':
        compliance = compliance && _isRoomsNumberConvenient (booking.offer.rooms, criteria[1]);
        break;
      case 'guests':
        compliance = compliance && _isGuestsNumberConvenient (booking.offer.guests, criteria[1]);
        break;
      case 'wifi':
        compliance = compliance && _isFeaturePresent (booking.offer.features, criteria[0]);
        break;
      case 'washer':
        compliance = compliance && _isFeaturePresent (booking.offer.features, criteria[0]);
        break;
      case 'elevator':
        compliance = compliance && _isFeaturePresent (booking.offer.features, criteria[0]);
        break;
      case 'conditioner':
        compliance = compliance && _isFeaturePresent (booking.offer.features, criteria[0]);
        break;
      case 'parking':
        compliance = compliance && _isFeaturePresent (booking.offer.features, criteria[0]);
        break;
      case 'dishwasher':
        compliance = compliance && _isFeaturePresent (booking.offer.features, criteria[0]);
    }
  }

  return compliance;
};
const processBookings = (data) => {
  const filter = _filtersValues();
  const bookings = data.filter(_applyFilter(filter)).sort(_rankByFeatures).slice(0, 10);
  locationsMap.renderMarkers(bookings);
};
const getData = () => {DataProvider.getData(processBookings, 3000);};
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

const resetData = () => mapFilters.reset();

export {activate, deactivate, resetData};
