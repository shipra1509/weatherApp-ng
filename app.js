// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function ($routeProvider) {
   
   $routeProvider
   
   .when('/', {
       templateUrl: 'pages/home.htm',
       controller: 'homeController'
   })
   
   .when('/forecast', {
       templateUrl: 'pages/forecast.htm',
       controller: 'forecastController'
   })
   
});

//SERVICES
weatherApp.service('cityService', function() {
   
   this.city = "New York, NY";
   
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
   
   $scope.city = cityService.city;
   
   $scope.$watch('city', function() {
       cityService.city = $scope.city;
   });
   
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
   
   $scope.city = cityService.city;
   
 $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK"},{ get: { method: "JSONP" }});
    
 $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2, appid: 'e874f3c217b0b5b04010a43e8d1d93f6' });
    
    $scope.convertToFahrenheit = function(degK){
        return   Math.round((1.8 * (degK - 273)) + 32);
    };
    
    $scope.convertToDate = function(dt){
        return new Date(dt*1000);
    };

        
   console.log($scope.weatherResult);     
}]);