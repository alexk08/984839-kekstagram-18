'use strict';

(function () {
  var mainContainer = document.querySelector('main');

  window.messages = {
    renderError: function () {
      window.form.close();
      var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
      var errorMessage = errorTemplate.cloneNode(true);
      mainContainer.appendChild(errorMessage);
      var errorInner = document.querySelector('.error__inner');
      var errorTitle = document.querySelector('.error__title');
      var errorButtons = document.querySelector('.error__buttons');

      var closeErrorMessage = function () {
        errorMessage.remove();
        document.removeEventListener('keydown', documentKeydownHandler);
        document.removeEventListener('click', documentClickHandler);
      };

      var documentClickHandler = function (evt) {
        if (evt.target !== errorInner && evt.target !== errorButtons && evt.target !== errorTitle) {
          closeErrorMessage();
        }
      };

      var documentKeydownHandler = function (evt) {
        if (window.utils.isEscPressed(evt)) {
          closeErrorMessage();
        }
      };

      document.addEventListener('keydown', documentKeydownHandler);
      document.addEventListener('click', documentClickHandler);
    },
    renderSuccess: function () {
      window.form.close();
      var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
      var successMessage = successTemplate.cloneNode(true);
      mainContainer.appendChild(successMessage);
      var successInner = document.querySelector('.success__inner');
      var successTitle = document.querySelector('.success__title');

      var closeSuccessMessage = function () {
        successMessage.remove();
        document.removeEventListener('keydown', documentKeydownHandler);
        document.removeEventListener('click', documentClickHandler);
      };

      var documentClickHandler = function (evt) {
        if (evt.target !== successInner && evt.target !== successTitle) {
          closeSuccessMessage();
        }
      };

      var documentKeydownHandler = function (evt) {
        if (window.utils.isEscPressed(evt)) {
          closeSuccessMessage();
        }
      };

      document.addEventListener('keydown', documentKeydownHandler);
      document.addEventListener('click', documentClickHandler);
    }
  };
})();
