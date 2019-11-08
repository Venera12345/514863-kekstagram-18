'use strict';
(function(){
  var URL = 'https://js.dump.academy/kekstagram/data';
  var load = function (onSucsse) {
    var xhr = new XMLHttpRequest();
    xhr.responseType ='json';
    xhr.addEventListener('load', function () {
      if(xhr.status === 200) {
        onSucsse(xhr.response);
      } else {

      }
    });

    xhr.open('GET', URL);
    xhr.send();

  }
});
