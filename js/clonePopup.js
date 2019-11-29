'use strict';
(function () {
  var clonePopup = function (element, place, btn) {
    var elementClone = element.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var button = elementClone.querySelectorAll('.' + btn + '__button');
    [].forEach.call(button, function (item) {
      item.addEventListener('click', function () {
        elementClone.parentNode.removeChild(elementClone);
        document.removeEventListener('keydown', removeElementKeydown);
      });
    });
    var removeElementKeydown = function (evt) {
      if (evt.keyCode === 27) {
        elementClone.parentNode.removeChild(elementClone);
        document.removeEventListener('keydown', removeElementKeydown);
      }
    };
    document.addEventListener('keydown', removeElementKeydown);
    fragment.appendChild(elementClone);
    place.appendChild(fragment);
  };
  window.popupClone = {
    clonePopup: clonePopup
  };
})();
