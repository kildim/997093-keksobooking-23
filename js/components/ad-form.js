import {dropValidity} from '../utils/helpers.js';
import {activateForm, deactivateForm} from '../common/forms.js';

const MIN_PRICE = {
  'bungalow'  : 0,
  'flat'      : 1000,
  'hotel'     : 3000,
  'house'     : 5000,
  'palace'    : 10000,
};

const adForm = document.querySelector('.ad-form');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const hostType = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const _validateField = (field, checkupFunction) => {
  const customValidityMessage = checkupFunction();
  field.setCustomValidity(customValidityMessage);
  return customValidityMessage;
};

const syncInOutTime = (evt) => {
  if (evt.target.name === 'timein') {timeOut.selectedIndex = timeIn.selectedIndex;}
  if (evt.target.name === 'timeout') {timeIn.selectedIndex = timeOut.selectedIndex;}
};

const setupMinPrice = () => {
  const minPrice = MIN_PRICE[hostType.value];

  price.min = minPrice;
  price.placeholder = `от ${minPrice}`;
};

const checkPrice = () => {
  const minPrice = MIN_PRICE[hostType.value];

  return price.value < minPrice ?
    `Стоимость за ночь для данного размещения должна быть более ${minPrice}` :
    '';
};

const checkRoomNumber = () => {
  const roomsCount = parseInt(roomNumber.value, 10);
  const guestsCount = parseInt(capacity.value, 10);

  if (roomsCount > 99 && guestsCount !== 0) {
    return 'Для более чем 100 комнат выберите вариант "не для гостей"';
  }else if (guestsCount === 0 && roomsCount < 100) {
    return 'Для "не для гостей" выберите вариант более чем 100 комнат';
  }else if (roomsCount < guestsCount) {
    return 'Количество комнат не должно быть меньше количества гостей';
  }
  return '';
};

const validatePrice = () => _validateField(price, checkPrice);

const validateCapacity = () => {
  dropValidity(roomNumber, capacity);
  _validateField(capacity, checkRoomNumber);
};

const validateRoomNumber = () => {
  dropValidity(roomNumber, capacity);
  _validateField(roomNumber, checkRoomNumber);
};

const validateAdForm = (evt) => {
  if (!(capacity.validity.valid && roomNumber.validity.valid )) {
    evt.preventDefault();}
};

const initValidation = () => {
  hostType.addEventListener('input', setupMinPrice);

  timeIn.addEventListener('input', syncInOutTime);
  timeOut.addEventListener('input', syncInOutTime);

  hostType.addEventListener('input', validatePrice);
  price.addEventListener('input', validatePrice);

  capacity.addEventListener('input', validateCapacity);
  roomNumber.addEventListener('input', validateRoomNumber);

  adForm.addEventListener('submit', validateAdForm);
};

const activateAdForm = () => {
  activateForm(adForm, 'ad-form--disabled');
};

const deactivatAdForm = () => {
  deactivateForm(adForm, 'ad-form--disabled');
};

const initAdForm = () => {
  initValidation();
  activateAdForm();
};

export {initAdForm, activateAdForm, deactivatAdForm};
