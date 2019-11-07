'use strict';

(function () {
  var bigPictureOverlay = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPictureOverlay.querySelector('.cancel');
  var comment = bigPictureOverlay.querySelector('.social__comment');
  var commentsList = bigPictureOverlay.querySelector('.social__comments');
  var commentCount = bigPictureOverlay.querySelector('.social__comment-count');

  var Comment = {
    FIRST: 0,
    BATCH: 5
  };

  window.bigPicture = {
    renderOverlay: function (photo) {
      bigPictureOverlay.querySelector('.big-picture__img').querySelector('img').src = photo.url;
      bigPictureOverlay.querySelector('.likes-count').textContent = photo.likes;
      bigPictureOverlay.querySelector('.comments-count').textContent = photo.comments.length;
      bigPictureOverlay.querySelector('.social__caption').textContent = photo.description;

      commentsList.innerHTML = '';
      var firstBatchComments = photo.comments.slice(Comment.FIRST, Comment.BATCH);
      window.bigPicture.renderComments(firstBatchComments);
      commentCount.innerHTML = firstBatchComments.length + ' из ' + commentCount.innerHTML.split(' из ')[1];
    },
    generateComment: function (commentFromLoadData) {
      var commentElement = comment.cloneNode(true);
      commentElement.querySelector('img').src = commentFromLoadData.avatar;
      commentElement.querySelector('img').alt = commentFromLoadData.name;
      commentElement.querySelector('.social__text').textContent = commentFromLoadData.message;
      return commentElement;
    },
    renderComments: function (arrayOfComments) {
      var fragment = document.createDocumentFragment();
      arrayOfComments.forEach(function (element) {
        fragment.appendChild(window.bigPicture.generateComment(element));
      });
      commentsList.appendChild(fragment);
    }
  };

  var openBigPictureOverlay = function (evt) {
    var link = evt.target.closest('.picture');
    if (link) {
      evt.preventDefault();
      document.addEventListener('keydown', documentKeydownHandler);
      var img = link.querySelector('img');
      window.photos.forEach(function (photo) {
        if (photo.url === img.getAttribute('src')) {
          window.bigPicture.renderOverlay(photo);
          window.displayedPhoto = photo;
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

  var commentsLoadButton = bigPictureOverlay.querySelector('.comments-loader');

  var clickCommentsLoadButtonHandler = function () {
    var quantityShownComments = bigPictureOverlay.querySelectorAll('.social__comment').length;
    var nextBatchComments = window.displayedPhoto.comments.slice(quantityShownComments, quantityShownComments + Comment.BATCH);
    var nextQuantity = window.displayedPhoto.comments.slice(Comment.FIRST, quantityShownComments + Comment.BATCH).length;

    window.bigPicture.renderComments(nextBatchComments);
    commentCount.innerHTML = nextQuantity + ' из ' + commentCount.innerHTML.split(' из ')[1];

    if (nextQuantity === window.displayedPhoto.comments.length) {
      commentsLoadButton.classList.add('hidden');
    }
  };

  commentsLoadButton.addEventListener('click', clickCommentsLoadButtonHandler);
})();
