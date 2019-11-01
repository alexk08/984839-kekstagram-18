'use strict';

(function () {
  var discussedPhotosButton = document.querySelector('#filter-discussed');
  var popularPhotosButton = document.querySelector('#filter-popular');
  var randomPhotosButton = document.querySelector('#filter-random');

  var renewElements = function (pictures, button) {
    var activeButton = document.querySelector('.img-filters__button--active');
    var pictureElements = document.querySelector('.pictures').querySelectorAll('.picture');
    pictureElements.forEach(function (element) {
      element.remove();
    });
    var renderPhotos = function () {
      window.picturesList.render(pictures);
    };
    window.utils.debounce(renderPhotos);
    activeButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
  };

  var clickPopularFilterHandler = function () {
    renewElements(window.photos, popularPhotosButton);
  };

  var clickRandomFilterHandler = function () {
    var randomPhotos = window.utils.shuffleArray(window.photos).slice(0, 10);
    renewElements(randomPhotos, randomPhotosButton);
  };

  var clickDiscussedFilterHandler = function () {
    var sortPhotos = window.photos.slice().sort(function (a, b) {
      return (b.comments.length - a.comments.length);
    });
    renewElements(sortPhotos, discussedPhotosButton);
  };

  popularPhotosButton.addEventListener('mousedown', clickPopularFilterHandler);
  randomPhotosButton.addEventListener('mousedown', clickRandomFilterHandler);
  discussedPhotosButton.addEventListener('mousedown', clickDiscussedFilterHandler);
})();
