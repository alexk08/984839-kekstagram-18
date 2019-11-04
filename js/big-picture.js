'use strict';

(function () {
  window.bigPicture = {
    render: function (photo) {
      window.bigPictureOverlay = document.querySelector('.big-picture');

      bigPictureOverlay.classList.remove('hidden');
      bigPictureOverlay.querySelector('.big-picture__img').firstElementChild.src = photo.url;
      bigPictureOverlay.querySelector('.likes-count').textContent = photo.likes;
      bigPictureOverlay.querySelector('.comments-count').textContent = photo.comments.length;

      // ищу список комментариев
      var commentsList = bigPictureOverlay.querySelector('.social__comments');

      // ищу все комментарии, в разметке их больше одного. Более лучшей реализацией был бы шаблон (наверное).
      // Сохраняю коллекцию в переменную
      // var comments = bigPictureOverlay.querySelectorAll('.social__comment');

      // Сохраняю для дальнейшей работы один комментарий.
      // var comment = comments[0];

      // Удаляю существующие на данный момент комментарии из разметки
      // comments.forEach(function (element) {
      // element.remove();
      // });

      // другой вариант сохранения одного комментария для дальнейшего клонирования и очистки списка комментариев
      var comment = bigPictureOverlay.querySelector('.social__comment');

      // while (commentsList.firstChild) {
      //   commentsList.removeChild(commentsList.firstChild);
      // };

      // какой из методов по очистке списка лучше?
      commentsList.innerHTML = '';

      /**
       * Функция создание DOM-элемента на базе объекта комментария из загруженных данных из сети
       * @param {Object} commentFromLoadData - комментарий из загруженных данных
       * @return {any} DOM-элемент
       */
      var generateComment = function (commentFromLoadData) {
        var commentElement = comment.cloneNode(true);
        commentElement.firstElementChild.src = commentFromLoadData.avatar;
        commentElement.firstElementChild.alt = commentFromLoadData.name;
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
})();

// временное использование метода window.bigPicture.render для проверки его работоспособности
// В следующем задании сделаю нормальный обработчик, буду вызывать этот метод по нажатию на миниатюрную фото из списка
// window.setTimeout(function () {
//   window.bigPicture.render(window.photos[0]);
// }, 3000);

(function () {
  console.log(picture);

/*  window.setTimeout(function () {
    var pictures = document.querySelectorAll('.picture');
    console.log(pictures);
    pictures.forEach(function (picture) {
      console.log(picture);
      picture.addEventListener('click', function (evt) {
        window.bigPicture.render(window.photos[0]);
        console.log(evt.target);
      });
    });
  }, 3000); */

  var clickMiniPictureHandler = function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      evt.preventDefault();
      window.photos.forEach(function (photo) {
        if (evt.target.getAttribute('src') === photo.url) {
          window.bigPicture.render(photo);
        }
      });
    } else if (evt.target.classList.contains('picture')) {
      evt.preventDefault();
      window.photos.forEach(function (photo) {
        if (evt.target.firstElementChild.getAttribute('src') === photo.url) {
          window.bigPicture.render(photo);
        }
      });
    }

    var bigPictureCloseButton = window.bigPictureOverlay.querySelector('.cancel');
    bigPictureCloseButton.addEventListener('click', function () {
      bigPictureOverlay.classList.add('hidden');
    });
  };

  document.addEventListener('click', clickMiniPictureHandler);
})();
