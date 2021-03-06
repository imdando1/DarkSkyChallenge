(function () {
    var WeatherService = (function () {
        function WeatherService($resource, $geolocation, $q, $http) {
            this.$geolocation = $geolocation;
            this.$q = $q;
            this.$http = $http;
            this.coords = {};
            this.weather = {};
            this.weatherResource = $resource('/api/weather', null, {
                getWeek: {
                    method: 'PUT',
                    url: '/api/weather'
                }
            });
        }
        WeatherService.prototype.getAddressByZip = function () {
            var _this = this;
            return this.$q(function (resolve, reject) {
                var URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + _this.zip;
                _this.$http
                    .get(URL)
                    .then(function (data) {
                    if (data.data.results[0]) {
                        resolve(data.data.results[0].formatted_address);
                    }
                    else {
                        reject();
                    }
                })
                    .catch(function () {
                    reject();
                });
            });
        };
        WeatherService.prototype.getCoordByZip = function () {
            var _this = this;
            return this.$q(function (resolve, reject) {
                var URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + _this.zip;
                _this.$http
                    .get(URL)
                    .then(function (data) {
                    if (data.data.results[0]) {
                        var location_1 = data.data.results[0].geometry.location;
                        _this.coords.latitude = location_1.lat;
                        _this.coords.longitude = location_1.lng;
                        resolve(_this.coords);
                    }
                    else {
                        reject();
                    }
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
        WeatherService.prototype.getZipByCoord = function () {
            var _this = this;
            return this.$q(function (resolve, reject) {
                var URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + _this.coords.latitude + "," + _this.coords.longitude + "&sensor=false";
                _this.$http
                    .get(URL)
                    .then(function (data) {
                    _this.zip = data.data.results[0].address_components.filter(function (elm) {
                        if (elm.types[0] == 'postal_code')
                            return true;
                    })[0].short_name;
                    resolve();
                })
                    .catch(function () {
                    reject();
                });
            });
        };
        WeatherService.prototype.getCurrnetWeather = function (zip) {
            var _this = this;
            return this.$q(function (resolve, reject) {
                if (!zip) {
                    _this.getCurrentPosition()
                        .then(function () {
                        _this.$q.all([
                            _this.weatherResource.save(_this.coords).$promise
                                .then(function (weather) {
                                _this.weather.currently = weather.hourly.data[(new Date()).getHours()];
                                _this.weather.hourly = weather.hourly;
                                _this.weather.daily = weather.daily;
                            })
                                .catch(function () {
                                reject();
                            }),
                            _this.getZipByCoord().then(function () {
                                _this.getAddressByZip()
                                    .then(function (address) {
                                    _this.weather.address = address;
                                })
                                    .catch(function () {
                                    reject();
                                });
                            })
                        ]).then(function () {
                            resolve(_this.weather);
                        }).catch(function () {
                            reject();
                        });
                    });
                }
                else {
                    _this.zip = zip;
                    _this.$q.all([
                        _this.getCoordByZip(),
                        _this.getAddressByZip()
                            .then(function (address) {
                            _this.weather.address = address;
                        })
                            .catch(function () {
                            reject();
                        })
                    ]).then(function () {
                        _this.weatherResource.save(_this.coords).$promise
                            .then(function (weather) {
                            _this.weather.currently = weather.hourly.data[(new Date()).getHours()];
                            _this.weather.hourly = weather.hourly;
                            resolve(_this.weather);
                        })
                            .catch(function () {
                            reject();
                        });
                    }).catch(function () {
                        reject();
                    });
                }
            });
        };
        WeatherService.prototype.getWeeklyWeather = function () {
            return this.weatherResource.getWeek(this.coords).$promise;
        };
        WeatherService.$inject = ['$resource', '$geolocation', '$q', '$http'];
        return WeatherService;
    }());
    angular
        .module('services')
        .service('weatherService', WeatherService);
})();
