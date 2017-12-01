'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandom = function (number) {
  return Math.floor(Math.random() * number);
};

var getFeatures = function () {
  var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var countOfFeatures = getRandom(AD_FEATURES.length);
  var adRandomFeatures = [];

  for (var i = 0; i < countOfFeatures; i++) {
    var randomFeature;

    do {
      randomFeature = AD_FEATURES[getRandom(AD_FEATURES.length)];
    } while (adRandomFeatures.indexOf(randomFeature) !== -1);

    adRandomFeatures[i] = randomFeature;
  }

  return adRandomFeatures;
};

var getAdsList = function () {
  var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var AD_TYPE = ['flat', 'house', 'bungalo'];
  var AD_CHECKIN = ['12:00', '13:00', '14:00'];
  var AD_CHECKOUT = ['12:00', '13:00', '14:00'];
  var ads = [];

  for (var j = 0; j < 8; j++) {
    var adLocationX = getRandomInt(300, 900);
    var adLocationY = getRandomInt(100, 500);

    ads[j] = {
      author: {
        avatar: 'img/avatars/user0' + (j + 1) + '.png'
      },
      offer: {
        title: AD_TITLE[j],
        address: adLocationX + ', ' + adLocationY,
        price: getRandomInt(1000, 1000000),
        type: AD_TYPE[getRandom(AD_TYPE.length)],
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: AD_CHECKIN[getRandom(AD_CHECKIN.length)],
        checkout: AD_CHECKOUT[getRandom(AD_CHECKOUT.length)],
        features: getFeatures(),
        description: '',
        photos: []
      },
      location: {
        x: adLocationX,
        y: adLocationY
      }
    };
  }

  return ads;
};

var showMap = function (map) {
  map.classList.remove('map--faded');
};

var renderPin = function (ad) {
  var location = ad.location;
  var author = ad.author;

  var pin = document.createElement('button');
  pin.className = 'map__pin';
  pin.style.left = location.x + 'px';
  pin.style.top = location.y + 'px';

  var img = document.createElement('img');
  img.src = author.avatar;
  img.width = 40;
  img.height = 40;
  img.draggable = false;
  pin.appendChild(img);

  return pin;
};

var renderPins = function (ads) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < ads.length; j++) {
    fragment.appendChild(renderPin(ads[j]));
  }

  mapPins.appendChild(fragment);
};

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

var getFeaturesList = function (offerFeatures, adElement) {
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

var renderAd = function (ads, map) {
  var adTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var adElement = adTemplate.cloneNode(true);
  var ad = ads[0];
  var offer = ad.offer;
  var type = getType(offer.type);
  var paragraphs = adElement.querySelectorAll('p');
  var features = offer.features;

  adElement.querySelector('h3').textContent = offer.title;
  adElement.querySelector('p small').textContent = offer.address;
  adElement.querySelector('.popup__price').textContent = offer.price + '\u20BD ' + '/ ночь';
  adElement.querySelector('h4').textContent = type;
  paragraphs[2].textContent = offer.rooms + ' для ' + offer.guests + ' гостей';
  paragraphs[3].textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  getFeaturesList(features, adElement);
  paragraphs[4].textContent = offer.description;
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;

  map.insertBefore(adElement, document.querySelector('.map__filters-container'));
};

var showMapOptions = function () {
  var map = document.querySelector('.map');
  var ads = getAdsList();
  renderPins(ads);
  renderAd(ads, map);
  showMap(map);
};

showMapOptions();
