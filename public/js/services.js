angular.module('plummage')
.service('InvertedIndex', function($http, FileUploader) {
  this.uploader = new FileUploader();
  this.filesObject = {};
  this.uploader.onAfterAddingAll = (addedItems) => {
    angular.forEach(addedItems, (item) => {
      this.filesObject[item.file.name] = item._file;
    });
  }
  this.createIndex = (fileName, cb) => {
    if (this.indexes) {
      if (!Object.prototype.hasOwnProperty.call(this.indexes, fileName)) {
        return cb(this.indexes);
      }
    }
    const reader = new FileReader();
    reader.readAsText(this.filesObject[fileName]);
    reader.onload = (event) => {
      const fileContent = JSON.parse(event.target.result);
      this.filesObject[fileName] = fileContent;
      const req = {
        method: 'POST',
        url: 'http://inverted-index-api.herokuapp.com/api/v0/create',
        data: {
          fileName,
          fileContent
        }
      };
      $http(req).then((res) => {
        this.indexes = res.data;
        return cb(this.indexes);
      }, (res) => {
        return cb(res.data);
      });
    }
  }
});