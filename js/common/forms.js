const deactivate = (form, additionalClass) => {
  const fieldSets = form.querySelectorAll('fieldset');
  form.classList.add(additionalClass);
  fieldSets.forEach((el) => {el.setAttribute('disabled', '');});
};
const activate = (form, additionalClass) => {
  const fieldSets = form.querySelectorAll('fieldset');
  form.classList.remove(additionalClass);
  fieldSets.forEach((el) => {el.removeAttribute('disabled');});
};

export {deactivate, activate};