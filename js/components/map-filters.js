import {activate, deactivate} from '../common/switch-form-activity.js';

const mapFilters = document.querySelector('.map__filters');

const activateMapFilters = () => {
  activate(mapFilters, 'ad-form--disabled');
};

const deactivateMapFilters = () => {
  deactivate(mapFilters, 'map__filters--disabled');
};

export {activateMapFilters, deactivateMapFilters};
