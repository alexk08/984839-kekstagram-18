'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var fileUploadControl = document.querySelector('#upload-file');
  var editImageControl = document.querySelector('.img-upload__overlay');
  var closeButton = editImageControl.querySelector('.img-upload__cancel');
  var uploadImageForm = document.querySelector('.img-upload__form');
  window.form = {
    image: document.querySelector('.img-upload__preview').firstElementChild,
    effectLevelField: document.querySelector('.effect-level')
  };


  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('text__hashtags')) {
      evt.preventDefault();
      uploadImageForm.reset();
      window.form.image.removeAttribute('style');
      window.form.image.removeAttribute('class');
      closePopup();
    }
  };

  var openPopup = function () {
    editImageControl.classList.remove('hidden');
    document.addEventListener('keydown', escPressHandler);
    window.form.effectLevelField.classList.add('hidden');
  };

  var closePopup = function () {
    editImageControl.classList.add('hidden');
    document.removeEventListener('keydown', escPressHandler);
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
})();