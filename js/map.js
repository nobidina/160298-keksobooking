'use strict';

var map = document.querySelector('.map');
var mapPinsBlock = document.querySelector('.map__pins');
var noticeForm = document.querySelector('.notice__form');
var mapMainPin = document.querySelector('.map__pin--main');
window.classMapPinActive = 'map__pin--active';
var ads = window.ads;

(function () {
  // показать карту
  var showMap = function () {
    map.classList.remove('map--faded');
  };

  // показать карту с метками
  var showMapOptions = function () {
    window.renderPins(mapPinsBlock, ads, 3);
    showMap(map);
  };

  // выбор адреса
  var mouseupMapMainPinHandler = function () {
    var formElements = document.querySelectorAll('.form__element');

    noticeForm.classList.remove('.notice__form--disabled');
    showMapOptions();

    formElements.forEach(function (formElement) {
      formElement.removeAttribute('disabled');
    });

    mapMainPin.removeEventListener('mouseup', mouseupMapMainPinHandler);
  };

  // перетаскивание главной метки
  var dragMainPinHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapMainPinСoords = {
        x: mapMainPin.offsetLeft - shift.x,
        y: mapMainPin.offsetTop - shift.y
      };

      if (mapMainPinСoords.y >= 100 && mapMainPinСoords.y <= 500) {
        mapMainPin.style.top = mapMainPinСoords.y + 'px';
      }

      mapMainPin.style.left = mapMainPinСoords.x + 'px';

      window.setInputAddressValue(mapMainPinСoords.x, mapMainPinСoords.y);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.chooseHouse = function () {
    mapMainPin.addEventListener('mousedown', dragMainPinHandler);
    mapMainPin.addEventListener('mouseup', mouseupMapMainPinHandler);
  };
})();

window.chooseHouse();
