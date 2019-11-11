'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var mainContainer = document.querySelector('main');

  window.errorHandler = function () {
    window.form.close();
    var errorMessage = errorTemplate.cloneNode(true);
    mainContainer.appendChild(errorMessage);
    var errorInner = document.querySelector('.error__inner');
    var errorTitle = document.querySelector('.error__title');
    var errorButtons = document.querySelector('.error__buttons');

    var errorMessageCloseHandler = function (evt) {
      if (window.utils.isEscPressed(evt) || (evt.type === 'click' && evt.target !== errorInner && evt.target !== errorButtons && evt.target !== errorTitle)) {
        errorMessage.remove();
        document.removeEventListener('keydown', errorMessageCloseHandler);
        document.removeEventListener('click', errorMessageCloseHandler);
      }
    };

    document.addEventListener('keydown', errorMessageCloseHandler);
    document.addEventListener('click', errorMessageCloseHandler);
  };
})();
