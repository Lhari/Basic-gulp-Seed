angular.module('streamControllerTest', [])
  .controller('streamerController', streamerController);

function streamerController($scope,$http) {
    $http.get('./streamer.json')
    .success(function(response) {$scope.streamer = response;});
}