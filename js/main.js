import {mockAd} from './utils/data-factories.js';
import {renderArticle} from './components/card.js';
import {initAdForm} from './components/ad-form.js';
import {initMapFilters} from './components/map-filters.js';

const ADS_COUNT = 10;
const advertisements = new Array(ADS_COUNT).fill(null).map(() => mockAd());
const blockMap = document.querySelector('#map-canvas');

initAdForm();
initMapFilters();

// renderArticle(blockMap, advertisements[0]);

