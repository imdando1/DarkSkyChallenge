var darksky;
(function (darksky) {
    var Services;
    (function (Services) {
        var WeatherService = (function () {
            function WeatherService($resource) {
                this.weatherResource = $resource('/api/weather/:id');
            }
            WeatherService.prototype.getWeathers = function () {
                return this.weatherResource.get().$promise;
            };
            return WeatherService;
        }());
        Services.WeatherService = WeatherService;
        angular
            .module('darksky')
            .service('weatherService', WeatherService);
    })(Services = darksky.Services || (darksky.Services = {}));
})(darksky || (darksky = {}));
