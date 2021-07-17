import * as ErrMsg from '../components/error-message.js';
import * as SuccessMsg from '../components/success-message.js';

const DATA_GET_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const DATA_POST_URL = 'https://23.javascript.pages.academy/keksobooking';

// const getData = (processBookings) => {
//   fetch(DATA_GET_URL)
//     .then((response) => response.ok ?  response.json() : ErrMsg.renderErrorMsg('response.statusText'))
//     .then(processBookings)
//     .catch((error) => ErrMsg.renderErrorMsg(error));
// };
const getData = (processData) => {
  fetch(DATA_GET_URL)
    .then((response) => response.ok ?  response.json() : ErrMsg.renderErrorMsg('response.statusText'))
    .then(processData)
    .catch((error) => ErrMsg.renderErrorMsg(error));
};


const postData = (processSuccessResponse, formData) => {
  const FETCH_OPTIONS = {
    method: 'POST',
    body: formData,
  };

  fetch(DATA_POST_URL, FETCH_OPTIONS)
    .then((response) => response.ok ?  processSuccessResponse() : ErrMsg.renderErrorMsg('response.statusText'))
    .then(SuccessMsg.renderSuccessMsg)
    .catch((error) => ErrMsg.renderErrorMsg(error));
};

export {getData, postData};
