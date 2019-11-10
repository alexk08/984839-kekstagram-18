'use strict';

(function () {
  var CODE_SUCCESS = 200;
  var TIMEOUT_VALUE = 10000;

  var createRequest = function (onSuccess, onError, method, url, xhr) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_VALUE;

    xhr.open(method, url);
  };

  window.backend = {
    load: function (onSuccess, onError, method, url) {
      var xhr = new XMLHttpRequest();
      createRequest(onSuccess, onError, method, url, xhr);
      xhr.send();
    },
    upload: function (data, onSuccess, onError, method, url) {
      var xhr = new XMLHttpRequest();
      createRequest(onSuccess, onError, method, url, xhr);
      xhr.send(data);
    }
  };
})();
