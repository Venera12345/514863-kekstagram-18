'use strict';
(function () {
  var newData = [];
  var parseData = function (data) {
    data.forEach(function (item, i) {
      item.dataId = i;
      newData.push(item);
    });
    return newData;
  };
  window.backend.load(parseData);
  window.data = {
    newData: newData
  };
})();
