angular.module('puckWebApp.config', ['ngRoute']).config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'content.html',
		controller: 'fpCntrl'
	}).when('/stream/user/:userName', {
		templateUrl: 'stream.html',
		controller: 'streamCtrl'
	})
})