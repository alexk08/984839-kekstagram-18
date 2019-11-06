'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    UPLOAD: 'https://js.dump.academy/kekstagram'
  };
  var CODE_SUCCESS = 200;

  var loadHandler = function (data) {
    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');
    window.photos = data;
    window.picturesList.render(data);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
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

      xhr.timeout = 10000;

      xhr.open('GET', Url.LOAD);
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === CODE_SUCCESS) {
          onSuccess();
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

      xhr.timeout = 10000;

      xhr.open('POST', Url.UPLOAD);
      xhr.send(data);
    }
  };

  window.backend.load(loadHandler, window.errorHandler);
})();
