import {mockAd} from './utils/data-factories.js';
import {genArticle} from './markup-generators/card.js';

const ADS_COUNT = 1;
const advertisements = new Array(ADS_COUNT).fill(null).map(() => mockAd());
const blockMap = document.querySelector('#map-canvas');

advertisements.forEach((ad) => {
  blockMap.appendChild(genArticle(ad));
});
