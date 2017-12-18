'use strict';

(function (map, mapPinsBlock, classMapPinActive) {
  var BTN_ESC = 27;
  var adElement;
  var popupClose;

  // получаем тип жилья
  var getType = function (offerType) {
    var type = '';
    switch (offerType) {
      case 'flat':
        type = 'Квартира';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'bungalo':
        type = 'Бунгало';
        break;
    }

    return type;
  };

  // получаем список особенностей
  var getFeaturesList = function (offerFeatures) {
    var featuresList = adElement.querySelector('.popup__features');

    while (featuresList.firstChild) {
      featuresList.removeChild(featuresList.firstChild);
    }

    for (var i = 0; i < offerFeatures.length; i++) {
      var featuresListItem = document.createElement('li');
      featuresListItem.className = 'feature feature--' + offerFeatures[i];
      featuresList.appendChild(featuresListItem);
    }
  };

  // закрытие карточки объявления
  var closeAd = function () {
    map.removeChild(adElement);
    mapPinsBlock.querySelector('.' + classMapPinActive).classList.remove(classMapPinActive);

    popupClose.removeEventListener('click', buttonCloseClickHandler);
    document.removeEventListener('keydown', buttonCloseEscPressHandler);
  };

  var buttonCloseClickHandler = function () {
    closeAd();
  };

  var buttonCloseEscPressHandler = function (evt) {
    if (evt.keyCode === BTN_ESC) {
      closeAd();
    }
  };

  var setupCloseAd = function () {
    popupClose.addEventListener('click', buttonCloseClickHandler);
    document.addEventListener('keydown', buttonCloseEscPressHandler);
  };

  // создаем объявление
  window.renderAd = function (mapPinIndex, ads) {
    var adTemplate = document.querySelector('template').content.querySelector('article.map__card');
    adElement = adTemplate.cloneNode(true);
    var ad = ads[mapPinIndex];
    var offer = ad.offer;
    var type = getType(offer.type);
    var paragraphs = adElement.querySelectorAll('p');
    var features = offer.features;
    var previousAd = map.querySelector('.map__card');

    adElement.querySelector('h3').textContent = offer.title;
    adElement.querySelector('p small').textContent = offer.address;
    adElement.querySelector('.popup__price').textContent = offer.price + '\u20BD ' + '/ ночь';
    adElement.querySelector('h4').textContent = type;
    paragraphs[2].textContent = offer.rooms + ' для ' + offer.guests + ' гостей';
    paragraphs[3].textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    getFeaturesList(features, adElement);
    paragraphs[4].textContent = offer.description;
    adElement.querySelector('.popup__avatar').src = ad.author.avatar;

    if (previousAd) {
      map.removeChild(previousAd);
    }

    map.insertBefore(adElement, document.querySelector('.map__filters-container'));
    popupClose = document.querySelector('.popup__close');
    setupCloseAd();
  };

})(window.map, window.mapPinsBlock, window.classMapPinActive, window.ads);
