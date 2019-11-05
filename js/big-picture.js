'use strict';

(function () {
  window.bigPicture = {
    render: function (photo) {
      bigPictureOverlay.classList.remove('hidden');
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

  // ВОПРОС: что делать при нажатии на <p class="picture__info">, <span class="picture__comments">8</span>, <span class="picture__likes">28</span> ?
  var renderBigPictureWithThisSrc = function (src, evt) {
    evt.preventDefault();
    document.addEventListener('keydown', documentKeydownEscHandler);
    document.removeEventListener('keydown', documentKeydownEnterHandler);
    window.photos.forEach(function (photo) {
      if (src === photo.url) {
        window.bigPicture.render(photo);
      }
    });
  };

  var openBigPictureOverlay = function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      renderBigPictureWithThisSrc(evt.target.getAttribute('src'), evt);
    } else if (evt.target.classList.contains('picture')) {
      renderBigPictureWithThisSrc(evt.target.querySelector('img').getAttribute('src'), evt);
    }
  };

  var closeBigPictureOverlay = function () {
    bigPictureOverlay.classList.add('hidden');
    document.removeEventListener('keydown', documentKeydownEscHandler);
  };

  var documentKeydownEscHandler = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      closeBigPictureOverlay();
    }
  };

  var documentKeydownEnterHandler = function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      evt.preventDefault();
      openBigPictureOverlay(evt);
    }
  };

  document.addEventListener('click', function (evt) {
    openBigPictureOverlay(evt);
  });

  bigPictureCloseButton.addEventListener('click', function () {
    closeBigPictureOverlay();
  });

  document.addEventListener('keydown', documentKeydownEnterHandler);
})();
