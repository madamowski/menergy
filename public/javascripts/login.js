(function(){var app = angular.module('login', []);   
               
    app.controller('loginCtrl', function($scope, $rootScope, $http, $window, $log){
        
        $scope.user = {username: '', password: '', loggedIn: false };
        $scope.message = '';
        
        if ($window.sessionStorage.token) {
           $scope.user.loggedIn = true;
           $scope.user.username = $window.sessionStorage.username;
        }
        
        $scope.login = function(){
            
            $http.post('/login', $scope.user)
                .success(function (data, status, headers, config) {
                    
                    //$log.info(data.user);
                    
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.username = data.user.username;
                    
                    $scope.message = 'Welcome';
                    $scope.user.loggedIn = true;
                    
                    $rootScope.$broadcast('loggedIn', true);
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    // Handle login errors here
                    
                    $log.info('error');
                    
                    $scope.message = 'Error: Invalid user or password';
                    $scope.user.loggedIn = false;
                    
                    $rootScope.$broadcast('loggedIn', false);
                });
        }
        
        $scope.logout = function(){
            
            delete $window.sessionStorage.token;
            $scope.user.loggedIn = false;
            $rootScope.$broadcast('loggedIn', false);
        }
        
        //var MeterReadings = $resource('/api/meterReadings/:id', {userId:'@id'});
        
        //MeterReadings.query().$promise.then(function(meterReadings) {
        //    $scope.meterReadings = meterReadings;
            
            //$log.info(meterReadings[0].gas);
        //});
        
        //this.product = gem;  
    });
})();