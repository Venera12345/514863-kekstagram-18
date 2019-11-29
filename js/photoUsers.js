'use strict';
(function () {
  var elementTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var createPicture = function (data) {
    var element = elementTemplate.cloneNode(true);
    var img = element.querySelector('.picture__img');
    var comments = element.querySelector('.picture__comments');
    var likes = element.querySelector('.picture__likes');
    img.src = data.url;
    comments.textContent = data.comments.length;
    likes.textContent = data.likes;
    element.setAttribute('data-id', data.dataId);
    return element;
  };
  window.photoUsers = {
    createPicture: createPicture
  };
})();
