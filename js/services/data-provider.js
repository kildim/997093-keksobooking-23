import * as ErrorMessage from '../components/error-message.js';
import * as SuccessMessage from '../components/success-message.js';

const DATA_GET_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const DATA_POST_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (processData) => {
  fetch(DATA_GET_URL)
    .then((response) => response.ok ?  response.json() : ErrorMessage.renderErrorMsg('response.statusText'))
    .then(processData)
    .catch((error) => ErrorMessage.renderErrorMsg(error));
};


const postData = (processSuccessResponse, formData) => {
  const FETCH_OPTIONS = {
    method: 'POST',
    body: formData,
  };

  fetch(DATA_POST_URL, FETCH_OPTIONS)
    .then((response) => response.ok ?  processSuccessResponse() : ErrorMessage.renderErrorMsg('response.statusText'))
    .then(SuccessMessage.renderSuccessMsg)
    .catch((error) => ErrorMessage.renderErrorMsg(error));
};

export {getData, postData};
