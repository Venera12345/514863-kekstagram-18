'use strict';
(function () {
  var buttons = document.querySelectorAll('.img-filters__button');
  var btnPopular = document.querySelector('#filter-popular');
  var btnRandom = document.querySelector('#filter-random');
  var btnDiscussed = document.querySelector('#filter-discussed');
  var conteinerForPictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var createRandomPhoto = function (min, max) {
    var numReserve = [];
    while (numReserve.length < 10) {
      var randomNumber = Math.floor(Math.random() * (max - min)) + min;
      var found = false;
      for (var i = 0; i < numReserve.length; i++) {
        if (numReserve[i] === randomNumber) {
          found = true;
          break;
        }
      }
      if (!found) {
        numReserve[numReserve.length] = randomNumber;
      }
    }
    return numReserve;
  };

  var filter = function (btn) {
    [].forEach.call(buttons, function (item) {
      item.classList.remove('img-filters__button--active');
    });
    var pictures = document.querySelectorAll('.picture');
    [].forEach.call(pictures, function (item) {
      item.parentNode.removeChild(item);
    });
    btn.classList.add('img-filters__button--active');
    var data = window.data.newData;
    var newData = data.slice();
    if (btn === btnRandom) {
      newData = [];

      var rundoms = createRandomPhoto(0, 25);
      data.forEach(function (item) {
        rundoms.forEach(function (element) {
          if (element === item.dataId) {
            newData.push(item);
          }
        });
      });
    } else if (btn === btnDiscussed) {
      newData.sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 0;
      });
    }

    newData.forEach(function (item) {
      fragment.appendChild(window.photoUsers.createPicture(item));
    });
    conteinerForPictures.appendChild(fragment);
  };
  btnPopular.addEventListener('click', function () {
    filter(btnPopular);
  });
  btnDiscussed.addEventListener('click', function () {
    filter(btnDiscussed);
  });
  btnRandom.addEventListener('click', function () {
    filter(btnRandom);
  });
})();
