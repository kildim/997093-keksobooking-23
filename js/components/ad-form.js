import {isArrayContainNumber as isCapacityProper} from '../utils/mathematics.js';

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
// const hostType = adForm.querySelector('#type');
// const price = adForm.querySelector('#price');

// const checkPrice = () => {
//   switch (hostType.value) {
//     case 'bungalow':
//       price.addAttribute
//   }
// };

const checkRoomNumber = () => {
  switch (capacity.value) {
    case ONE_GUEST :
      return !isCapacityProper([ONE_ROOM, TWO_ROOMS, THREE_ROOMS], roomNumber.value) ?
        'Вы можете выбрать лишь одну, две или три комнаты для размещения одного гостя!' :
        '';
    case TWO_GUESTS :
      return !isCapacityProper([TWO_ROOMS, THREE_ROOMS], roomNumber.value) ?
        'Вы можете выбрать лишь две или три комнаты для размещения двух гостей!' :
        '';
    case THREE_GUESTS :
      return !isCapacityProper([THREE_ROOMS], roomNumber.value) ?

        'Вы можете выбрать лишь три комнаты для размещения трёх гостей!' :
        '';
    case NOT_FOR_GUESTS :
      return !isCapacityProper([HUNDRED_ROOMS], roomNumber.value) ?
        'Вы можете выбрать лишь 100 комнатное размещение не для гостей!' :
        '';
  }
};

const validateCapacity = () => {
  const customValidityMessage = checkRoomNumber();
  roomNumber.setCustomValidity(customValidityMessage);
  return customValidityMessage;
};
const validateRoomNumber = () => {
  const customValidityMessage = checkRoomNumber();
  roomNumber.setCustomValidity(customValidityMessage);
  return customValidityMessage;
};
const validateAdForm = (evt) => {
  validateCapacity();
  validateRoomNumber();
  if (!(capacity.validity.valid && roomNumber.validity.valid )) {
    evt.preventDefault();}
};

const switchOnAdFormValidation = () => {
  capacity.addEventListener('input', validateCapacity);
  roomNumber.addEventListener('input', validateRoomNumber);
  adForm.addEventListener('submit', validateAdForm);
};

export {switchOnAdFormValidation};
