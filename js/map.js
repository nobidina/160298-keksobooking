'use strict';

var BTN_ESC = 27;
var BTN_ENTER = 13;
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var classMapPinActive = 'map__pin--active';
var adElement;
var popupClose;
var mapMainPin = document.querySelector('.map__pin--main');

// рандомные числа в диапозоне
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// рандомные числа
var getRandom = function (number) {
  return Math.floor(Math.random() * number);
};

// массив рандомных особенностей жилья
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

// массив объектов объявлений
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

// показать карту
var showMap = function () {
  map.classList.remove('map--faded');
};

// делаем разметку одной метки на карте
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

// вставляем метки на карту
var renderPins = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < ads.length; j++) {
    fragment.appendChild(renderPin(ads[j]));
  }

  mapPins.appendChild(fragment);
};

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

// создаем объявление
var renderAd = function (ads, mapPinIndex) {
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

// получаем индексированный список маркеров
var getMapPinsIndexList = function () {
  var mapPin = mapPins.querySelectorAll('.map__pin');
  var mapPinsIndexList = [];

  for (var i = 0; i < mapPin.length; i++) {
    if (!mapPin[i].classList.contains('map__pin--main')) {
      mapPinsIndexList.push(mapPin[i]);
    }
  }

  return mapPinsIndexList;
};

// открытие карточки объявления
var setupOpenAd = function (ads) {

  var pinClickHandler = function (evt) {
    var eventTarget = evt.target;
    var target = eventTarget.parentElement;
    openAd(evt, target);
  };

  var pinEnterPressHandler = function (evt) {
    var eventTarget = evt.target;
    var target = eventTarget;
    if (evt.keyCode === BTN_ENTER) {
      openAd(evt, target);
    }
  };

  var openAd = function (evt, target) {
    var mapPinsIndexList = getMapPinsIndexList();
    var mapPinActive = document.querySelector('.' + classMapPinActive);

    if (mapPinActive) {
      mapPinActive.classList.remove(classMapPinActive);
    }

    if (target.tagName === 'BUTTON' && !target.classList.contains(classMapPinActive)) {
      var mapPinIndex = mapPinsIndexList.indexOf(target);
      target.classList.add(classMapPinActive);

      if (mapPinIndex !== -1) {
        renderAd(ads, mapPinIndex);
      }
    }
  };

  mapPins.addEventListener('click', pinClickHandler);
  mapPins.addEventListener('keydown', pinEnterPressHandler);
};

// закрытие карточки объявления
var closeAd = function () {
  map.removeChild(adElement);
  mapPins.querySelector('.' + classMapPinActive).classList.remove(classMapPinActive);

  popupClose.removeEventListener('click', buttonCloseClickHandler);
  map.removeEventListener('keydown', buttonCloseEscPressHandler);
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
  map.addEventListener('keydown', buttonCloseEscPressHandler);
};

// выбор адреса
var mouseupMapMainPinHandler = function () {
  var formElements = document.querySelectorAll('.form__element');
  var noticeForm = document.querySelector('.notice__form');

  noticeForm.classList.remove('.notice__form--disabled');
  showMapOptions();
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }
  mapMainPin.removeEventListener('mouseup', mouseupMapMainPinHandler);
};

var chooseHouse = function () {
  mapMainPin.addEventListener('mouseup', mouseupMapMainPinHandler);
};

// показать карту с метками
var showMapOptions = function () {
  var ads = getAdsList();

  renderPins(ads);
  showMap(map);
  setupOpenAd(ads);
};

chooseHouse();
