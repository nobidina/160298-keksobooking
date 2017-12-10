'use strict';

(function (noticeForm) {
  // сценарии взаимодействия пользователя с формой отправки данных
  // написала переменные тут, чтобы потом по модулям удобнее было разбивать

  var inputTitle = noticeForm.querySelector('#title');
  var inputAddress = noticeForm.querySelector('#address');
  var selectTimeIn = noticeForm.querySelector('#timein');
  var selectTimeOut = noticeForm.querySelector('#timeout');
  var selectType = noticeForm.querySelector('#type');
  var inputPrice = noticeForm.querySelector('#price');
  var selectRoomNumber = noticeForm.querySelector('#room_number');
  var selectCapacity = noticeForm.querySelector('#capacity');
  var selectCapacityOptions = selectCapacity.querySelectorAll('option');

  selectTimeIn.addEventListener('change', function (event) {
    selectTimeOut.value = event.target.value;
  });

  selectTimeOut.addEventListener('change', function (event) {
    selectTimeIn.value = event.target.value;
  });

  selectType.addEventListener('change', function () {
    if (selectType.value === 'bungalo') {
      inputPrice.min = '0';
    } if (selectType.value === 'flat') {
      inputPrice.min = '1000';
    } if (selectType.value === 'house') {
      inputPrice.min = '5000';
    } if (selectType.value === 'palace') {
      inputPrice.min = '10000';
    }
  });

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
