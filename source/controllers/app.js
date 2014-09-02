var puckWebApp = angular.module('myModule', []);
puckWebApp.controller('streamCntrl', streamCntrl);
puckWebApp.controller('fpCntrl', fpCntrl);

function streamCntrl ($scope, $timeout, $http) {
    
    var timer;

       function myLoop() {
           
            $http.get('./assets/json/streamer.json')
            .success(function(response) {$scope.streamer = response;});

                    timer = $timeout (
                        function() { 
                            console.log( "Timeout executed", Date.now() ); 
                        },
                        3000
                    );
  
                    
                    timer.then(
                        function() { 
                            myLoop();
 
                        },
                        function() { 
                            console.log( "Failed collecting Data, check JSON" ); 
                        }
                    );
                }

                myLoop();

                    $scope.$on(
                        "$destroy",
                        function( event ) { 
                            $timeout.cancel( timer ); 
                        }
                    );
    
};

function fpCntrl($scope, $http) {
    $http.get('./assets/json/frontpage.json')
    .success(function(data) {$scope.frontpage = data;});
}
