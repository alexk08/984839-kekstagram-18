'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileUploadControl = document.querySelector('#upload-file');
  var editImageControl = document.querySelector('.img-upload__overlay');
  var closeButton = editImageControl.querySelector('.img-upload__cancel');
  var uploadImageForm = document.querySelector('.img-upload__form');
  var effectsPreviews = editImageControl.querySelectorAll('.effects__preview');
  window.form = {
    image: document.querySelector('.img-upload__preview img'),
    effectLevelField: document.querySelector('.effect-level'),
    close: function () {
      editImageControl.classList.add('hidden');
      document.removeEventListener('keydown', documentKeydownHandler);
      fileUploadControl.value = '';
      uploadImageForm.reset();
    }
  };

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

  var insertPhoto = function () {
    var file = fileUploadControl.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          window.form.image.src = reader.result;

          effectsPreviews.forEach(function (item) {
            item.style.backgroundImage = 'url(' + reader.result + ')';
          });
        });

        reader.readAsDataURL(file);
      }
    }
  };

  fileUploadControl.addEventListener('change', function () {
    openForm();
    insertPhoto();
  });

  closeButton.addEventListener('click', function () {
    window.form.close();
  });

  uploadImageForm.addEventListener('reset', function () {
    window.form.image.removeAttribute('style');
    window.form.image.removeAttribute('class');
    window.hashtagsInput.removeAttribute('style');
    window.hashtagsInput.setCustomValidity('');
  });

  uploadImageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(uploadImageForm), uploadHadler, window.errorHandler, 'POST', window.utils.Url.UPLOAD);
  });

  var uploadHadler = function () {
    window.form.close();
    var mainContainer = document.querySelector('main');
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    mainContainer.appendChild(successMessage);
    var successInner = document.querySelector('.success__inner');
    var successTitle = document.querySelector('.success__title');

    var successMessageCloseHandler = function (evt) {
      if (window.utils.isEscPressed(evt) || (evt.type === 'click' && evt.target !== successInner && evt.target !== successTitle)) {
        successMessage.remove();
        document.removeEventListener('keydown', successMessageCloseHandler);
        document.removeEventListener('click', successMessageCloseHandler);
      }
    };

    document.addEventListener('keydown', successMessageCloseHandler);
    document.addEventListener('click', successMessageCloseHandler);
  };
})();
