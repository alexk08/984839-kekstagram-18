'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var generatePicture = function (photo) {
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;

    return picture;
  };

  var picturesList = document.querySelector('.pictures');

  window.picturesList = {
    render: function (pictures) {
      var fragment = document.createDocumentFragment();
      pictures.forEach(function (picture) {
        fragment.appendChild(generatePicture(picture));
      });
      picturesList.appendChild(fragment);
    }
  };

  var loadHandler = function (response) {
    var imageSortingBlock = document.querySelector('.img-filters');
    imageSortingBlock.classList.remove('img-filters--inactive');
    window.photos = response;
    window.picturesList.render(response);
  };

  window.backend.load(loadHandler, window.errorHandler, 'GET', window.utils.Url.LOAD);
})();
