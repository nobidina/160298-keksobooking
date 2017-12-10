'use strict';

(function () {
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
  window.getAdsList = function () {
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
})();
