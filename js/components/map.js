import {TOKIO_COORDS} from '../constants/constants.js';
import {renderArticle} from './card.js';


const MAIN_MARKER_ICON = 'img/main-pin.svg';
const COMMON_MARKER_ICON = 'img/pin.svg';
const MAP_SCALE = 13;
const MAIN_ICON_WIDTH = 52;
const MAIN_ICON_HEIGHT = 52;
const MAIN_ICON_ANCHOR_HORIZONTAL_POSITION = 26;
const MAIN_ICON_ANCHOR_VERTICAL_POSITION = 52;
const MARKER_ICON_WIDTH = 40;
const MARKER_ICON_HEIGHT = 40;
const MARKER_ANCHOR_HORIZONTAL_POSITION = 20;
const MARKER_ANCHOR_VERTICAL_POSITION = 40;
const MAIN_MARKER_ICON_OPTIONS =
  {
    iconUrl: MAIN_MARKER_ICON,
    iconSize: [MAIN_ICON_WIDTH, MAIN_ICON_HEIGHT],
    iconAnchor: [MAIN_ICON_ANCHOR_HORIZONTAL_POSITION, MAIN_ICON_ANCHOR_VERTICAL_POSITION],
  };
const COMMON_MARKER_ICON_OPTIONS =
  {
    iconUrl: COMMON_MARKER_ICON,
    iconSize: [MARKER_ICON_WIDTH, MARKER_ICON_HEIGHT],
    iconAnchor: [MARKER_ANCHOR_HORIZONTAL_POSITION, MARKER_ANCHOR_VERTICAL_POSITION],
  };

const siteMap = L.map('map-canvas');
const markers = L.layerGroup();
const tileLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
const mainMarkerIcon = L.icon (MAIN_MARKER_ICON_OPTIONS);
const commonMarkerIcon = L.icon (COMMON_MARKER_ICON_OPTIONS);

const mainMarker = L.marker (TOKIO_COORDS, {draggable: true, icon: mainMarkerIcon});

/**
 * Создаёт функцию обратного вызова для события 'moveend' главного маркера.
 * Позволяет в качестве колбэка использовать функцию, принимающую для последующей обработки
 * координаты долготы и широты.
 * @param coordsManipulationFunction - функция принимающая в качестве параметров координаты долготы и широты.
 * @returns {(function(*): void)|*} - функция колбэк для события 'moveend' принимающая в качестве
 *                                    параметра событие маркера библиотеки Leaflet
 * @private
 */
const onMainMarkerMooveend = (coordsManipulationFunction) => function (evt) {
  const {lat, lng} = evt.target.getLatLng();
  coordsManipulationFunction(lat, lng);
};
const genMarker = (ad) => {

  const {location: {lat: lat, lng: lng}} = ad;
  const marker = L.marker({lat, lng},{draggable: false, icon: commonMarkerIcon});
  marker
    .addTo(markers)
    .bindPopup(renderArticle(ad),{keepInView: true});
};
const renderMarkers = (data) => {
  markers.clearLayers();
  data.forEach(genMarker);
  markers.addTo(siteMap);
};
const hidePopups = () => markers.eachLayer((marker) => marker.closePopup());

const activate = () => {
  siteMap.setView(TOKIO_COORDS, MAP_SCALE);
  tileLayer.addTo(siteMap);
  mainMarker.addTo(siteMap);
};

const afterLoad = (cb) => {
  siteMap.on('load', cb);
};
const markerMoved = (cb) => {
  mainMarker.on('moveend', onMainMarkerMooveend(cb));
};
const resetData = () => {
  siteMap.setView(TOKIO_COORDS, MAP_SCALE);
  mainMarker.setLatLng(TOKIO_COORDS);
};

export {activate, afterLoad, markerMoved, resetData, renderMarkers, hidePopups};
