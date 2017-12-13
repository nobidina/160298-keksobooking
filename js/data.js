'use strict';

(function () {
  // // рандомные числа в диапозоне
  // var getRandomInt = function (min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };
  //
  // // рандомные числа
  // var getRandom = function (number) {
  //   return Math.floor(Math.random() * number);
  // };
  //
  // // массив рандомных особенностей жилья
  // var getFeatures = function () {
  //   var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  //   var countOfFeatures = getRandom(AD_FEATURES.length);
  //   var adRandomFeatures = [];
  //
  //   for (var i = 0; i < countOfFeatures; i++) {
  //     var randomFeature;
  //
  //     do {
  //       randomFeature = AD_FEATURES[getRandom(AD_FEATURES.length)];
  //     } while (adRandomFeatures.indexOf(randomFeature) !== -1);
  //
  //     adRandomFeatures[i] = randomFeature;
  //   }
  //
  //   return adRandomFeatures;
  // };

  // массив объектов объявлений
  var getAdsList = function (adsArray) {
    window.ads = adsArray;
  };

  window.backend.load(getAdsList, window.backend.errorHandler);
})();
