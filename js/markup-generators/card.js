import {HOSTS_DICTIONARY} from '../utils/data-factories.js';
import {isOfferFeaturesIntersectingElementClasses} from '../utils/helpers.js';

const articleTemplate = document.querySelector('#card').content.querySelector('.popup');
const articleImgTemplate = document.querySelector('#card').content.querySelector('.popup__photo');


const genArticle = (ad) => {
  const article = articleTemplate.cloneNode(true);
  const popupTitle = article.querySelector('.popup__title');
  const popupTextAddress = article.querySelector('.popup__text--address');
  const popupTextPrice = article.querySelector('.popup__text--price');
  const popupType = article.querySelector('.popup__type');
  const popupTextCapacity = article.querySelector('.popup__text--capacity');
  const popupFeaturesElements = article.querySelectorAll('.popup__feature');
  const popupFeatures = article.querySelector('.popup__features');
  const popupDescription = article.querySelector('.popup__description');
  const popupPhotos = article.querySelector('.popup__photos');
  const popupAvatar = article.querySelector('.popup__avatar');

  ad.offer.title === '' ? popupTitle.classList.add('hidden') : popupTitle.textContent = ad.offer.title;
  ad.offer.address === '' ? popupTextAddress.classList.add('hidden') : popupTextAddress.textContent = ad.offer.address;
  ad.offer.price === undefined ? popupTextPrice.classList.add('hidden') :
    popupTextPrice.textContent = `${ad.offer.price} ₽/ночь`;
  HOSTS_DICTIONARY.get(ad.offer.type) === undefined ?
    popupType.classList.add('hidden') : popupType.textContent = HOSTS_DICTIONARY.get(ad.offer.type);
  (ad.offer.checkin === undefined || ad.offer.checkout === undefined) ?
    popupTextCapacity.classList.add('hidden') :
    popupTextCapacity.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  ad.offer.features === undefined ?
    popupFeatures.classList.add('hidden') :
    popupFeaturesElements.forEach((el) => {
      if (!isOfferFeaturesIntersectingElementClasses(ad.offer.features, el)) {
        el.remove();
      }
    });

  ad.offer.description === '' ?
    popupDescription.classList.add('hidden') : popupDescription.textContent = ad.offer.description;
  ad.author.avatar === '' ?
    popupAvatar.classList.add('hidden') : popupAvatar.src = ad.author.avatar;

  if (ad.offer.photos === undefined) {
    popupPhotos.classList.add('hidden');
  } else {
    popupPhotos.textContent = '';
    for (const img of ad.offer.photos) {
      const newPopupPhoto = articleImgTemplate.cloneNode(false);
      newPopupPhoto.src = img;
      popupPhotos.appendChild(newPopupPhoto);
    }
  }
  return article;
};

export {genArticle};
