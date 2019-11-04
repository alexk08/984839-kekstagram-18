'use strict';

(function () {
  var discussedPhotosButton = document.querySelector('#filter-discussed');
  var popularPhotosButton = document.querySelector('#filter-popular');
  var randomPhotosButton = document.querySelector('#filter-random');

  /**
   * Функция обновления отрисовки списка фотографии на странице
   * @param {Array} pictures - массив объектов с данными о картинке/фотографии
   * @param {any} button - DOM-элемент кнопки фильтра
   */
  var renewElements = function (pictures, button) {
    var renderPhotos = function () {
      var pictureElements = document.querySelector('.pictures').querySelectorAll('.picture');
      pictureElements.forEach(function (element) {
        element.remove();
      });
      window.picturesList.render(pictures);
    };
    var activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
    window.utils.debounce(renderPhotos);
  };

  /**
   * Обработчик нажатия кнопки фильтра "Популярные"
   */
  var clickPopularFilterHandler = function () {
    renewElements(window.photos, popularPhotosButton);
  };

  /**
   * Обработчик нажатия кнопки фильтра "Случайные"
   */
  var clickRandomFilterHandler = function () {
    var randomPhotos = window.utils.shuffleArray(window.photos).slice(0, 10);
    renewElements(randomPhotos, randomPhotosButton);
  };

  /**
   * Обработчик нажатия кнопки фильтра "Обсуждаемые"
   */
  var clickDiscussedFilterHandler = function () {
    var sortPhotos = window.photos.slice().sort(function (a, b) {
      return (b.comments.length - a.comments.length);
    });
    renewElements(sortPhotos, discussedPhotosButton);
  };

  popularPhotosButton.addEventListener('mousedown', clickPopularFilterHandler);
  randomPhotosButton.addEventListener('mousedown', clickRandomFilterHandler);
  discussedPhotosButton.addEventListener('mousedown', clickDiscussedFilterHandler);

  // Прошу проверить код ниже: доступность фильтров
  var pressKeyEnterOnFilter = function (evt, filterHandler) {
    if (window.utils.isEnterPressed(evt)) {
      evt.preventDefault();
      filterHandler();
    }
  };

  popularPhotosButton.addEventListener('keydown', function (evt) {
    pressKeyEnterOnFilter(evt, clickPopularFilterHandler);
  });
  randomPhotosButton.addEventListener('keydown', function (evt) {
    pressKeyEnterOnFilter(evt, clickRandomFilterHandler);
  });
  discussedPhotosButton.addEventListener('keydown', function (evt) {
    pressKeyEnterOnFilter(evt, clickDiscussedFilterHandler);
  });
})();
