'use strict';
(function () {
  var img = document.querySelector('.big-picture__img img');
  var descriptionImg = document.querySelector('.social__caption');
  var valueLikes = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var containerSocialComment = document.querySelector('.social__comments');
  var socialComment = document.querySelector('.social__comment');
  var btnLouderComment = document.querySelector('.social__comments-loader');
  var commentsCountOpen = document.querySelector('.social__comment-count span');
  var fragment = document.createDocumentFragment();
  var addComment = function (count) {
    for (var i = 0; i < count; i++) {
      var element = socialComment.cloneNode(true);
      fragment.appendChild(element);
      containerSocialComment.appendChild(fragment);
    }
  };
  var createComment = function (data) {
    var newSocialComments = document.querySelectorAll('.social__comment');
    [].forEach.call(newSocialComments, function (item, i) {
      var pictureItem = item.querySelector('.social__picture');
      var textItem = item.querySelector('.social__text');
      textItem.textContent = data.comments[i].message;
      pictureItem.src = data.comments[i].avatar;
    });
  };
  var addCommentAmount = function (data, amountComments) {
    var socialComments = document.querySelectorAll('.social__comment');
    [].forEach.call(socialComments, function (item) {
      item.parentNode.removeChild(item);
    });
    if (data.comments.length > amountComments) {
      addComment(amountComments);
      createComment(data);
      commentsCountOpen.textContent = amountComments;
      amountComments = amountComments + 5;
    } else if (data.comments.length <= amountComments) {
      addComment(data.comments.length);
      createComment(data);
      btnLouderComment.classList.add('hidden');
      commentsCountOpen.textContent = data.comments.length;
      amountComments = 5;
    }
    return amountComments;
  };
  var createFullPhoto = function (data) {
    img.src = data.url;
    descriptionImg.textContent = data.description;
    valueLikes.textContent = data.likes;
    commentsCount.textContent = data.comments.length;
    var amountComments = 5;
    amountComments = addCommentAmount(data, amountComments);
    btnLouderComment.addEventListener('click', function () {
      amountComments = addCommentAmount(data, amountComments);
    });
  };
  window.fullPhoto = {
    createFullPhoto: createFullPhoto,
    btnLouderComment: btnLouderComment
  };
})();
