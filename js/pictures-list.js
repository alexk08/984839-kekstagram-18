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
  window.picturesList = {
    render: function (pictures) {
      var fragment = document.createDocumentFragment();
      pictures.forEach(function (picture) {
        fragment.appendChild(generatePicture(picture));
      });
      picturesListElement.appendChild(fragment);
    }
  };

  var loadHandler = function (response) {
    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');
    window.photos = response;
    window.picturesList.render(response);
  };

  window.backend.load(loadHandler, window.errorHandler, 'GET', window.utils.Url.LOAD);
})();
