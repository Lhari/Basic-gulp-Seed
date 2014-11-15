angular.module('puckWebApp.controllers', [])

.controller('mainCtrl', function($scope, $rootScope, $location, $timeout, loadAPIservice) {
	
	var timer;

	$rootScope.loadStreamer = function() {
		loadAPIservice.getStreamers().success(function(response) {
			$rootScope.streamer = response;
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

}).controller('fpCntrl', function($scope, $http, loadAPIservice) {
	
	$scope.images = [
		'./assets/images/luna-death.jpg',
		'./assets/images/redbro-darksouls-2.jpg'
	]


	loadAPIservice.getFront().success(function(response) {
		var frontpage = response;
		$scope.numberOfImages = frontpage.length;
		$scope.images = frontpage;

	});

}).controller('streamCtrl', function($scope, $location) {
	var user = $location.path();
	$scope.currentUser = user.substr(13);
});