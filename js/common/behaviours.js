const TAB_RESPONSIVE = '0';
const ESCAPE_KEY = 'Escape';
const ESCAPE_IE_KEY ='ESC';

const addModalBehaviour = (el) => {
  el.setAttribute('tabindex', TAB_RESPONSIVE);
  el.focus();

  el.addEventListener('keydown', (evt) => {
    if (evt.key === ESCAPE_KEY || evt.key === ESCAPE_IE_KEY) {
      el.remove();
    }
  });
  el.addEventListener('click', () => {
    el.remove();
  });
};

export {addModalBehaviour};
