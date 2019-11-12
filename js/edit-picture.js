'use strict';

(function () {
  var CLASS_INDEX = 1;
  var MODIFIER_INDEX = 1;
  var DECIMAL = 10;
  var TRANSFORM_COEFFICIENT = 0.01;
  var PERСENT = 100;
  var DEFAULT_EFFECT_VALUE = 100;
  var TO_MODIFIER = 18;
  var Index = {
    BEGIN: 0,
    END: -1
  };
  var Level = {
    MIN: 0,
    MAX: 100
  };
  var Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };

  var scaleInput = document.querySelector('.scale__control--value');
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');


  var scaleButtonClickHandler = function (evt) {
    var typeOfButton = evt.target.classList[CLASS_INDEX].split('--')[MODIFIER_INDEX];
    var scaleValue = parseInt(scaleInput.value, DECIMAL);
    if (typeOfButton === 'smaller' && scaleValue > Scale.MIN) {
      scaleValue -= Scale.STEP;
    } else if (typeOfButton === 'bigger' && scaleValue < Scale.MAX) {
      scaleValue += Scale.STEP;
    }
    scaleInput.value = scaleValue + '%';
    window.form.image.style.transform = 'scale(' + scaleValue * TRANSFORM_COEFFICIENT + ')';
  };

  scaleSmaller.addEventListener('click', scaleButtonClickHandler);
  scaleBigger.addEventListener('click', scaleButtonClickHandler);

  var effects = document.querySelector('.effects');
  var effectLevel = document.querySelector('.effect-level__value');
  var levelPin = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var levelDepth = document.querySelector('.effect-level__depth');

  var setDefault = function () {
    effectLevel.setAttribute('value', DEFAULT_EFFECT_VALUE);
    window.form.image.style.filter = null;
    levelPin.style.left = DEFAULT_EFFECT_VALUE + '%';
    levelDepth.style.width = DEFAULT_EFFECT_VALUE + '%';
    window.form.image.className = '';
  };

  var effectsClickHandler = function (evt) {
    if (evt.target.matches('.effects__radio')) {
      setDefault();
      var effectName = evt.target.value;
      window.form.effectLevelField.classList.remove('hidden');
      window.form.image.className = 'effects__preview--' + effectName;
      if (window.form.image.className === 'effects__preview--none') {
        window.form.effectLevelField.classList.add('hidden');
        window.form.image.style.filter = null;
      }
    }
  };

  effects.addEventListener('click', effectsClickHandler);

  var effect = {
    chrome: {
      filterName: 'grayscale',
      min: 0,
      max: 1,
      unit: ''
    },
    sepia: {
      filterName: 'sepia',
      min: 0,
      max: 1,
      unit: ''
    },
    marvin: {
      filterName: 'invert',
      min: 0,
      max: 100,
      unit: '%'
    },
    phobos: {
      filterName: 'blur',
      min: 0,
      max: 3,
      unit: 'px'
    },
    heat: {
      filterName: 'brightness',
      min: 1,
      max: 3,
      unit: ''
    }
  };

  var pinMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var pinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      levelPin.style.left = Math.round((levelPin.offsetLeft - shift) / levelLine.offsetWidth * PERСENT) + '%';
      levelDepth.style.width = levelPin.style.left;
      if (levelPin.style.left.slice(Index.BEGIN, Index.END) > Level.MAX) {
        levelPin.style.left = Level.MAX + '%';
      }
      if (levelPin.style.left.slice(Index.BEGIN, Index.END) < Level.MIN) {
        levelPin.style.left = Level.MIN + '%';
      }

      var effectValue = levelPin.style.left.slice(Index.BEGIN, Index.END);
      var effectModifier = window.form.image.className.slice(TO_MODIFIER);

      effectLevel.setAttribute('value', effectValue);
      window.form.image.style.filter = effect[effectModifier].filterName + '(' + (effectValue / PERСENT * (effect[effectModifier].max - effect[effectModifier].min) + effect[effectModifier].min) + effect[effectModifier].unit + ')';
    };

    var pinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', pinMouseMoveHandler);
      document.removeEventListener('mouseup', pinMouseUpHandler);
    };

    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', pinMouseUpHandler);
  };

  levelPin.addEventListener('mousedown', pinMouseDownHandler);
})();
