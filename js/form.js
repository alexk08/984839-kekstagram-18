'use strict';

(function () {
  var fileUploadControl = document.querySelector('#upload-file');
  var editImageControl = document.querySelector('.img-upload__overlay');
  var closeButton = editImageControl.querySelector('.img-upload__cancel');
  var uploadImageForm = document.querySelector('.img-upload__form');
  window.form = {
    image: document.querySelector('.img-upload__preview').querySelector('img'),
    effectLevelField: document.querySelector('.effect-level')
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
      closePopup();
    }
  };

  var openPopup = function () {
    editImageControl.classList.remove('hidden');
    document.addEventListener('keydown', documentKeydownHandler);
    window.form.effectLevelField.classList.add('hidden');
  };

  var closePopup = function () {
    editImageControl.classList.add('hidden');
    document.removeEventListener('keydown', documentKeydownHandler);
    fileUploadControl.value = '';
  };

  fileUploadControl.addEventListener('change', function () {
    openPopup();
  });

  closeButton.addEventListener('click', function () {
    closePopup();
  });

  uploadImageForm.addEventListener('reset', function () {
    window.form.image.removeAttribute('style');
    window.form.image.removeAttribute('class');
  });

  // доступность открытия input #upload-file с клавиатуры
  fileUploadControl.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      openPopup();
    }
  });
})();
