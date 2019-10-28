'use strict';

(function () {
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var scaleControl = document.querySelector('.scale__control--value');

  var Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };

  /**
   * Функция расчета изменения масштаба фото
   * @param {boolean} flag - параметр определяющий какая кнопка нажата. Если +, то true. Eсли -, то false.
   */
  var decreaseOrIncreaseScale = function (flag) {
    var scaleValue = Number(scaleControl.value.slice(0, -1));
    if (!flag && scaleValue > Scale.MIN) {
      scaleValue -= Scale.STEP;
    }
    if (flag && scaleValue < Scale.MAX) {
      scaleValue += Scale.STEP;
    }
    scaleControl.value = scaleValue + '%';
    window.form.image.style.transform = 'scale(' + scaleValue * 0.01 + ')';
  };

  scaleBigger.addEventListener('click', function (evt) {
    evt.preventDefault();
    var up = true;
    decreaseOrIncreaseScale(up);
  });

  scaleSmaller.addEventListener('click', function (evt) {
    evt.preventDefault();
    var down = false;
    decreaseOrIncreaseScale(down);
  });

  var effects = document.querySelector('.effects');

  /**
   * Функция обработчик события клика по input [type=radio] с делегированием на элемент fieldset. Происходит выбор эффекта для фотографии и сброс уровня нассыщенности до значения по умолчанию.
   * Фунция обработчик события. Определяет эффект, накладываемый на изображение.
   */

  var effectClickHandler = function (evt) {
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

  effects.addEventListener('click', effectClickHandler);

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

  /**
   * функция обработчик события отпускание клавиши мышки: рассчет уровня насыщенности по положению ползунка
   */

  levelPin.addEventListener('mousedown', function (evt) {
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

      var coef = levelPin.style.left.slice(0, -1);
      var effectName = window.form.image.className.slice(18);

      effectLevel.setAttribute('value', coef);
      window.form.image.style.filter = filters[effectName].filterName + '(' + (coef / 100 * (filters[effectName].maxValue - filters[effectName].minValue) + filters[effectName].minValue) + filters[effectName].measurementUnit + ')';

      document.removeEventListener('mousemove', pinMouseMoveHandler);
      document.removeEventListener('mouseup', pinMouseUpHandler);
    };

    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', pinMouseUpHandler);
  });
})();
