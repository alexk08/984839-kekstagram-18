'use strict';

(function () {
  var fileUploadControl = document.querySelector('#upload-file');
  var editImageControl = document.querySelector('.img-upload__overlay');
  var closeButton = editImageControl.querySelector('.img-upload__cancel');
  var uploadImageForm = document.querySelector('.img-upload__form');
  window.form = {
    image: document.querySelector('.img-upload__preview').querySelector('img'),
    effectLevelField: document.querySelector('.effect-level'),
    close: function () {
      editImageControl.classList.add('hidden');
      document.removeEventListener('keydown', documentKeydownHandler);
      fileUploadControl.value = '';
      uploadImageForm.reset();
    }
  };

  /**
   * Обработчик нажатия клавиши.
   * @param {Object} evt - объект события
   */
  var documentKeydownHandler = function (evt) {
    if (window.utils.isEscPressed(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
      evt.preventDefault();
      uploadImageForm.reset();
      window.form.image.removeAttribute('style');
      window.form.image.removeAttribute('class');
      window.form.close();
    }
  };

  var openForm = function () {
    editImageControl.classList.remove('hidden');
    document.addEventListener('keydown', documentKeydownHandler);
    window.form.effectLevelField.classList.add('hidden');
  };

  fileUploadControl.addEventListener('change', function () {
    openForm();
  });

  closeButton.addEventListener('click', function () {
    window.form.close();
  });

  uploadImageForm.addEventListener('reset', function () {
    window.form.image.removeAttribute('style');
    window.form.image.removeAttribute('class');
  });

  uploadImageForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(uploadImageForm), uploadHadler, window.errorHandler, 'POST', window.utils.Url.UPLOAD);
    evt.preventDefault();
  });

  var uploadHadler = function () {
    window.form.close();
    var mainElement = document.querySelector('main');
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    mainElement.appendChild(successElement);
    var successInner = document.querySelector('.success__inner');
    var successTitle = document.querySelector('.success__title');

    var closeSuccessMessageHandler = function (evt) {
      if (window.utils.isEscPressed(evt) || (evt.type === 'click' && evt.target !== successInner && evt.target !== successTitle)) {
        successElement.remove();
        document.removeEventListener('keydown', closeSuccessMessageHandler);
        document.removeEventListener('click', closeSuccessMessageHandler);
      }
    };

    document.addEventListener('keydown', closeSuccessMessageHandler);
    document.addEventListener('click', closeSuccessMessageHandler);
  };
})();
