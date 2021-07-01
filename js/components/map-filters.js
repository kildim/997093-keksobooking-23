import {activateForm, deactivateForm} from '../common/forms.js';

const mapFilters = document.querySelector('.map__filters');

const activateMapFilters = () => {
  activateForm(mapFilters, 'ad-form--disabled');
}

const deactivateMapFilters = () => {
  deactivateForm(mapFilters, 'map__filters--disabled');
}

const initMapFilters = () => {
  activateMapFilters(mapFilters, 'map__filters--disabled');
};

export {initMapFilters, activateMapFilters, deactivateMapFilters};
