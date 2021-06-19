import {mockAd} from './utils/data-factories.js';
import {generateArticle} from './markup-generators/card.js';

const ADS_COUNT = 10;
const advertisements = new Array(ADS_COUNT).fill(null).map(() => mockAd());
const blockMap = document.querySelector('#map-canvas');
const cards = [];

for (let i = 0; i < ADS_COUNT; i++) {
  cards.push(generateArticle(advertisements[i]));
}

blockMap.appendChild(cards[0]);


