import * as Behaviour from '../common/behaviours.js';

const msgTemplate = document.querySelector('#success').content.querySelector('.success');

const renderSuccessMsg = () => {
  const successMsg = document.body.appendChild(msgTemplate.cloneNode(true));

  Behaviour.addModalBehaviour(successMsg);
};

export {renderSuccessMsg};
