'use strict';

(function (mapPinsBlock, classMapPinActive) {
  // получаем индексированный список маркеров
  var getMapPinsIndexList = function () {
    var mapPins = mapPinsBlock.querySelectorAll('.map__pin');
    var mapPinsIndexList = [];

    mapPins.forEach(function (mapPin) {
      if (!mapPin.classList.contains('map__pin--main')) {
        mapPinsIndexList.push(mapPin);
      }
    });

    return mapPinsIndexList;
  };
  // открытие карточки объявления
  window.showCard = function (evt, target, ads) {
    var mapPinsIndexList = getMapPinsIndexList();
    var mapPinActive = document.querySelector('.' + classMapPinActive);

    if (mapPinActive) {
      mapPinActive.classList.remove(classMapPinActive);
    }

    if (target.tagName === 'BUTTON' && !target.classList.contains(classMapPinActive)) {
      var mapPinIndex = mapPinsIndexList.indexOf(target);
      target.classList.add(classMapPinActive);

      if (mapPinIndex !== -1) {
        window.renderAd(mapPinIndex, ads);
      }
    }
  };
})(window.mapPinsBlock, window.classMapPinActive);
