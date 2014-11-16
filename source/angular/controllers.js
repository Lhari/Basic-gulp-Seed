angular.module('puckWebApp.controllers', [])

.controller('mainCtrl', function($scope, $rootScope, $location, $timeout, loadAPIservice) {
	
	var timer;

	$rootScope.loadStreamer = function() {

		loadAPIservice.getStreamers().success(function(response) {
			$rootScope.streamer = response;
			$rootScope.numberOfStreamers = $scope.streamer.length;
			$scope.msg = false;
			

		}).error(function() {
			console.log('Something went wrong, Json not delivered correctly');
			$scope.error = true;

		});
	}

	$rootScope.myLoop = function() {

		angular.element('#page').scope().loadStreamer();

		timer = $timeout (
			function() { 
				console.log( "Timeout executed", Date.now() );
				angular.element('#page').scope().myLoop();

				

			}, 3000
		);
	}
	

}).controller('menuCtrl', function($scope, $timeout, $location) {

	angular.element('#page').scope().myLoop();

}).controller('fpCntrl', function($scope, $http, $timeout, loadAPIservice) {

	function frontpageLoop() {

		$timeout (function() {
			$scope.numberOfStreamers = angular.element('#page').scope().numberOfStreamers;
			frontpageLoop();
		}, 5000);
	}
	
	frontpageLoop();

}).controller('streamCtrl', function($scope, $location) {
	var user = $location.path();
	$scope.currentUser = user.substr(13);
});