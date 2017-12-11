'use strict';

(function (ads) {
  var BTN_ENTER = 13;

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

  var setupOpenAd = function (mapPins) {

    var pinClickHandler = function (evt) {
      var eventTarget = evt.target;
      var target = eventTarget.parentElement;
      window.ad.openAd(evt, target);
    };

    var pinEnterPressHandler = function (evt) {
      var eventTarget = evt.target;
      var target = eventTarget;
      if (evt.keyCode === BTN_ENTER) {
        window.ad.openAd(evt, target);
      }
    };

    mapPins.addEventListener('click', pinClickHandler);
    mapPins.addEventListener('keydown', pinEnterPressHandler);
  };

  // вставляем метки на карту
  window.renderPins = function (mapPins) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < ads.length; j++) {
      fragment.appendChild(renderPin(ads[j]));
    }

    mapPins.appendChild(fragment);
    setupOpenAd(mapPins);
  };
})(window.ads);
