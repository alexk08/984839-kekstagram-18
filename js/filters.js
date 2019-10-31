'use strict';

(function () {
  var getArrayOfRandomElements = function (inputArray) {
    var randomArray = [];
    var secondaryArray = inputArray.slice();
    for (var i = secondaryArray.length - 1; i >= 0; i--) {
      var randomIndexOfArray = Math.floor(Math.random() * secondaryArray.length);
      randomArray.push(secondaryArray[randomIndexOfArray]);
      secondaryArray.splice(randomIndexOfArray, 1);
    }
    return randomArray;
  };

  var discussedPhoto = document.querySelector('#filter-discussed');
  var popularPhoto = document.querySelector('#filter-popular');
  var randomPhoto = document.querySelector('#filter-random');

  var removeElements = function (nodeList) {
    nodeList.forEach(function(element) {
      element.remove();
    });
  };

  popularPhoto.addEventListener('click', function () {
    var pictureElements = document.querySelector('.pictures').querySelectorAll('.picture');
    console.log(pictureElements)
    removeElements(pictureElements);
    window.fillPictureList(window.arrayOfPhotos);
  });

  randomPhoto.addEventListener('click', function () {
    var pictureElements = document.querySelector('.pictures').querySelectorAll('.picture');
    removeElements(pictureElements);
    pictureElements.forEach(function(element) {
        element.remove();
    });
    var randomPhotos = getArrayOfRandomElements(window.arrayOfPhotos).slice(0,10);
    window.fillPictureList(randomPhotos);
  });

  discussedPhoto.addEventListener('click', function () {
    var pictureElements = document.querySelector('.pictures').querySelectorAll('.picture');
    removeElements(pictureElements);
    var sortPhotos = window.arrayOfPhotos.slice().sort(function(a, b) {
      return (b.comments.length - a.comments.length);
    });
    window.fillPictureList(sortPhotos);

    console.log(sortPhotos);
    console.log(window.arrayOfPhotos);
  });

  // console.log(randomPhotos);
  // console.log(randomPhotos[1].url.slice(7, -4));
  // console.log(randomPhotos.slice().sort(function(a,b) {
    // return (a.url.slice(7, -4) - b.url.slice(7, -4));
    // }));
    // console.log(window.arrayOfPhotos);
})();
