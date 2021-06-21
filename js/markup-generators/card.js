import {HOSTS_DICTIONARY} from '../constants/constants.js';
import {isOfferFeaturesIntersectingElementClasses, declareNumerals, declareGuestsNumber} from '../utils/helpers.js';

const articleTemplate = document.querySelector('#card').content.querySelector('.popup');
const articleImgTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

const generateArticle = (ad) => {
  const article = articleTemplate.cloneNode(true);
  const popupTitle = article.querySelector('.popup__title');
  const popupTextAddress = article.querySelector('.popup__text--address');
  const popupTextPrice = article.querySelector('.popup__text--price');
  const popupType = article.querySelector('.popup__type');
  const popupTextCapacity = article.querySelector('.popup__text--capacity');
  const popupTextTime = article.querySelector('.popup__text--time');
  const popupFeaturesElements = article.querySelectorAll('.popup__feature');
  const popupFeatures = article.querySelector('.popup__features');
  const popupDescription = article.querySelector('.popup__description');
  const popupPhotos = article.querySelector('.popup__photos');
  const popupAvatar = article.querySelector('.popup__avatar');

  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = ad.offer;

  popupTitle.textContent = title ? title : popupTitle.remove();
  popupTextAddress.textContent = address ? address : popupTextAddress.remove();
  popupTextPrice.textContent = price ? `${price} ₽/ночь` : '0 ₽/ночь';
  popupType.textContent = HOSTS_DICTIONARY[`${type}`] ? HOSTS_DICTIONARY[`${type}`] : popupType.remove();
  popupTextCapacity.textContent = rooms && guests ? `${rooms} ${declareNumerals(rooms, ['комната', 'комнаты', 'комнат'])} ${declareGuestsNumber(guests)}` :
    popupTextCapacity.remove();
  popupTextTime.textContent = checkin && checkout ? `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}` :
    popupTextTime.remove();
  features ?
    popupFeaturesElements.forEach((el) => {
      if (!isOfferFeaturesIntersectingElementClasses(ad.offer.features, el)) {
        el.remove();
      }
    }) :
    popupFeatures.remove();
  popupDescription.textContent = description ? description : popupDescription.remove();
  popupAvatar.src = ad.author.avatar ? ad.author.avatar : popupAvatar.remove();
  if (photos) {
    popupPhotos.textContent = '';
    for (const img of photos) {
      const newPopupPhoto = articleImgTemplate.cloneNode(false);
      newPopupPhoto.src = img;
      popupPhotos.appendChild(newPopupPhoto);
    }
  }else{
    popupPhotos.remove();
  }
  return article;
};

export {generateArticle};
