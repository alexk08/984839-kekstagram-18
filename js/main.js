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

// Далее пишем обработчик на закрытие формы (вышеуказанному блоку добавляем класс hidden по клику на крестик мышкой либо клавишей Enter при фокусе на крестике, либо по нажатию на клавишу Esc), при это сбрасываем значение поля выбора файла (блок с id #upload-file)

/**
 * Открытие закрытие формы настройки фото
 */
var fileUploadControl = document.querySelector('#upload-file');
var editImageControl = document.querySelector('.img-upload__overlay');
var closeButton = editImageControl.querySelector('.img-upload__cancel');

var ESC_KEYCODE = 27;
var focusOnHashtagsInput = false;

var escPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && focusOnHashtagsInput !== true) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  editImageControl.classList.remove('hidden');
  document.addEventListener('keydown', escPressHandler);
  effectLevelField.classList.add('hidden');
};

var closePopup = function () {
  editImageControl.classList.add('hidden');
  document.removeEventListener('keydown', escPressHandler);
  fileUploadControl.value = '';
};

fileUploadControl.addEventListener('change', function () {
  // evt.preventDefault();
  openPopup();
});

closeButton.addEventListener('click', function () {
  // evt.preventDefault();
  closePopup();
});

// При наступлении события "click" на кнопке c классом .scale__control--smaller должно изменяться значение поля input с классом .scale__control--value на длину шага, если текущее его значение больше минимального.

// При наступлении события "click" на кнопке c классом .scale__control--bigger должно изменяться значение поля input с классом .scale__control--value на длину шага, если текущее его значение меньше максимального значения

// Минимальное, максимальное значения, длину шага и значение .scale__control--value по умолчанию задаем через постоянные переменные.

var scaleSmaller = document.querySelector('.scale__control--smaller');
var scaleBigger = document.querySelector('.scale__control--bigger');
var scaleControl = document.querySelector('.scale__control--value');
var scaleValue = Number(scaleControl.value.slice(0, -1));
var image = document.querySelector('.img-upload__preview').firstElementChild;
var effectLevelField = document.querySelector('.effect-level');

var Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

/**
 * Функция расчета увеличения масштаба фото
 */
var decreaseScale = function () {
  if (scaleValue > Scale.MIN) {
    scaleValue -= Scale.STEP;
    scaleControl.value = scaleValue + '%';
    image.style.transform = 'scale(' + scaleValue * 0.01 + ')';
  }
};

/**
 * Функция расчета уменьшения масштаба фото
 */
var increaseScale = function () {
  if (scaleValue < Scale.MAX) {
    scaleValue += Scale.STEP;
    scaleControl.value = scaleValue + '%';
    image.style.transform = 'scale(' + scaleValue * 0.01 + ')';
  }
};

scaleSmaller.addEventListener('click', function () {
  // evt.preventDefault();
  decreaseScale();
});

scaleBigger.addEventListener('click', function () {
  // evt.preventDefault();
  increaseScale();
});

// scaleControl.addEventListener('change', function () {
//   console.log(1);
// });

// var scaleValue = Number(scaleControl.getAttribute("value").slice(0, -1));
// scaleControl.setAttribute("value", (String(scaleValue) + "%"));
// scaleControl.setAttribute("value", (String(scaleValue) + "%"));

// При возникновении события change на scaleControl блок с изображением внутри блока с классом .img-upload__preview стилизуется свойством transform: scale(X). Где X значение scaleValue умноженное на 0,01.

// При закрытии формы настройки фотографии, значение свойства transform у фото не сбрасывается. И при загрузке новой фотографии, масштаб остается не по-умолчанию. Нужно подумать как устанавливать значение по-умолчанию при закрытии окна.

// Не получается обрабать событие изменения значения (событие change не отлавливается) input'а scaleControl. И в разметке изменение value не отображается.

var effects = document.querySelector('.effects');

/**
 * Функция обработчик события клика по input [type=radio] с делегированием на элемент fieldset. Происходит выбор эффекта для фотографии и сброс уровня нассыщенности до значения по умолчанию.
 * Фунция обработчик события. Определяет эффект, накладываемый на изображение.
 */

var effectClickHandler = function (evt) {
  if (evt.target.matches('.effects__radio')) {
    var effectName = evt.target.value;
    effectLevelField.classList.remove('hidden');
    effectLevel.setAttribute('value', 100);
    image.style.filter = null;
    if (image.classList.length === 0) {
      image.classList.add('effects__preview--' + effectName);
    } else {
      image.className = '';
      image.classList.add('effects__preview--' + effectName);
    }
    if (image.className === 'effects__preview--none') {
      image.removeAttribute('style');
      effectLevelField.classList.add('hidden');
    }
  }
};

effects.addEventListener('click', effectClickHandler);

// хорошая ли это практика заводить переменную внитри условия? или можно просто в дальнейшем оперировать значением атрибута evt.target.value, без записи в переменную
// evt.preventDefault(); //где лучше писать отмену действия по умолчанию? при вызове метода addEventListner или в описании функции. короч вообще лучше почитать про отмену действия по умолчанию. здесь не работает потому что отменяется распространение? stoppropagation?

/**
 * Обработчик события reset: удаление класса с фото и удаление стилей фильтра.
 */
var uploadImageForm = document.querySelector('.img-upload__form');

uploadImageForm.addEventListener('reset', function () {
  image.removeAttribute('style');
  image.removeAttribute('class');
});

// Для эффекта «Хром» — filter: grayscale(0..1);
// Для эффекта «Сепия» — filter: sepia(0..1);
// Для эффекта «Марвин» — filter: invert(0..100%);
// Для эффекта «Фобос» — filter: blur(0..3px);
// Для эффекта «Зной» — filter: brightness(1..3);
// Для эффекта «Оригинал» CSS-стили filter удаляются.


var levelPin = document.querySelector('.effect-level__pin');
var levelLine = document.querySelector('.effect-level__line');
var effectLevel = document.querySelector('.effect-level__value');

var filters = [
  {
    effectName: 'chrome',
    filterName: 'grayscale',
    minValue: 0,
    maxValue: 1,
    measurementUnit: ''
  },
  {
    effectName: 'sepia',
    filterName: 'sepia',
    minValue: 0,
    maxValue: 1,
    measurementUnit: ''
  },
  {
    effectName: 'marvin',
    filterName: 'invert',
    minValue: 0,
    maxValue: 100,
    measurementUnit: '%'
  },
  {
    effectName: 'phobos',
    filterName: 'blur',
    minValue: 0,
    maxValue: 3,
    measurementUnit: 'px'
  },
  {
    effectName: 'heat',
    filterName: 'brightness',
    minValue: 1,
    maxValue: 3,
    measurementUnit: ''
  }
  // {
  //   effectName: "none",
  //   filterName: "",
  //   minValue: 0,
  //   maxValue: 0,
  //   measurementUnit: ""
  // }
];

/**
 * функция обработчик события отпускание клавиши мышки: рассчет уровня насыщенности по положению ползунка
 */

var pinMouseUpHandler = function (evt) {
  var coefficient = (evt.clientX - levelLine.getBoundingClientRect().left) / levelLine.getBoundingClientRect().width;
  effectLevel.setAttribute('value', coefficient * 100);
  for (var i = 0; i < filters.length; i++) {
    if (image.className === ('effects__preview--' + filters[i].effectName)) {
      image.style.filter = filters[i].filterName + '(' + (coefficient * (filters[i].maxValue - filters[i].minValue) + filters[i].minValue) + filters[i].measurementUnit + ')';
    }
  }
};

levelPin.addEventListener('mouseup', pinMouseUpHandler);

// Хэш-теги:
// ? хэш-теги необязательны;
// + хэш-тег начинается с символа # (решётка);
// + хеш-тег не может состоять только из одной решётки;
// + хэш-теги разделяются пробелами;
// + один и тот же хэш-тег не может быть использован дважды;
// + нельзя указать больше пяти хэш-тегов;
// + максимальная длина одного хэш-тега 20 символов, включая решётку;
// + теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// + если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

var Hashtags = {
  MAXQTY: 5,
  MAXLENGTH: 20
}
var hashtagsInput = document.querySelector('.text__hashtags');

/**
 * Функция обработчик валидации хэштегов
 */
var hashtagsValidationHandler = function(evt) {
  evt.preventDefault();

  var hashtags = hashtagsInput.value.split(' ');
  var message = '';
  var quantityOfHashtags = 0;

  hashtags.forEach(function (hashtag, index) {
    if (hashtag === '') {
      return;
    }
    hashtag = hashtag.toLowerCase();
    quantityOfHashtags++;
    if (quantityOfHashtags > Hashtags.MAXQTY) {
      message = 'Количество хэш-тегов должно быть не больше 5';
    }
    if (hashtag[0] !== '#') {
      message = 'Хэш-тег должен начинаться с символа #';
    }
    if (hashtag.length === 1 && hashtag[0] === '#') {
      message = 'Хэш-тег не может состоять из одной решетки';
    }
    if (hashtag.length > Hashtags.MAXLENGTH) {
      message ='Максимальная длина одного хэш-тега не должна превышать 20 символов';
    }
    if (hashtag.indexOf('#', 1) >= 1) {
      message = 'Хэш-теги должны разделяться пробелами';
    }
    for (var i = index + 1; i < hashtags.length; i ++) {
      if (hashtag === hashtags[i]) {
        message = 'Хэш-теги не должны повторяться';
      }
    }
    console.log(hashtag);
  });
  hashtagsInput.setCustomValidity(message);
}

hashtagsInput.addEventListener('change', hashtagsValidationHandler);
hashtagsInput.addEventListener('focus', function () {
  focusOnHashtagsInput = true;
});
hashtagsInput.addEventListener('blur', function () {
  focusOnHashtagsInput = false;
});
