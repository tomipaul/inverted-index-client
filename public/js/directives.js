angular.module('plummage')
.directive('indexTable', () => {
  return {
    replace: true,
		restrict: "EA",
		template: `<table>
    <caption>{{selectedFile}}</caption>
    <tr>
    <th></th>
    <th ng-repeat="book in filesObject[selectedFile]">{{book.title}}</th>
    </tr>
    <tr ng-repeat = "(name, value) in indexes[selectedFile]" ng-init = "indexArray = value" >
    <th>{{name}}</th>
    <td ng-repeat = "book in filesObject[selectedFile]">
      <i class='fa fa-check' ng-show = "{{indexArray | contains : $index}}" class='fa fa-check'></i>
    </td>
    </tr>
    </table>`
	};
});