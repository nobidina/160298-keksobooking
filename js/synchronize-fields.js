'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, value1, value2, callback) {
    field1.addEventListener('change', function (evt) {
      var indexValue1 = value1.indexOf(evt.target.value);
      callback(field2, value2[indexValue1]);
    });
  };
})();
