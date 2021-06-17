import {mockAd} from './data-factories';

const ADS_COUNT = 10;
const advertisements = new Array(ADS_COUNT).fill(null).map(() => mockAd());
const articleTemplate = document.querySelector('#card').content.querySelector('.popup');
const blockMap = document.querySelector('#map-canvas');

let article = articleTemplate.cloneNode(true);

blockMap.appendChild(article);
