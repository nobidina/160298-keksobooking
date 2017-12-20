'use strict';

(function () {
  window.map = document.querySelector('.map');
  window.mapPinsBlock = document.querySelector('.map__pins');
  window.noticeForm = document.querySelector('.notice__form');
  window.mapMainPin = document.querySelector('.map__pin--main');
  window.classMapPinActive = 'map__pin--active';

  // показать карту
  var showMap = function () {
    window.map.classList.remove('map--faded');
  };

  // показать карту с метками
  var showMapOptions = function () {
    var PINS_NUMBER = 5;

    window.renderPins(window.mapPinsBlock, window.ads, PINS_NUMBER);
    showMap(window.map);
  };

  // выбор адреса
  var mouseupMapMainPinHandler = function () {
    var formElements = document.querySelectorAll('.form__element');
    var formHeader = document.querySelector('.notice__header');

    window.noticeForm.classList.remove('notice__form--disabled');
    showMapOptions();

    formElements.forEach(function (formElement) {
      formElement.removeAttribute('disabled');
      formHeader.removeAttribute('disabled');
    });

    window.mapMainPin.removeEventListener('mouseup', mouseupMapMainPinHandler);
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
        x: window.mapMainPin.offsetLeft - shift.x,
        y: window.mapMainPin.offsetTop - shift.y
      };

      if (mapMainPinСoords.y >= 100 && mapMainPinСoords.y <= 500) {
        window.mapMainPin.style.top = mapMainPinСoords.y + 'px';
      }

      window.mapMainPin.style.left = mapMainPinСoords.x + 'px';

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
    window.mapMainPin.addEventListener('mousedown', dragMainPinHandler);
    window.mapMainPin.addEventListener('mouseup', mouseupMapMainPinHandler);
  };

  window.chooseHouse();
})();
