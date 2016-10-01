var darksky;
(function (darksky) {
    var Services;
    (function (Services) {
        var WeatherService = (function () {
            function WeatherService($resource, $geolocation, $q, $http) {
                this.$geolocation = $geolocation;
                this.$q = $q;
                this.$http = $http;
                this.coords = {};
                this.weatherResource = $resource('/api/weather/:id');
            }
            WeatherService.prototype.getCurrentWeather = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.getCurrentPosition().then(function () {
                        _this.weatherResource.save(_this.coords).$promise.then(function (weather) {
                            _this.getAddressByCoords().then(function (address) {
                                var currentWeather = {};
                                currentWeather.currently = weather.hourly.data[(new Date()).getHours()];
                                currentWeather.hourly = weather.hourly;
                                currentWeather.address = address;
                                resolve(currentWeather);
                            });
                        }).catch(function (err) {
                            reject(err);
                        });
                    });
                });
            };
            WeatherService.prototype.getAddressByCoords = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http
                        .get('http://maps.googleapis.com/maps/api/geocode/json?address=98058')
                        .then(function (data) {
                        resolve(data.data.results[0].formatted_address);
                    })
                        .catch(function () {
                        reject();
                    });
                });
            };
            WeatherService.prototype.getCurrentPosition = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$geolocation.getCurrentPosition({
                        timeout: 60000
                    }).then(function (position) {
                        if (position) {
                            _this.coords.latitude = position.coords.latitude;
                            _this.coords.longitude = position.coords.longitude;
                            resolve();
                        }
                        else {
                            reject();
                        }
                    });
                });
            };
            return WeatherService;
        }());
        Services.WeatherService = WeatherService;
        angular.module('darksky').service('weatherService', WeatherService);
    })(Services = darksky.Services || (darksky.Services = {}));
})(darksky || (darksky = {}));
