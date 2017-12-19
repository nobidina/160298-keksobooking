'use strict';

(function (noticeForm) {
  // сценарии взаимодействия пользователя с формой отправки данных
  var MAIN_PIN_SHIFT = 53;
  var INPUT_PRICE_MIN_VALUES = [1000, 0, 5000, 10000];
  var inputAvatar = noticeForm.querySelector('#avatar');
  var avatarDropZone = noticeForm.querySelector('.upload .drop-zone');
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
  var imagesInput = noticeForm.querySelector('#images');
  var imagesDropZone = noticeForm.querySelector('.form__photo-container .drop-zone');

  // аватар

  var handleLoadAvatar = function (file) {
    var fileReader = new FileReader();

    fileReader.addEventListener('load', function (evt) {
      document.querySelector('.notice__preview img').src = evt.target.result;
    });

    fileReader.readAsDataURL(file);
  };

  avatarDropZone.addEventListener('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });

  avatarDropZone.addEventListener('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();

    var dataTransfer = e.dataTransfer;
    var files = dataTransfer.files;

    inputAvatar.files = files;

    handleLoadAvatar(files[0]);
  });

  window.setInputAddressValue = function (x, y) {
    inputAddress.value = 'x: ' + x + ', ' + 'y: ' + (y + MAIN_PIN_SHIFT);
  };

  // конвертируем nodeList в массив
  var nodeListToArray = function (nodeList) {
    var array = [];

    nodeList.forEach(function (nodeListItem) {
      array.push(nodeListItem.value);
    });

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

  // загрузка фотографий
  var handleLoadImages = function (files) {
    var IMG_WIDTH = '130px';
    var IMG_HEIGHT = '100px';
    var uploadBlock = document.querySelector('.form__photo-container .upload');
    var fragment = document.createDocumentFragment();
    var draggedElement;

    for (var i = 0; i < files.length; i++) {
      var fileReader = new FileReader();
      var img = document.createElement('img');
      img.style.width = IMG_WIDTH;
      img.style.height = IMG_HEIGHT;
      img.setAttribute('draggable', true);

      fragment.appendChild(img);

      (function (image) {
        fileReader.addEventListener('load', function (evt) {
          image.src = evt.target.result;
        });
        image.addEventListener('dragstart', function (evt) {
          draggedElement = evt.target;
        });
        image.addEventListener('dragover', function (evt) {
          evt.preventDefault();
        });
        image.addEventListener('drop', function (evt) {
          if (evt.target.src !== draggedElement.src) {
            var targetSrc = evt.target.src;
            evt.target.src = draggedElement.src;
            draggedElement.src = targetSrc;
          }
        });
      })(img);

      fileReader.readAsDataURL(files[i]);

      uploadBlock.appendChild(fragment);
    }
  };

  imagesDropZone.addEventListener('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });

  imagesDropZone.addEventListener('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();

    var dataTransfer = e.dataTransfer;
    var files = dataTransfer.files;

    imagesInput.files = files;

    handleLoadImages(files);
  });
  //

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

  // отправляем данные формы
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var successHandler = function () {
      noticeForm.reset();
    };

    window.backend.save(new FormData(noticeForm), successHandler, window.backend.errorHandler);
  });
})(window.noticeForm);
