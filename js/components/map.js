import {TOKIO_LAT, TOKIO_LNG} from '../constants/constants.js';
import  {getBookings} from '../services/server-data.js';
import {renderArticle} from './card.js';


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

/**
 * Создаёт функцию обратного вызова для события 'moveend' главного маркера.
 * Позволяет в качестве колбэка использовать функцию, принимающую для последующей обработки
 * координаты долготы и широты.
 * @param coordsManipulationFunction - функция принимающая в качестве параметров координаты долготы и широты.
 * @returns {(function(*): void)|*} - функция колбэк для события 'moveend' принимающая в качестве
 *                                    параметра событие маркера библиотеки Leaflet
 * @private
 */
const _generateMarkerMovedCb = (coordsManipulationFunction) => function (evt) {
  const {lat, lng} = evt.target.getLatLng();
  coordsManipulationFunction(lat, lng);
};
const _genMarker = (ad) => {

  const {location: {lat: lat, lng: lng}} = ad;
  const marker = L.marker({lat, lng},{draggable: false, icon: commonMarkerIcon});

  marker
    .addTo(siteMap)
    .bindPopup(renderArticle(ad),
      {
        keepInView: true,
      },
    );
};

const activate = () => {
  siteMap.setView({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  }, 13);
  tileLayer.addTo(siteMap);
  mainMarker.addTo(siteMap);

  getBookings((data) => data.forEach(_genMarker));
};
const afterLoad = (cb) => {
  siteMap.on('load', cb);
};
const markerMoved = (cb) => {
  mainMarker.on('moveend', _generateMarkerMovedCb(cb));
};
const resetData = () => {
  mainMarker.setLatLng(L.latLng(TOKIO_LAT, TOKIO_LNG));
};

export {activate, afterLoad, markerMoved, resetData};
