'use strict';

(function () {
  var Comment = {
    FIRST: 0,
    BATCH: 5
  };

  var bigPictureOverlay = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPictureOverlay.querySelector('.cancel');
  var commentItem = bigPictureOverlay.querySelector('.social__comment');
  var commentsList = bigPictureOverlay.querySelector('.social__comments');
  var commentsCount = bigPictureOverlay.querySelector('.social__comment-count');
  var commentsLoadButton = bigPictureOverlay.querySelector('.comments-loader');

  var renderBigPicture = function (photo) {
    bigPictureOverlay.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureOverlay.querySelector('.likes-count').textContent = photo.likes;
    bigPictureOverlay.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureOverlay.querySelector('.social__caption').textContent = photo.description;

    commentsList.innerHTML = '';
    var firstBatchComments = photo.comments.slice(Comment.FIRST, Comment.BATCH);
    renderComments(firstBatchComments);
    commentsCount.innerHTML = firstBatchComments.length + ' из ' + commentsCount.innerHTML.split(' из ')[1];
  };

  var generateComment = function (commentFromLoadData) {
    var comment = commentItem.cloneNode(true);
    comment.querySelector('img').src = commentFromLoadData.avatar;
    comment.querySelector('img').alt = commentFromLoadData.name;
    comment.querySelector('.social__text').textContent = commentFromLoadData.message;
    return comment;
  };

  var renderComments = function (arrayOfComments) {
    var fragment = document.createDocumentFragment();
    arrayOfComments.forEach(function (item) {
      fragment.appendChild(generateComment(item));
    });
    commentsList.appendChild(fragment);
  };

  var openBigPictureOverlay = function (evt) {
    var link = evt.target.closest('.picture');
    if (link) {
      evt.preventDefault();
      document.addEventListener('keydown', documentKeydownHandler);
      var image = link.querySelector('img');
      window.photos.forEach(function (photo) {
        if (photo.url === image.getAttribute('src')) {
          renderBigPicture(photo);
          window.displayedPhoto = photo;
        }
      });
      bigPictureOverlay.classList.remove('hidden');
      commentsLoadButton.classList.remove('hidden');
      document.body.classList.add('modal-open');

      if (window.displayedPhoto.comments.length <= Comment.BATCH) {
        commentsLoadButton.classList.add('hidden');
      }
    }
  };

  var closeBigPictureOverlay = function () {
    bigPictureOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
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

  var commentsLoadButtonClickHandler = function () {
    var quantityShownComments = bigPictureOverlay.querySelectorAll('.social__comment').length;
    var nextBatchComments = window.displayedPhoto.comments.slice(quantityShownComments, quantityShownComments + Comment.BATCH);
    var nextQuantity = window.displayedPhoto.comments.slice(Comment.FIRST, quantityShownComments + Comment.BATCH).length;

    renderComments(nextBatchComments);
    commentsCount.innerHTML = nextQuantity + ' из ' + commentsCount.innerHTML.split(' из ')[1];

    if (nextQuantity === window.displayedPhoto.comments.length) {
      commentsLoadButton.classList.add('hidden');
    }
  };

  commentsLoadButton.addEventListener('click', commentsLoadButtonClickHandler);
})();
