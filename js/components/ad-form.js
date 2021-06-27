import {isArrayContainNumber as isCapacityProper} from '../utils/mathematics.js';
import {failValidity} from '../utils/helpers.js';

const ONE_ROOM = '1';
const TWO_ROOMS = '2';
const THREE_ROOMS = '3';
const HUNDRED_ROOMS = '100';
const ONE_GUEST = '1';
const TWO_GUESTS = '2';
const THREE_GUESTS = '3';
const NOT_FOR_GUESTS = '0';

const adForm = document.querySelector('.ad-form');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const checkRoomNumber = () => {
  roomNumber.setCustomValidity('');
  console.log(capacity.value);
  console.log(roomNumber.value);
  console.log(roomNumber.checkValidity());

  switch (capacity.value) {
    case ONE_GUEST :
      console.log(isCapacityProper([ONE_ROOM, TWO_ROOMS, THREE_ROOMS], roomNumber.value));
      return !isCapacityProper([ONE_ROOM, TWO_ROOMS, THREE_ROOMS], roomNumber.value) ?
        failValidity(roomNumber, 'Вы можете выбрать лишь одну, две или три комнаты для размещения одного гостя!') :
        false;
    case TWO_GUESTS :
      console.log(isCapacityProper([TWO_ROOMS, THREE_ROOMS], roomNumber.value));
      return !isCapacityProper([TWO_ROOMS, THREE_ROOMS], roomNumber.value) ?
        failValidity(roomNumber, 'Вы можете выбрать лишь две или три комнаты для размещения двух гостей!') :
        false;
    case THREE_GUESTS :
      console.log(isCapacityProper([THREE_ROOMS], roomNumber.value));
      return !isCapacityProper([THREE_ROOMS], roomNumber.value) ?
        failValidity(roomNumber, 'Вы можете выбрать лишь три комнаты для размещения трёх гостей!') :
        false;
    case NOT_FOR_GUESTS :
      return !isCapacityProper([HUNDRED_ROOMS], roomNumber.value) ?
        failValidity(roomNumber, 'Вы можете выбрать лишь 100 комнатное размещение не для гостей!') :
        false;
  }
};
const validateAdForm = (evt) => {
  console.log('validateAdForm');
  if (!checkRoomNumber()) {
    evt.preventDefault();}
  evt.preventDefault();
};
const switchOnAdFormValidation = () => {
  adForm.addEventListener('submit', validateAdForm);
};

export {switchOnAdFormValidation};
