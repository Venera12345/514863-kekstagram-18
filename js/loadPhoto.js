'use strict';
(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];
  var PHOTO_FILTERS = {
    'grayscale': 0.01,
    'sepia': 0.01,
    'invert': 0.01,
    'blur': 0.03,
    'brightness': 0.02
  };
  var WIDTH_LEVEL = 453;
  var effectValue = document.querySelector('.effect-level__value');
  var inputMainPhoto = document.querySelector('#upload-file');
  var imgPhotoPreview = document.querySelector('.img-upload__preview img');
  var backgroundSpanEffects = document.querySelectorAll('.effects__preview');
  var btnScaleSmaller = document.querySelector('.scale__control--smaller');
  var btnScaleBigger = document.querySelector('.scale__control--bigger');
  var inputScale = document.querySelector('.scale__control--value');
  var effectNone = document.querySelector('#effect-none');
  var effectLevelContainer = document.querySelector('.img-upload__effect-level');
  var effectsRadio = document.querySelectorAll('.effects__radio');
  var pinEffect = document.querySelector('.effect-level__pin');
  var depthEffect = document.querySelector('.effect-level__depth');
  var formEditPorm = document.querySelector('.img-upload__overlay');
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputComment = document.querySelector('.text__description');
  var main = document.querySelector('main');
  var success = document.querySelector('#success').content.querySelector('.success');
  var form = document.querySelector('#upload-select-imge');
  var inValid = true;
  var addClassErorr = function (input) {
    input.classList.add('error-input');
    return inValid = false;
  };
  var removeClassErorr = function (input) {
    input.setCustomValidity('');
    input.classList.remove('error-input');
    return inValid = true;
  };
  var loadPhoto = function () {
    var file = inputMainPhoto.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgPhotoPreview.src = reader.result;
        [].forEach.call(backgroundSpanEffects, function (item) {
          item.style.backgroundImage = 'url("' + reader.result + '")';
        });
      });
      reader.readAsDataURL(file);
    }
  };
  var scalePhoto = function () {
    var value = +(inputScale.value.slice(0, -1));
    imgPhotoPreview.style.transform = ('scale(0.' + value + ')');
    btnScaleBigger.addEventListener('click', function () {
      if (value <= 90) {
        value = value + 10;
        inputScale.value = value + '%';
        imgPhotoPreview.style.transform = ('scale(' + value / 100 + ')');
      }
    });
    btnScaleSmaller.addEventListener('click', function () {
      if (value >= 10) {
        value = value - 10;
        inputScale.value = value + '%';
        imgPhotoPreview.style.transform = ('scale(' + value / 100 + ')');
      }
    });
  };
  var sliderEffect = function (level) {
    pinEffect.style.left = level + 'px';
    depthEffect.style.width = level + 'px';
    var levelProsent = Math.round(100 * level / WIDTH_LEVEL);
    effectValue.value = levelProsent;
  };

  var improseEffect = function () {
    var filter = getComputedStyle(imgPhotoPreview).filter;
    var filterParts = filter.split('(');
    filterParts[0];
    if ('brightness' === filterParts[0]) {
      var valueFilter = effectValue.value * PHOTO_FILTERS[filterParts[0]] + 1;
    } else {
      var valueFilter = effectValue.value * PHOTO_FILTERS[filterParts[0]];
    }
    if ('blur' === filterParts[0]) {
      imgPhotoPreview.style.filter = filterParts[0] + '(' + valueFilter + 'px)';
    } else {
      imgPhotoPreview.style.filter = filterParts[0] + '(' + valueFilter + ')';
    }
  };

  var madeEffectPhoto = function (input) {
    input.addEventListener('click', function () {
      [].map.call(effectsRadio, function (item) {
        item.setAttribute('checked', false);
        imgPhotoPreview.classList.remove('effects__preview--' + item.value);
      });
      input.setAttribute('checked', 'checked');
      imgPhotoPreview.classList.add('effects__preview--' + input.value);

      if (input.value === 'none') {
        effectLevelContainer.classList.add('hidden');

      } else {
        effectLevelContainer.classList.remove('hidden');
        imgPhotoPreview.style.filter = '';
        sliderEffect(0);
        improseEffect();
      }
    });
  };

  var valididityHeshtag = function (input) {
    if (input.value === '#') {
      input.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      addClassErorr(input);
    } else {
      removeClassErorr(input);
      var hashtags = input.value.split('#');
      var spaceHashtags = input.value.split(' ');
      if (spaceHashtags.length < hashtags.length - 1) {
        input.setCustomValidity('хэш-теги разделяются пробелами');
        addClassErorr(input);
      } else {
        removeClassErorr(input);
        if (hashtags.length > 5) {
          input.setCustomValidity('нельзя указать больше пяти хэш-тегов');
          addClassErorr(input);
        } else {
          removeClassErorr(input);
          hashtags.forEach(function (item) {
            if (item.length > 20) {
              input.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
              addClassErorr(input);
            } else {
              removeClassErorr(input);
            }
          });
        }

      }

    }
    return inValid;
  };
  var valididityComment = function (input) {
    if (input.value.length <= 140) {
      removeClassErorr(input);
    } else {
      input.setCustomValidity('длина комментария не может составлять больше 140 символов');
      addClassErorr(input);
    }
    return inValid;
  };
  [].map.call(effectsRadio, function (item) {
    madeEffectPhoto(item);
  });
  pinEffect.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;
    var startSlid = {
      x: evt.clientX
    };
    var onPinMove = function (evtMove) {
      evtMove.preventDefault();
      dragged = true;
      var shift = {
        x: startSlid.x - evtMove.clientX
      };
      startSlid = {
        x: evtMove.clientX
      };
      var pinX = pinEffect.offsetLeft - shift.x;
      if (pinX > 0 && pinX < WIDTH_LEVEL) {
        sliderEffect(pinX);
        improseEffect();
      }
    };
    var onPinUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onPinUp);
      improseEffect();
      if (dragged) {
        var onPinClick = function (evtClick) {
          evtClick.preventDefault();
          pinEffect.removeEventListener('click', onPinClick);
        };
        pinEffect.addEventListener('click', onPinClick);
      }

    };
    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onPinUp);
  });
  inputHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.main.onBtnCloseImgKeydown);
  });
  inputHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', window.main.onBtnCloseImgKeydown);
  });
  inputHashtags.addEventListener('input', function () {
    valididityHeshtag(inputHashtags);
  });
  inputComment.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.main.onBtnCloseImgKeydown);
    valididityComment(inputComment);
  });
  inputComment.addEventListener('blur', function () {
    document.addEventListener('keydown', window.main.onBtnCloseImgKeydown);
    valididityComment(inputComment);
  });
  if (effectNone.checked) {
    effectLevelContainer.classList.add('hidden');
  }
  inputMainPhoto.addEventListener('change', function () {
    loadPhoto();
    formEditPorm.classList.remove('hidden');
    document.addEventListener('keydown', window.main.onBtnCloseImgKeydown);
  });
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (inValid) {
      window.backend.upload(new FormData(form), function () {
        window.popupClone.clonePopup(success, main, 'success');
        window.main.onBtnCloseImgClick();
        form.reset();
      });
    }


  });
  scalePhoto();
})();
