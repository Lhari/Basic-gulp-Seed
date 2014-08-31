angular.module('frontpageControllerTest', [])
  .controller('frontpageController', frontpageController);

function frontpageController($scope,$http) {
    $http.get('./assets/json/frontpage.json')
    .success(function(response) {$scope.frontpage = response;});
}