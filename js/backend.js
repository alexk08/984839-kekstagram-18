'use strict';

(function () {
  var CODE_SUCCESS = 200;
  var TIMEOUT_VALUE = 10000;

  var createRequest = function (successHandler, errorHandler, method, url, xhr) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        successHandler(xhr.response);
      } else {
        errorHandler();
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler();
    });
    xhr.addEventListener('timeout', function () {
      errorHandler();
    });

    xhr.timeout = TIMEOUT_VALUE;

    xhr.open(method, url);
  };

  window.backend = {
    load: function (successHandler, errorHandler, method, url) {
      var xhr = new XMLHttpRequest();
      createRequest(successHandler, errorHandler, method, url, xhr);
      xhr.send();
    },
    upload: function (data, successHandler, errorHandler, method, url) {
      var xhr = new XMLHttpRequest();
      createRequest(successHandler, errorHandler, method, url, xhr);
      xhr.send(data);
    }
  };
})();
