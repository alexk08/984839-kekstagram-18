'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  /**
   * Функция создания DOM-элемента на основе JS-объекта
   * @param {Object} photo -  объект с данными о фото
   * @return {any} DOM-элемент
   */
  var generatePicture = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return pictureElement;
  };

  var picturesListElement = document.querySelector('.pictures');

  /**
   * Функция заполнения списка фотографий DOM-элементами на основе массива данных
   * @param {Array} photos - массив JS-объектов с данными
   */
  window.fillPictureList = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (elementOfPhotos) {
      fragment.appendChild(generatePicture(elementOfPhotos));
    });
    picturesListElement.appendChild(fragment);

    window.arrayOfPhotos = photos;
  };

  var errorTemplate = document.querySelector('#error')
    .content
    .firstElementChild;
  var mainElement = document.querySelector('main');

  /**
   * Функция вывода сообщения об ошибке загрузки файлов
   */
  var errorHandler = function () {
    var errorElement = errorTemplate.cloneNode(true);
    mainElement.appendChild(errorElement);

    var closeErrorMessageHandler = function (evt) {
      if (window.utils.isEscPressed(evt) || evt.type === 'click') {
        errorElement.remove();
        document.removeEventListener('keydown', closeErrorMessageHandler);
        document.removeEventListener('click', closeErrorMessageHandler);
      }
    };

    document.addEventListener('keydown', closeErrorMessageHandler);
    document.addEventListener('click', closeErrorMessageHandler);
  };

  window.loadData(fillPictureList, errorHandler);
})();
