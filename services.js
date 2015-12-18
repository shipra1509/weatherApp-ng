//SERVICES
weatherApp.service('cityService', function() {
  
  this.city = "New York, NY";
  
});

weatherApp.service('weatherService', ['$resource', function($resource) {
    
    this.GetWeather = function(city, days) {
   var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
       callback: "JSON_CALLBACK"},{ get: { method: "JSONP" }});
    
  return weatherAPI.get({ q: city, cnt: days, appid: 'ae8ac2b5fc9f0fcad31e4cecfc72fbf1' }); 
        
    };
}]);
