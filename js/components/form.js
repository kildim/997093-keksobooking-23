const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const deactivateForm = (form, additionalClass) => {
  const fieldSets = form.querySelectorAll('fieldset');
  form.classList.add(additionalClass);
  fieldSets.forEach((el) => {el.setAttribute('disabled', '');});
};
const activateForm = (form, additionalClass) => {
  const fieldSets = form.querySelectorAll('fieldset';
  form.classList.remove(additionalClass);
  fieldSets.forEach((el) => {el.removeAttribute('disabled');});
};

const deactivate = () => {
  deactivateForm(form, 'ad-form--disabled');
  deactivateForm(mapFilters, 'map__filters--disabled');
};
const activate = () => {
  activateForm(form, 'ad-form--disabled');
  activateForm(mapFilters, 'map__filters--disabled');
};

export {deactivate, activate};
