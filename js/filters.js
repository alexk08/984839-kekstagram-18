'use strict';

(function () {
  var filters = function () {
    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');
  }

  window.loadData(filters);

  var discussedButton = document.querySelector('#filter-discussed');

  discussedButton.addEventListener('click', function () {
    // console.log(window.loadData(filters));
    // console.log(filters(xhr.response));
    console.log(1);
    console.log(window.arrayOfPhotos);
    // window.arrayOfPhotos.sort(function(a, b) {
    //   return (a.comments.length - b.comments.length);
    // });
    console.log(window.arrayOfPhotos.slice().sort(function(a, b) {
      return (a.comments.length - b.comments.length);
    }));

  });
})();
