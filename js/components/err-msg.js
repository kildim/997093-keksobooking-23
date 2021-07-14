import * as Behaviour from '../common/behaviours.js';

const msgTemplate = document.querySelector('#error').content.querySelector('.error');

const renderErrorMsg = () => {
  const errorMsg = document.body.appendChild(msgTemplate.cloneNode(true));
  const errorButton = errorMsg.querySelector('.error__button');

  Behaviour.addModalBehaviour(errorMsg);
  errorButton.addEventListener('click', () => {
    errorMsg.remove();
  });
};

export {renderErrorMsg};
