const mapFilters = document.querySelector('.map__filters');
const interactiveControls = mapFilters.querySelectorAll('input, select, fieldset');

const activate = () => {
  mapFilters.classList.remove('map__filters--disabled');
  interactiveControls.forEach((el) => {el.removeAttribute('disabled', '');});
};

const deactivate = () => {
  mapFilters.classList.add('map__filters--disabled');
  interactiveControls.forEach((el) => {el.setAttribute('disabled', '');});
};

export {activate, deactivate};
