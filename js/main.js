import * as AdForm from './components/ad-form.js';
import * as MapFilters from  './components/map-filters.js';
import * as Map from './components/map.js';

import * as BookingsData from './units/bookings-data.js';

AdForm.activate();
AdForm.formSubmitted(()=> {
  MapFilters.resetData();
  Map.resetData();
});
AdForm.formResetted( ()=> {
  MapFilters.resetData();
  Map.resetData();
});

MapFilters.deactivate();
Map.markerMoved(AdForm.setAddress);
Map.afterLoad(MapFilters.activate);
Map.activate();

BookingsData.getBookings();

