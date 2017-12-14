'use strict';

(function (mapPins, classMapPinActive) {
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
})(window.mapPins, window.classMapPinActive);
