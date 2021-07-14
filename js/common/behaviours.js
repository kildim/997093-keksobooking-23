const addModalBehaviour = (el) => {
  el.setAttribute('tabindex', '0');
  el.focus();

  el.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      el.remove();
    }
  });
  el.addEventListener('click', (evt) => {
    el.remove();
  });
};

export {addModalBehaviour};
