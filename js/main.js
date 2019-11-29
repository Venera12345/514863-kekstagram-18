'use strict';
(function () {
  var btnCloseImg = document.querySelector('.img-upload__cancel');
  var bodyElement = document.querySelector('body');
  var formEditPorm = document.querySelector('.img-upload__overlay');
  var filterImage = document.querySelector('.img-filters');
  var conteinerForPictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var form = document.querySelector('#upload-select-imge');
  var fragment = document.createDocumentFragment();
  var onBtnCloseImgClick = function () {
    form.reset();
    var data = window.data.newData;
    formEditPorm.classList.add('hidden');
    filterImage.classList.remove('img-filters--inactive');
    data.forEach(function (item) {
      fragment.appendChild(window.photoUsers.createPicture(item));
    });
    conteinerForPictures.appendChild(fragment);
    var iconPhoto = document.querySelectorAll('.picture');
    [].forEach.call(iconPhoto, function (item) {
      var index = +item.getAttribute('data-id');
      item.addEventListener('click', function () {
        window.fullPhoto.createFullPhoto(data[index]);
        onIconPhotoClick();
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          window.fullPhoto.createFullPhoto(data[index]);
          onIconPhotoClick();
        }
      });
    });
    document.removeEventListener('keydown', onBtnCloseImgKeydown);
  };
  var onIconPhotoClick = function () {
    bigPicture.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureCloseKeydown);
  };
  var onBtnCloseImgKeydown = function (evt) {
    if (evt.keyCode === 27) {
      onBtnCloseImgClick();
    }
  };
  var onBigPictureCloseClick = function () {
    bigPicture.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    window.fullPhoto.btnLouderComment.classList.remove('hidden');
    document.removeEventListener('keydown', onBigPictureCloseKeydown);
  };
  var onBigPictureCloseKeydown = function (evt) {
    if (evt.keyCode === 27) {
      onBigPictureCloseClick();
    }
  };
  btnCloseImg.addEventListener('click', function () {
    onBtnCloseImgClick();
  });
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  window.main = {
    onBtnCloseImgKeydown: onBtnCloseImgKeydown,
    onBtnCloseImgClick: onBtnCloseImgClick
  };
})();
