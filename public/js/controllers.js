angular.module('plummage')
.controller("invertedIndexCtrl", ($scope, InvertedIndex) => {
  $scope.uploader = InvertedIndex.uploader;
  $scope.filesObject = InvertedIndex.filesObject;
  $scope.selectedFile = "No files uploaded yet";
  $scope.indexTableIsDisplayed = false;
  $scope.showIndexTable = () => {
    $scope.indexTableIsDisplayed = true;
  }
  $scope.filesObjectIsEmpty = () => {
    return Object.keys($scope.filesObject).length === 0;
  };
  $scope.createIndex = () => {
    InvertedIndex.createIndex($scope.selectedFile, (responseData) => {
      $scope.indexes = responseData;
      $scope.showIndexTable();
    });
  }
});