'use strict';

(function () {
  var Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };

  var scaleInput = document.querySelector('.scale__control--value');
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');


  var scaleButtonClickHandler = function (evt) {
    var typeOfButton = evt.target.classList[1].split('--')[1];
    var scaleValue = parseInt(scaleInput.value, 10);
    if (typeOfButton === 'smaller' && scaleValue > Scale.MIN) {
      scaleValue -= Scale.STEP;
    } else if (typeOfButton === 'bigger' && scaleValue < Scale.MAX) {
      scaleValue += Scale.STEP;
    }
    scaleInput.value = scaleValue + '%';
    window.form.image.style.transform = 'scale(' + scaleValue * 0.01 + ')';
  };

  scaleSmaller.addEventListener('click', scaleButtonClickHandler);
  scaleBigger.addEventListener('click', scaleButtonClickHandler);

  var effects = document.querySelector('.effects');

  var effectsClickHandler = function (evt) {
    if (evt.target.matches('.effects__radio')) {
      var effectName = evt.target.value;
      window.form.effectLevelField.classList.remove('hidden');
      effectLevel.setAttribute('value', 100);
      window.form.image.style.filter = null;
      levelPin.style.left = '100%';
      levelDepth.style.width = '100%';
      if (window.form.image.classList.length === 0) {
        window.form.image.classList.add('effects__preview--' + effectName);
      } else {
        window.form.image.className = '';
        window.form.image.classList.add('effects__preview--' + effectName);
      }
      if (window.form.image.className === 'effects__preview--none') {
        window.form.image.removeAttribute('style');
        window.form.effectLevelField.classList.add('hidden');
      }
    }
  };

  effects.addEventListener('click', effectsClickHandler);

  var levelPin = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var effectLevel = document.querySelector('.effect-level__value');
  var levelDepth = document.querySelector('.effect-level__depth');

  var filters = {
    chrome: {
      filterName: 'grayscale',
      minValue: 0,
      maxValue: 1,
      measurementUnit: ''
    },
    sepia: {
      filterName: 'sepia',
      minValue: 0,
      maxValue: 1,
      measurementUnit: ''
    },
    marvin: {
      filterName: 'invert',
      minValue: 0,
      maxValue: 100,
      measurementUnit: '%'
    },
    phobos: {
      filterName: 'blur',
      minValue: 0,
      maxValue: 3,
      measurementUnit: 'px'
    },
    heat: {
      filterName: 'brightness',
      minValue: 1,
      maxValue: 3,
      measurementUnit: ''
    }
  };

  var pinMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    var pinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;
      levelPin.style.left = (levelPin.offsetLeft - shiftX) / levelLine.getBoundingClientRect().width * 100 + '%';
      levelDepth.style.width = levelPin.style.left;
      if (levelPin.style.left.slice(0, -1) > 100) {
        levelPin.style.left = '100%';
      }
      if (levelPin.style.left.slice(0, -1) < 0) {
        levelPin.style.left = '0%';
      }
    };

    var pinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      var effectValue = levelPin.style.left.slice(0, -1);
      var effectName = window.form.image.className.slice(18);

      effectLevel.setAttribute('value', effectValue);
      window.form.image.style.filter = filters[effectName].filterName + '(' + (effectValue / 100 * (filters[effectName].maxValue - filters[effectName].minValue) + filters[effectName].minValue) + filters[effectName].measurementUnit + ')';

      document.removeEventListener('mousemove', pinMouseMoveHandler);
      document.removeEventListener('mouseup', pinMouseUpHandler);
    };

    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', pinMouseUpHandler);
  };

  levelPin.addEventListener('mousedown', pinMouseDownHandler);
})();
