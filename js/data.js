'use strict';

(function () {

  // массив объектов объявлений
  var getAdsList = function (adsArray) {
    window.ads = adsArray;
  };

  window.backend.load(getAdsList, window.backend.errorHandler);
})();
