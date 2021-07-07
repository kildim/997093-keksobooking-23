import * as AdForm from '../components/ad-form.js';

const onMarkerMoved = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  AdForm.setAddress(lat.toFixed(5), lng.toFixed(5));
};

export {onMarkerMoved};
