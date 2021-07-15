import * as ErrMsg from '../components/err-msg.js';
import * as SuccMsg from '../components/succ-msg.js';

const DATA_GET_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const DATA_POST_URL = 'https://23.javascript.pages.academy/keksobooking';

const getBookings = (processBookings) => {
  fetch(DATA_GET_URL)
    .then((response) => response.ok ?  response.json() : ErrMsg.renderErrorMsg('response.statusText'))
    .then(processBookings)
    .catch((error) => ErrMsg.renderErrorMsg(error));
};

const addBooking = (processSuccessResponse, bookingFormData) => {
  const FETCH_OPTIONS = {
    method: 'POST',
    body: bookingFormData,
  };

  fetch(DATA_POST_URL, FETCH_OPTIONS)
    .then((response) => response.ok ?  processSuccessResponse() : ErrMsg.renderErrorMsg('response.statusText'))
    .then(SuccMsg.renderSuccessMsg)
    .catch((error) => ErrMsg.renderErrorMsg(error));
};

export {getBookings, addBooking};
