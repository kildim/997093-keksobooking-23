import * as Forms from '../common/forms.js';

const mapFilters = document.querySelector('.map__filters');

const activate = () => {
  Forms.activate(mapFilters, 'ad-form--disabled');
};

const deactivate = () => {
  Forms.deactivate(mapFilters, 'map__filters--disabled');
};

export {activate, deactivate};
