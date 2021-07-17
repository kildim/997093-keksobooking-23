import * as dataProvider from '../services/data-provider.js';
import * as Map from '../components/map.js';
import * as MapFilters from '../components/map-filters.js';

const processBookings = (data) => {
  // console.log(MapFilters.mapFilters.elements);
  MapFilters.filtersValues();
  console.log(data[1].offer);
  Map.renderMarkers(data);
};
const getBookings = () => {
  dataProvider.getData(processBookings);
};

export {getBookings};
