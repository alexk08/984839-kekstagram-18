'use strict';

(function () {
  var filtersForm = document.querySelector('.img-filters__form');

  /**
   * Функция обновления отрисовки списка фотографии на странице
   * @param {Array} photos - массив объектов с данными о картинке/фотографии
   * @param {Object} evt - объект события
   */
  var renderPhotos = function (photos, evt) {
    var renewPictureList = function () {
      var pictureElements = document.querySelector('.pictures').querySelectorAll('.picture');
      pictureElements.forEach(function (element) {
        element.remove();
      });
      window.picturesList.render(photos);
    };
    var activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    window.utils.debounce(renewPictureList);
  };

  /**
   * Фильтрация по кнопке "Случайные"
   * @return {Array} - массив случайных фото
   */
  var filterByRandom = function () {
    var randomPhotos = window.utils.shuffleArray(window.photos).slice(0, 10);
    return randomPhotos;
  };

  /**
   * Фильтрация по кнопке "Обсуждаемые"
   * @return {Array} - массив сортированных фото по обсуждаемости
   */
  var filterByDiscussion = function () {
    var sortPhotos = window.photos.slice().sort(function (a, b) {
      return (b.comments.length - a.comments.length);
    });
    return sortPhotos;
  };

  var filtersFormClickHandler = function (evt) {
    if (evt.target.id === 'filter-popular') {
      renderPhotos(window.photos, evt);
    } else if (evt.target.id === 'filter-random') {
      renderPhotos(filterByRandom(), evt);
    } else if (evt.target.id === 'filter-discussed') {
      renderPhotos(filterByDiscussion(), evt);
    }
  };

  filtersForm.addEventListener('click', filtersFormClickHandler);
})();
