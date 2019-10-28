'use strict';
(function () {
  var PHOTO_QTY = 25;
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  /**
   * Функция создания DOM-элемента на основе JS-объекта
   * @param {Object} photo -  объект с данными о фото
   * @return {any} DOM-элемент
   */
  var renderPicture = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return pictureElement;
  };

  /**
   * Функция заполнения фрагмента DOM-элементами на основе массива JS-объектов
   * @param {Array} arrayOfObjects - массив JS-объектов с данными
   * @return {DocumentFragment} фрагмент с DOM-элементами
   */
  var createFragment = function (arrayOfObjects) {
    var fragment = document.createDocumentFragment();
    arrayOfObjects.forEach(function (photo) {
      fragment.appendChild(renderPicture(photo));
    });
    return fragment;
  };

  var picturesListElement = document.querySelector('.pictures');
  picturesListElement.appendChild(createFragment(window.data.getPhotos(PHOTO_QTY)));
})();
