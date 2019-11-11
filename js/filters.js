'use strict';

(function () {
  var imageSortingForm = document.querySelector('.img-filters__form');

  var renderPhotos = function (photos, evt) {
    var renewPictureList = function () {
      var displayedPictures = document.querySelector('.pictures').querySelectorAll('.picture');
      displayedPictures.forEach(function (item) {
        item.remove();
      });
      window.picturesList.render(photos);
    };
    var activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    window.utils.debounce(renewPictureList);
  };

  var sortByRandom = function () {
    var randomPhotos = window.utils.shuffleArray(window.photos).slice(0, 10);
    return randomPhotos;
  };

  var sortByDiscussion = function () {
    var sortPhotos = window.photos.slice().sort(function (a, b) {
      return (b.comments.length - a.comments.length);
    });
    return sortPhotos;
  };

  var imageSortingFormClickHandler = function (evt) {
    if (evt.target.id === 'filter-popular') {
      renderPhotos(window.photos, evt);
    } else if (evt.target.id === 'filter-random') {
      renderPhotos(sortByRandom(), evt);
    } else if (evt.target.id === 'filter-discussed') {
      renderPhotos(sortByDiscussion(), evt);
    }
  };

  imageSortingForm.addEventListener('click', imageSortingFormClickHandler);
})();
