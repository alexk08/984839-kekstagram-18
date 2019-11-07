'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    UPLOAD: 'https://js.dump.academy/kekstagram'
  };
  var CODE_SUCCESS = 200;
  var TIMEOUT_VALUE = 10000;

  var loadHandler = function (data) {
    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');
    window.photos = data;
    window.picturesList.render(data);
  };

  var createRequest = function (onSuccess, onError) {
    window.xhr = new XMLHttpRequest();
    window.xhr.responseType = 'json';

    window.xhr.addEventListener('load', function () {
      if (window.xhr.status === CODE_SUCCESS) {
        onSuccess(window.xhr.response);
      } else {
        onError();
      }
    });
    window.xhr.addEventListener('error', function () {
      onError();
    });
    window.xhr.addEventListener('timeout', function () {
      onError();
    });

    window.xhr.timeout = TIMEOUT_VALUE;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      createRequest(onSuccess, onError);

      window.xhr.open('GET', Url.LOAD);
      window.xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      createRequest(onSuccess, onError);

      window.xhr.open('POST', Url.UPLOAD);
      window.xhr.send(data);
    }
  };

  window.backend.load(loadHandler, window.errorHandler);
})();
