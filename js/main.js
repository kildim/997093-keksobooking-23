import * as AdForm from './components/ad-form.js';
import * as MapFilters from  './components/map-filters.js';
import * as Map from './components/map.js';

AdForm.activate();
MapFilters.deactivate();
Map.markerMoved(AdForm.setAddress);
Map.afterLoad(MapFilters.activate);
Map.activate();


