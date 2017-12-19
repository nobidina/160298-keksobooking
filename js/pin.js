'use strict';

(function () {
  var BTN_ENTER = 13;

  // делаем разметку одной метки на карте
  var renderPin = function (ad) {
    var location = ad.location;
    var author = ad.author;
    var pin = document.createElement('button');
    var img = document.createElement('img');

    pin.className = 'map__pin';
    pin.style.left = location.x + 'px';
    pin.style.top = location.y + 'px';

    img.src = author.avatar;
    img.width = 40;
    img.height = 40;
    img.draggable = false;
    pin.appendChild(img);

    return pin;
  };

  var setupOpenAd = function (mapPinsBlock) {

    var pinClickHandler = function (evt) {
      var eventTarget = evt.target;
      var target = eventTarget.tagName === 'BUTTON' ? eventTarget : eventTarget.parentElement;
      window.showCard(evt, target, window.filteredAds);
    };

    var pinEnterPressHandler = function (evt) {
      var eventTarget = evt.target;
      var target = eventTarget;
      if (evt.keyCode === BTN_ENTER) {
        window.showCard(evt, target, window.filteredAds);
      }
    };

    mapPinsBlock.addEventListener('click', pinClickHandler);
    mapPinsBlock.addEventListener('keydown', pinEnterPressHandler);
  };

  // вставляем метки на карту
  window.renderPins = function (mapPinsBlock, ads, adsLength) {
    var fragment = document.createDocumentFragment();
    var mapPins = mapPinsBlock.querySelectorAll('.map__pin');

    mapPins.forEach(function (mapPin) {
      if (mapPin && !mapPin.classList.contains('map__pin--main') && mapPin.tagName === 'BUTTON') {
        mapPinsBlock.removeChild(mapPin);
      }
    });

    if (!adsLength) {
      adsLength = ads.length;
      if (adsLength > 5) {
        adsLength = 5;
      }
    }

    for (var j = 0; j < adsLength; j++) {
      fragment.appendChild(renderPin(ads[j]));
    }

    mapPinsBlock.appendChild(fragment);
    setupOpenAd(mapPinsBlock);
  };
})();
