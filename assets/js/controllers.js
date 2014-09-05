var puckWebApp = angular.module('myModule', []);
puckWebApp.controller('streamCntrl', streamCntrl);
puckWebApp.controller('fpCntrl', fpCntrl);

function streamCntrl ($scope, $timeout, $http, $location) {
    console.log('Current user: ' + $location.search().user);
    
    var timer;

   function myLoop() {
            
            $http.get('./assets/json/streamer.json')
            .success(function(response) {
                $scope.streamer = response;
            });

        timer = $timeout (
            function() { 
                console.log( "Timeout executed", Date.now() ); 
            }, 3000
        );
        
        timer.then(
            function() { 
                 myLoop();
                 refresher();
             }, function() { 
                    console.log( "Failed collecting Data, check JSON" ); 
                }
        );
    }

    $scope.refresher = function() {
        $scope.currentUser = $location.search().user;
        myLoop();
    }

    myLoop();

    $scope.$on(
        "$destroy",
        function( event ) { 
            $timeout.cancel( timer ); 
        }
    );
}
streamCntrl.$inject = ["$scope", "$timeout", "$http", "$location"];;

function fpCntrl($scope, $http) {
    $http.get('./assets/json/frontpage.json')
    .success(function(data) {$scope.frontpage = data;});
}
fpCntrl.$inject = ["$scope", "$http"];
