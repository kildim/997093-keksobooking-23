import {dropValidity} from '../utils/helpers.js';
import {TOKIO_COORDS} from '../constants/constants.js';
import  {postData} from '../services/data-provider.js';

const MIN_GUESTS_NUMBER = 0;
const MAX_ROOMS_NUMBER = 100;
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
const address = adForm.querySelector('#address');
const interactiveControls = adForm.querySelectorAll('input, select, fieldset');
let afterSuccessfulSubmitting;
let onResetted;

const validateField = (field, checkupFunction) => {
  const customValidityMessage = checkupFunction();
  field.setCustomValidity(customValidityMessage);
  return customValidityMessage;
};

const onTimeInTimeOutInput = (evt) => {
  if (evt.target.name === 'timein') {timeOut.selectedIndex = timeIn.selectedIndex;}
  if (evt.target.name === 'timeout') {timeIn.selectedIndex = timeOut.selectedIndex;}
};

const onHostTypeInput = () => {
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

  if (roomsCount >= MAX_ROOMS_NUMBER && guestsCount !== MIN_GUESTS_NUMBER) {
    return 'Для более чем 100 комнат выберите вариант "не для гостей"';
  }else if (guestsCount === MIN_GUESTS_NUMBER && roomsCount < MAX_ROOMS_NUMBER) {
    return 'Для "не для гостей" выберите вариант более чем 100 комнат';
  }else if (roomsCount < guestsCount) {
    return 'Количество комнат не должно быть меньше количества гостей';
  }
  return '';
};

const onHostTypePriceInput = () => validateField(price, checkPrice);

const onCapacityInput = () => {
  dropValidity(roomNumber, capacity);
  validateField(capacity, checkRoomNumber);
};

const onRoomNumberInput = () => {
  dropValidity(roomNumber, capacity);
  validateField(roomNumber, checkRoomNumber);
};

const setAddress = (lat, lng) => {
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};
const formSubmitted = (cb) => afterSuccessfulSubmitting = cb;
const formResetted = (cb) => onResetted = cb;

const resetData = () => adForm.reset();

const onSuccessfulSubmitting = () => {
  resetData();
  if (afterSuccessfulSubmitting) {afterSuccessfulSubmitting();}
};
const onAdFormSubmit = (evt) => {
  evt.preventDefault();
  postData(onSuccessfulSubmitting, new FormData(adForm));
};
const onAdFormReset = () => {
  if (onResetted) {onResetted();}
};

const activate = () => {
  setAddress(TOKIO_COORDS.lat, TOKIO_COORDS.lng);

  hostType.addEventListener('input', onHostTypeInput);

  timeIn.addEventListener('input', onTimeInTimeOutInput);
  timeOut.addEventListener('input', onTimeInTimeOutInput);

  hostType.addEventListener('input', onHostTypePriceInput);
  price.addEventListener('input', onHostTypePriceInput);

  capacity.addEventListener('input', onCapacityInput);
  roomNumber.addEventListener('input', onRoomNumberInput);

  adForm.addEventListener('submit', onAdFormSubmit);
  adForm.addEventListener('reset', onAdFormReset);

  adForm.classList.remove('ad-form--disabled');
  interactiveControls.forEach((el) => {el.removeAttribute('disabled', '');});};

const deactivate = () => {
  hostType.removeEventListener('input', onHostTypeInput);

  timeIn.removeEventListener('input', onTimeInTimeOutInput);
  timeOut.removeEventListener('input', onTimeInTimeOutInput);

  hostType.removeEventListener('input', onHostTypePriceInput);
  price.removeEventListener('input', onHostTypePriceInput);

  capacity.removeEventListener('input', onCapacityInput);
  roomNumber.removeEventListener('input', onRoomNumberInput);

  adForm.removeEventListener('submit', onAdFormSubmit);

  adForm.classList.add('ad-form--disabled');
  interactiveControls.forEach((el) => {el.setAttribute('disabled', '');});
};

export {activate, deactivate, setAddress, formSubmitted, formResetted};
