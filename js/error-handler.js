'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var mainElement = document.querySelector('main');

  /**
   * Функция вывода сообщения об ошибке загрузки файлов
   */
  window.errorHandler = function () {
    window.form.close();
    var errorElement = errorTemplate.cloneNode(true);
    mainElement.appendChild(errorElement);
    var errorInner = document.querySelector('.error__inner');
    var errorTitle = document.querySelector('.error__title');
    var errorButtons = document.querySelector('.error__buttons');

    var closeErrorMessageHandler = function (evt) {
      if (window.utils.isEscPressed(evt) || (evt.type === 'click' && evt.target !== errorInner && evt.target !== errorButtons && evt.target !== errorTitle)) {
        errorElement.remove();
        document.removeEventListener('keydown', closeErrorMessageHandler);
        document.removeEventListener('click', closeErrorMessageHandler);
      }
    };

    document.addEventListener('keydown', closeErrorMessageHandler);
    document.addEventListener('click', closeErrorMessageHandler);
  };
})();
