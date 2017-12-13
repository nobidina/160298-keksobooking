'use strict';

(function (noticeForm) {
  // сценарии взаимодействия пользователя с формой отправки данных
  var MAIN_PIN_SHIFT = 53;
  var INPUT_PRICE_MIN_VALUES = [1000, 0, 5000, 10000];
  var inputTitle = noticeForm.querySelector('#title');
  var inputAddress = noticeForm.querySelector('#address');
  var selectTimeIn = noticeForm.querySelector('#timein');
  var selectTimeOut = noticeForm.querySelector('#timeout');
  var selectType = noticeForm.querySelector('#type');
  var inputPrice = noticeForm.querySelector('#price');
  var selectRoomNumber = noticeForm.querySelector('#room_number');
  var selectCapacity = noticeForm.querySelector('#capacity');
  var selectCapacityOptions = selectCapacity.querySelectorAll('option');
  var selectTimeInOptions = selectTimeIn.querySelectorAll('option');
  var selectTimeOutOptions = selectTimeOut.querySelectorAll('option');
  var selectTypeOptions = selectType.querySelectorAll('option');

  window.setInputAddressValue = function (x, y) {
    inputAddress.value = 'x: ' + x + ', ' + 'y: ' + (y + MAIN_PIN_SHIFT);
  };

  // конвертируем nodeList в массив
  var nodeListToArray = function (nodeList) {
    var array = [];
    for (var i = 0; i < nodeList.length; i++) {
      array[i] = nodeList[i].value;
    }
    return array;
  };

  selectTimeInOptions = nodeListToArray(selectTimeInOptions);
  selectTimeOutOptions = nodeListToArray(selectTimeOutOptions);
  selectTypeOptions = nodeListToArray(selectTypeOptions);

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(selectTimeIn, selectTimeOut, selectTimeInOptions, selectTimeOutOptions, syncValues);
  window.synchronizeFields(selectTimeOut, selectTimeIn, selectTimeOutOptions, selectTimeInOptions, syncValues);
  window.synchronizeFields(selectType, inputPrice, selectTypeOptions, INPUT_PRICE_MIN_VALUES, syncValueWithMin);

  var selectCapacityChangeHandler = function () {
    while (selectCapacity.firstChild) {
      selectCapacity.removeChild(selectCapacity.firstChild);
    }

    if (selectRoomNumber.value === '1') {
      selectCapacity.appendChild(selectCapacityOptions[2]);
      selectCapacity.value = '1';
    } if (selectRoomNumber.value === '2') {
      selectCapacity.appendChild(selectCapacityOptions[2]);
      selectCapacity.appendChild(selectCapacityOptions[1]);
      selectCapacity.value = '1';
    } if (selectRoomNumber.value === '3') {
      selectCapacity.appendChild(selectCapacityOptions[2]);
      selectCapacity.appendChild(selectCapacityOptions[1]);
      selectCapacity.appendChild(selectCapacityOptions[0]);
      selectCapacity.value = '1';
    } if (selectRoomNumber.value === '100') {
      selectCapacity.appendChild(selectCapacityOptions[3]);
      selectCapacity.value = '0';
    }
  };

  selectCapacityChangeHandler();

  selectRoomNumber.addEventListener('change', selectCapacityChangeHandler);

  var setError = function (element) {
    element.style.borderWidth = '2px';
    element.style.borderStyle = 'solid';
    element.style.borderColor = 'red';
  };

  inputTitle.addEventListener('invalid', function () {
    if (!inputTitle.validity.valid) {
      setError(inputTitle);
    }
  });

  inputAddress.addEventListener('invalid', function () {
    if (!inputAddress.validity.valid) {
      setError(inputAddress);
    }
  });

  inputPrice.addEventListener('invalid', function () {
    if (!inputPrice.validity.valid) {
      setError(inputPrice);
    }
  });
})(window.noticeForm);
