angular.module('puckWebApp.services', []).
factory('loadAPIservice', function($http) {
	var appAPI = {};

	appAPI.getStreamers = function() {
		return $http.get('./assets/json/streamer.json');
	};

	appAPI.getFront = function() {
		return $http.get('./assets/json/frontpage.json');
	}
	return appAPI;
});