'use strict';
(function () {
  var error = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var img = document.querySelector('.img-upload__overlay');
  var download = function (xhr, onSuccess) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        window.popupClone.clonePopup(error, main, 'error');
        img.classList.add('hidden');
      }
    });
  };
  var load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/kekstagram/data';
    download(xhr, onSuccess);
    xhr.open('GET', URL);
    xhr.send();
  };
  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/kekstagram';
    download(xhr, onSuccess);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
