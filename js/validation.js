'use strict';

(function () {
  var Hashtag = {
    MAX_QUANTITY: 5,
    MAX_LENGTH: 20,
    FIRST_SYMBOL: '#',
    MIN_LENGTH: 2,
    BAR_MAX_QUANTITY: 1,
    FROM: 1
  };

  window.hashtagsInput = document.querySelector('.text__hashtags');

  var checkMaxQuantityOfHashtags = function (quantityOfHashtags) {
    return (quantityOfHashtags > Hashtag.MAX_QUANTITY);
  };

  var checkForFirstSymbol = function (tag) {
    return (tag[0] !== Hashtag.FIRST_SYMBOL);
  };

  var checkForMinLength = function (tag) {
    return (tag.length < Hashtag.MIN_LENGTH);
  };

  var checkForMaxLength = function (tag) {
    return (tag.length > Hashtag.MAX_LENGTH);
  };

  var checkSeparationOfHashtags = function (tag) {
    return (tag.indexOf(Hashtag.FIRST_SYMBOL, Hashtag.FROM) >= Hashtag.BAR_MAX_QUANTITY);
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

  var validateHashtags = function () {
    var hashtags = window.hashtagsInput.value.split(' ');
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
    window.hashtagsInput.setCustomValidity(message);
    if (message !== '') {
      window.hashtagsInput.style.boxShadow = '0 0 0 3px red';
    } else {
      window.hashtagsInput.removeAttribute('style');
    }
  };

  window.hashtagsInput.addEventListener('change', function () {
    validateHashtags();
  });
})();
