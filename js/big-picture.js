'use strict';

(function () {
  window.bigPicture = {
    render: function (photo) {
      bigPictureOverlay.querySelector('.big-picture__img').querySelector('img').src = photo.url;
      bigPictureOverlay.querySelector('.likes-count').textContent = photo.likes;
      bigPictureOverlay.querySelector('.comments-count').textContent = photo.comments.length;

      var commentsList = bigPictureOverlay.querySelector('.social__comments');
      var comment = bigPictureOverlay.querySelector('.social__comment');

      commentsList.innerHTML = '';

      /**
       * Функция создание DOM-элемента на базе объекта комментария из загруженных данных из сети
       * @param {Object} commentFromLoadData - комментарий из загруженных данных
       * @return {any} DOM-элемент
       */
      var generateComment = function (commentFromLoadData) {
        var commentElement = comment.cloneNode(true);
        commentElement.querySelector('img').src = commentFromLoadData.avatar;
        commentElement.querySelector('img').alt = commentFromLoadData.name;
        commentElement.querySelector('.social__text').textContent = commentFromLoadData.message;
        return commentElement;
      };

      /**
       * Функция отрисовки списка комментариев
       * @param {Array} arrayOfComments - массив загруженых комментариев
       */
      var renderComments = function (arrayOfComments) {
        var fragment = document.createDocumentFragment();
        arrayOfComments.forEach(function (element) {
          fragment.appendChild(generateComment(element));
        });
        commentsList.appendChild(fragment);
      };

      renderComments(photo.comments);

      bigPictureOverlay.querySelector('.social__caption').textContent = photo.description;
      bigPictureOverlay.querySelector('.social__comment-count').classList.add('visually-hidden');
      bigPictureOverlay.querySelector('.comments-loader').classList.add('visually-hidden');
    }
  };

  var bigPictureOverlay = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPictureOverlay.querySelector('.cancel');

  var openBigPictureOverlay = function (evt) {
    var link = evt.target.closest('.picture');
    if (link) {
      evt.preventDefault();
      document.addEventListener('keydown', documentKeydownHandler);
      var img = link.querySelector('img');
      window.photos.forEach(function (photo) {
        if (photo.url === img.getAttribute('src')) {
          window.bigPicture.render(photo);
        }
      });
      bigPictureOverlay.classList.remove('hidden');
    }
  };

  var closeBigPictureOverlay = function () {
    bigPictureOverlay.classList.add('hidden');
    document.removeEventListener('keydown', documentKeydownHandler);
  };

  var documentKeydownHandler = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      closeBigPictureOverlay();
    }
  };

  document.addEventListener('click', function (evt) {
    openBigPictureOverlay(evt);
  });

  bigPictureCloseButton.addEventListener('click', function () {
    closeBigPictureOverlay();
  });
})();
