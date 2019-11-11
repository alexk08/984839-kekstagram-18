'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };
  var lastTimeout;

  window.utils = {
    isEnterPressed: function (evt) {
      return evt.keyCode === Keycode.ENTER;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === Keycode.ESC;
    },
    shuffleArray: function (inputArray) {
      var randomArray = [];
      var randomIndexOfArray = 0;
      var secondaryArray = inputArray.slice();
      for (var i = secondaryArray.length - 1; i >= 0; i--) {
        randomIndexOfArray = Math.floor(Math.random() * secondaryArray.length);
        randomArray.push(secondaryArray[randomIndexOfArray]);
        secondaryArray.splice(randomIndexOfArray, 1);
      }
      return randomArray;
    },
    debounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    },
    Url: {
      LOAD: 'https://js.dump.academy/kekstagram/data',
      UPLOAD: 'https://js.dump.academy/kekstagram'
    }
  };
})();
