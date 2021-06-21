import {mockAd} from './utils/data-factories.js';
import {renderArticle} from './markup-generators/card.js';

const ADS_COUNT = 10;
const advertisements = new Array(ADS_COUNT).fill(null).map(() => mockAd());
const blockMap = document.querySelector('#map-canvas');

renderArticle(blockMap, advertisements[0]);



