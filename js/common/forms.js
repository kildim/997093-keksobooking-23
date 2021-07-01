const deactivateForm = (form, additionalClass) => {
  const fieldSets = form.querySelectorAll('fieldset');
  form.classList.add(additionalClass);
  fieldSets.forEach((el) => {el.setAttribute('disabled', '');});
};
const activateForm = (form, additionalClass) => {
  const fieldSets = form.querySelectorAll('fieldset');
  form.classList.remove(additionalClass);
  fieldSets.forEach((el) => {el.removeAttribute('disabled');});
};

export {deactivateForm, activateForm};
