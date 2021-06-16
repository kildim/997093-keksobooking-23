import {mockAd} from './utils/data-factories.js';

const ADS_COUNT = 10;
const advertisements = new Array(ADS_COUNT).fill(null).map(() => mockAd());

console.log(advertisements); // eslint-disable-line no-console
