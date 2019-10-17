'use strict';

var PHOTO_QTY = 25;
var User = {
  AVATAR: ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'],
  MESSAGE: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  NAME: ['Кирилл', 'Мефодий', 'Илья', 'Добрыня', 'Алёша', 'Улукбек']
};
var Likes = {
  MIN: 15,
  MAX: 200
};
var Comments = {
  MIN: 0,
  MAX: 10
};

/**
 * Возвращает случайное целое число в диапазоне от min (включительно) до max (включительно)
 * @param {number} min - целое число
 * @param {number} max - целое число больше min
 * @return случайное целое число
 */

var getRandomIntInclusive = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Возвращает случайный элемент массива
 * @param {Array} array - входной массив
 * @return случайный элемент массива
 */

var getRandomElementOfArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Создает массив с объектами, которые описывают комментарии
 * @param {number} quantityOfComments  - количество комментариев
 * @return {Array} массив с комментариями
 */

var getArrayOfComments = function (quantityOfComments) {
  var arrayOfComments = [];
  for (var i = 0; i < quantityOfComments; i++) {
    arrayOfComments.push({
      avatar: getRandomElementOfArray(User.AVATAR),
      message: getRandomElementOfArray(User.MESSAGE),
      name: getRandomElementOfArray(User.NAME)
    });
  }
  return (arrayOfComments);
};

/**
 * Создает массив с объектами, которые описывают фотографии
 * @param {number} quantityOfPhotos - количество фото
 * @return {Array} массив с фото
 */

var getPhotos = function (quantityOfPhotos) {
  var arrayOfPhotos = [];
  for (var i = 0; i < quantityOfPhotos; i++) {
    arrayOfPhotos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'описание фотографии',
      likes: getRandomIntInclusive(Likes.MIN, Likes.MAX),
      comments: getArrayOfComments(getRandomIntInclusive(Comments.MIN, Comments.MAX))
    });
  }
  return (arrayOfPhotos);
};

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

/**
 * Функция создания DOM-элемента на основе JS-объекта
 * @param {Object} photo -  объект с данными о фото
 * @return {any} DOM-элемент
 */

var renderPicture = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

/**
 * Функция заполнения фрагмента DOM-элементами на основе массива JS-объектов
 * @param {Array} arrayOfObjects - массив JS-объектов с данными
 * @return {DocumentFragment} фрагмент с DOM-элементами
 */

var createFragment = function (arrayOfObjects) {
  var fragment = document.createDocumentFragment();
  arrayOfObjects.forEach(function (photo) {
    fragment.appendChild(renderPicture(photo));
  });
  return fragment;
};

var photos = getPhotos(PHOTO_QTY);
var picturesListElement = document.querySelector('.pictures');
picturesListElement.appendChild(createFragment(photos));

// При наступлении события chahge на элементе с id #upload-file показываем форму редактирования изображения, т.е. у блока с классом img-upload__overlay удаляем класс .hidden

//Далее пишем обработчик на закрытие формы (вышеуказанному блоку добавляем класс hidden по клику на крестик мышкой либо клавишей Enter при фокусе на крестике, либо по нажатию на клавишу Esc), при это сбрасываем значение поля выбора файла (блок с id #upload-file)


var fileUploadControl = document.querySelector('#upload-file');
var editImageControl = document.querySelector('.img-upload__overlay');
var closeButton = editImageControl.querySelector('.img-upload__cancel');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
};

var openPopup = function () {
  editImageControl.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  editImageControl.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

fileUploadControl.addEventListener('change', function () {
  openPopup();
});

closeButton.addEventListener('click', function () {
  closePopup();
});


