const mapFilters = document.querySelector('.map__filters');
const interactiveControls = mapFilters.querySelectorAll('input, select, fieldset');

const _buildFilterElementsArray = (elements) => {
  const filterElements = [];
  for (const el of elements) {if (el.type === 'select-one' || el.type === 'checkbox') {filterElements.push(el);}}
  return filterElements;
};
const _parsFilterElementsArrayToMap = (filterElementsArray) => {
  const _parsElNameToKey = (name) => name.split('-')[1];
  const filterValuesMap = new Map();
  filterElementsArray.forEach((el) => {
    switch (el.type) {
      case 'select-one':
        if (el.value !== 'any') {filterValuesMap.set(_parsElNameToKey(el.name), el.value);}
        break;
      case 'checkbox' :
        if (el.checked) {
          filterValuesMap.set(el.value, 'on');
        }
    }
  });
  return filterValuesMap;
};
const filtersValues  = () => _parsFilterElementsArrayToMap(_buildFilterElementsArray(mapFilters));
const onFilterChange = (evt) => {
  console.log(filtersValues());
}
const activate = () => {
  mapFilters.classList.remove('map__filters--disabled');
  interactiveControls.forEach((el) => {
    el.removeAttribute('disabled', '');
    if (el.type !== 'fieldset') {el.addEventListener('change', onFilterChange);}
  });
};

const deactivate = () => {
  mapFilters.classList.add('map__filters--disabled');
  interactiveControls.forEach((el) => {
    el.setAttribute('disabled', '');
    if (el.type !== 'fieldset') {el.removeEventListener('change', onFilterChange);}
  });
};

const resetData = () => mapFilters.reset();

export {activate, deactivate, resetData, filtersValues};
