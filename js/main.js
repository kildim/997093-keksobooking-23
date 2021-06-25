import {mockAd} from './utils/data-factories.js';
import {renderArticle} from './components/card.js';
import {deactivate, activate} from './components/form.js';

const ADS_COUNT = 10;
const advertisements = new Array(ADS_COUNT).fill(null).map(() => mockAd());
const blockMap = document.querySelector('#map-canvas');

renderArticle(blockMap, advertisements[0]);
deactivate();
activate();
