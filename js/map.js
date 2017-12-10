'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var noticeForm = document.querySelector('.notice__form');
var ads = window.getAdsList();

(function () {
  var mapMainPin = document.querySelector('.map__pin--main');
  // показать карту
  var showMap = function () {
    map.classList.remove('map--faded');
  };

  // показать карту с метками
  var showMapOptions = function () {
    window.renderPins(mapPins, ads);
    showMap(map);
  };

  // выбор адреса
  var mouseupMapMainPinHandler = function () {
    var formElements = document.querySelectorAll('.form__element');

    noticeForm.classList.remove('.notice__form--disabled');
    showMapOptions();
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }
    mapMainPin.removeEventListener('mouseup', mouseupMapMainPinHandler);
  };

  window.chooseHouse = function () {
    mapMainPin.addEventListener('mouseup', mouseupMapMainPinHandler);
  };
})();

window.chooseHouse();
