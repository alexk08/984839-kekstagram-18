'use strict';

(function () {
  var Hashtag = {
    MAX_QTY: 5,
    MAX_LENGTH: 20,
    FIRST_SYMBOL: '#',
    MIN_LENGTH: 2,
    BAR_MAX_QTY: 1,
    FROM: 1
  };
  var hashtagsInput = document.querySelector('.text__hashtags');

  var checkMaxQuantityOfHashtags = function (quantityOfHashtags) {
    if (quantityOfHashtags > Hashtag.MAX_QTY) {
      var result = true;
    }
    return result;
  };

  var checkForFirstSymbol = function (tag) {
    if (tag[0] !== Hashtag.FIRST_SYMBOL) {
      var result = true;
    }
    return result;
  };

  var checkForMinLength = function (tag) {
    if (tag.length < Hashtag.MIN_LENGTH) {
      var result = true;
    }
    return result;
  };

  var checkForMaxLength = function (tag) {
    if (tag.length > Hashtag.MAX_LENGTH) {
      var result = true;
    }
    return result;
  };

  var checkSeparationOfHashtags = function (tag) {
    if (tag.indexOf(Hashtag.FIRST_SYMBOL, Hashtag.FROM) >= Hashtag.BAR_MAX_QTY) {
      var result = true;
    }
    return result;
  };

  var checkDuplicateOfHashtags = function (tag, arrayOfTags, indexOfArray) {
    tag = tag.toLowerCase();
    for (var i = indexOfArray + 1; i < arrayOfTags.length; i++) {
      if (tag === arrayOfTags[i].toLowerCase()) {
        var result = true;
      }
    }
    return result;
  };

  /**
   * Функция обработчик валидации хэштегов
   * @param {Object} evt - объект события
   */
  var hashtagsValidationHandler = function (evt) {
    evt.preventDefault();

    var hashtags = hashtagsInput.value.split(' ');
    var message = '';
    var count = 0;

    hashtags.forEach(function (hashtag, index) {
      if (hashtag === '') {
        return;
      }
      count++;

      if (checkMaxQuantityOfHashtags(count)) {
        message = 'Количество хэш-тегов должно быть не больше 5';
        return;
      }

      if (checkForFirstSymbol(hashtag)) {
        message = 'Хэш-тег должен начинаться с символа #';
        return;
      }

      if (checkForMinLength(hashtag)) {
        message = 'Хэш-тег не может состоять из одной решетки';
        return;
      }

      if (checkForMaxLength(hashtag)) {
        message = 'Максимальная длина одного хэш-тега не должна превышать 20 символов';
        return;
      }

      if (checkSeparationOfHashtags(hashtag)) {
        message = 'Хэш-теги должны разделяться пробелами';
        return;
      }

      if (checkDuplicateOfHashtags(hashtag, hashtags, index)) {
        message = 'Хэш-теги не должны повторяться';
        return;
      }
    });
    hashtagsInput.setCustomValidity(message);
  };

  hashtagsInput.addEventListener('change', hashtagsValidationHandler);
})();
