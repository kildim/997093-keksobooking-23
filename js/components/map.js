import {TOKIO_LAT, TOKIO_LNG} from '../constants/constants.js';

//TODO
import {mockAd} from '../utils/data-factories.js';
import {renderArticle} from './card.js';
//

const MAIN_MARKER_ICON = 'img/main-pin.svg';
const COMMON_MARKER_ICON = 'img/pin.svg';

const siteMap = L.map('map-canvas');
const tileLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
const mainMarkerIcon = L.icon (
  {
    iconUrl: MAIN_MARKER_ICON,
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);
const commonMarkerIcon = L.icon (
  {
    iconUrl: COMMON_MARKER_ICON,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
);
const mainMarker = L.marker (
  {
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

//TODO
const ADS_COUNT = 5;
const advertisements = new Array(ADS_COUNT).fill(null).map(() => mockAd());
const addMockAds = (ads) => {
  ads.forEach((el) => {
    const {location: {lat: lat, lng: lng}} = el;
    const marker = L.marker({lat, lng},{draggable: false, icon: commonMarkerIcon});

    marker
      .addTo(siteMap)
      .bindPopup(renderArticle(el),
        {
          keepInView: true,
        },
      );
  });
};
//

const _generateMarkerMovedCb = (coordsManipulationFunction) => function (evt) {
  const {lat, lng} = evt.target.getLatLng();
  coordsManipulationFunction(lat, lng);
};

const activate = () => {
  siteMap.setView({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  }, 13);
  tileLayer.addTo(siteMap);
  mainMarker.addTo(siteMap);

  addMockAds(advertisements);
};
const afterLoad = (cb) => {
  siteMap.on('load', cb);
};
const markerMoved = (cb) => {
  mainMarker.on('moveend', _generateMarkerMovedCb(cb));
};

export {activate, afterLoad, markerMoved};
