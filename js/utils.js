'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;

  window.utils = {
    isEnterPressed: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
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
    }
  };
})();
