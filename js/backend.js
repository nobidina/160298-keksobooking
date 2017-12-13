'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка: ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    errorHandler: function (errorMessage) {
      var errorBlock = document.createElement('div');
      errorBlock.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      errorBlock.style.position = 'absolute';
      errorBlock.style.left = 0;
      errorBlock.style.right = 0;
      errorBlock.style.top = 0;
      errorBlock.style.fontSize = '30px';
      errorBlock.style.color = 'white';

      errorBlock.textContent = errorMessage;
      document.body.appendChild(errorBlock);
    }
  };

})();
