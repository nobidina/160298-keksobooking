'use strict';

(function (mapPinsBlock) {
  var TYPE_ANY = 'any';
  var PRICE_LOW = 'low';
  var PRICE_MIDDLE = 'middle';
  var PRICE_HIGH = 'high';
  var PRICE_LOW_NUMBER = 10000;
  var PRICE_HIGH_NUMBER = 50000;
  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterGuestsNumber = document.querySelector('#housing-guests');
  var filterFeaturesBlock = document.querySelector('#housing-features');
  var filterWiFi = filterFeaturesBlock.querySelector('#filter-wifi');
  var filterDishwasher = filterFeaturesBlock.querySelector('#filter-dishwasher');
  var filterParking = filterFeaturesBlock.querySelector('#filter-parking');
  var filterWasher = filterFeaturesBlock.querySelector('#filter-washer');
  var filterElevator = filterFeaturesBlock.querySelector('#filter-elevator');
  var filterConditioner = filterFeaturesBlock.querySelector('#filter-conditioner');

  var filterTypeValue = TYPE_ANY;
  var filterPriceValue = TYPE_ANY;
  var filterRoomsValue = TYPE_ANY;
  var filterGuestsNumberValue = TYPE_ANY;
  var filterWiFiChecked;
  var filterDishwasherChecked;
  var filterParkingChecked;
  var filterWasherChecked;
  var filterElevatorChecked;
  var filterConditionerChecked;

  filterType.addEventListener('change', function (evt) {
    filterTypeValue = evt.target.value;
    window.debounce(updatePins);
  });
  filterPrice.addEventListener('change', function (evt) {
    filterPriceValue = evt.target.value;
    window.debounce(updatePins);
  });
  filterRooms.addEventListener('change', function (evt) {
    filterRoomsValue = evt.target.value;
    window.debounce(updatePins);
  });
  filterGuestsNumber.addEventListener('change', function (evt) {
    filterGuestsNumberValue = evt.target.value;
    window.debounce(updatePins);
  });
  filterWiFi.addEventListener('change', function () {
    filterWiFiChecked = filterWiFi.checked;
    window.debounce(updatePins);
  });
  filterDishwasher.addEventListener('change', function () {
    filterDishwasherChecked = filterDishwasher.checked;
    window.debounce(updatePins);
  });
  filterParking.addEventListener('change', function () {
    filterParkingChecked = filterParking.checked;
    window.debounce(updatePins);
  });
  filterWasher.addEventListener('change', function () {
    filterWasherChecked = filterWasher.checked;
    window.debounce(updatePins);
  });
  filterElevator.addEventListener('change', function () {
    filterElevatorChecked = filterElevator.checked;
    window.debounce(updatePins);
  });
  filterConditioner.addEventListener('change', function () {
    filterConditionerChecked = filterConditioner.checked;
    window.debounce(updatePins);
  });

  var filterAds = function (ad) {
    var adOffer = ad.offer;
    var adFeatures = adOffer.features;
    var adPrice = adOffer.price;

    if (filterTypeValue !== TYPE_ANY && adOffer.type !== filterTypeValue) {
      return false;
    }
    if (filterPriceValue !== TYPE_ANY &&
      (filterPriceValue === PRICE_LOW && adPrice >= PRICE_LOW_NUMBER
      || filterPriceValue === PRICE_MIDDLE && (adPrice <= PRICE_LOW_NUMBER || adPrice >= PRICE_HIGH_NUMBER)
      || filterPriceValue === PRICE_HIGH && adPrice <= PRICE_HIGH_NUMBER)
    ) {
      return false;
    }
    if (filterRoomsValue !== TYPE_ANY && adOffer.rooms !== filterRoomsValue * 1) {
      return false;
    }
    if (filterGuestsNumberValue !== TYPE_ANY && adOffer.guests !== filterGuestsNumberValue * 1) {
      return false;
    }
    if (filterWiFiChecked && adFeatures.indexOf(filterWiFi.value) === -1) {
      return false;
    }
    if (filterDishwasherChecked && adFeatures.indexOf(filterDishwasher.value) === -1) {
      return false;
    }
    if (filterParkingChecked && adFeatures.indexOf(filterParking.value) === -1) {
      return false;
    }
    if (filterWasherChecked && adFeatures.indexOf(filterWasher.value) === -1) {
      return false;
    }
    if (filterElevatorChecked && adFeatures.indexOf(filterElevator.value) === -1) {
      return false;
    }
    if (filterConditionerChecked && adFeatures.indexOf(filterConditioner.value) === -1) {
      return false;
    }
    return true;
  };

  var updatePins = function () {
    window.filteredAds = window.ads.filter(filterAds);
    window.renderPins(mapPinsBlock, window.filteredAds);
  };

})(window.mapPinsBlock);
