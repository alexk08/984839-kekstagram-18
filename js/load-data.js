'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var CODE_SUCCESS = 200;

  var loadHandler = function (data) {
    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');
    window.photos = data;
    window.picturesList.render(data);
  };

  window.loadData = function (onSuccess, onError) {
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

    xhr.open('GET', URL);
    xhr.send();
  };

  window.loadData(loadHandler, window.errorHandler);
})();
