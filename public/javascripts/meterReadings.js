(function(){var app = angular.module('meter-readings', ["ngResource"]);   
               
    app.controller('meterReadingsCtrl', function($scope, $http, $log, $window, $resource){
                
        $scope.loggedIn = false;
        
        if ($window.sessionStorage.token) {
           $scope.loggedIn = true;
        }
        
        var MeterReading = $resource('/api/meterReadings/:id', {id:'@id'});
        
        $scope.refresh = function(){
            MeterReading.query().$promise.then(function(result) {
                $scope.meterReadings = result;
                
                $log.info('Found '+$scope.meterReadings.length+' readings');
            });
        }
        
        $scope.newMeterReading = {
            date:'2014-01-02', 
            gas:'15000', 
            electricity:'1000'
        }
        
        $scope.add = function(newMeterReading){
            
            //$log.info('why is this called?');
            
            var newEntry = new MeterReading();
            newEntry.date = newMeterReading.date;
            newEntry.gas = newMeterReading.gas;
            newEntry.electricity = newMeterReading.electricity;
            newEntry.$save().then(function(result){
                $scope.refresh();
            });    
        }
        
        $scope.delete = function(meterReading){
            
            $log.info('js.delete:id'+meterReading._id);
            
            MeterReading.remove({'id':meterReading._id}).$promise.then(function(result){
                $scope.refresh();
            });    
        }
        
        $scope.$on('loggedIn', function (event, arg) { 
            
            if(arg){
                $scope.loggedIn = true;
                $scope.refresh();
            }else{
                $scope.loggedIn = false;
                $scope.meterReadings = {};
            }
            
            //$log.info('event:'+arg);
            //$scope.receiver = 'got your ' + arg;
            //$scope.refresh();
        });
        
        $scope.refresh();
        
    });
})();