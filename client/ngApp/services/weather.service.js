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
                this.weather = {};
                this.weatherResource = $resource('/api/weather/:id');
            }
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
                                }),
                                _this.getZipByCoord().then(function () {
                                    _this.getAddressByZip().then(function (address) {
                                        _this.weather.address = address;
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
                        console.log('1. ' + _this.zip);
                        _this.$q.all([
                            _this.getCoordByZip(),
                            _this.getAddressByZip()
                                .then(function (address) {
                                _this.weather.address = address;
                                console.log('2. ' + _this.weather.address);
                            })
                        ]).then(function () {
                            console.log("then block work?");
                            _this.weatherResource.save(_this.coords).$promise
                                .then(function (weather) {
                                _this.weather.currently = weather.hourly.data[(new Date()).getHours()];
                                _this.weather.hourly = weather.hourly;
                                resolve(_this.weather);
                            });
                        }).catch(function () {
                            console.log('q all rejected');
                            reject();
                        });
                    }
                });
            };
            WeatherService.prototype.getCurrentWeather1 = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.getCurrentPosition().then(function () {
                        _this.weatherResource.save(_this.coords).$promise.then(function (weather) {
                            _this.getZipByCoord().then(function () {
                                _this.getAddressByZip().then(function (address) {
                                    var currentWeather = {};
                                    currentWeather.currently = weather.hourly.data[(new Date()).getHours()];
                                    currentWeather.hourly = weather.hourly;
                                    currentWeather.address = address;
                                    resolve(currentWeather);
                                });
                            });
                        }).catch(function (err) {
                            reject(err);
                        });
                    });
                });
            };
            WeatherService.prototype.getAddressByZip = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http
                        .get("http://maps.googleapis.com/maps/api/geocode/json?address=" + _this.zip)
                        .then(function (data) {
                        resolve(data.data.results[0].formatted_address);
                    })
                        .catch(function () {
                        reject();
                    });
                });
            };
            WeatherService.prototype.getCoordByZip = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var URL = "http://maps.googleapis.com/maps/api/geocode/json?address=" + _this.zip;
                    _this.$http
                        .get(URL)
                        .then(function (data) {
                        var location = data.data.results[0].geometry.location;
                        _this.coords.latitude = location.lat;
                        _this.coords.longitude = location.lng;
                        console.log(_this.coords);
                        resolve(_this.coords);
                    })
                        .catch(function () {
                        console.log('rejected');
                        reject();
                    });
                });
            };
            WeatherService.prototype.getZipByCoord = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var URL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + _this.coords.latitude + "," + _this.coords.longitude + "&sensor=false";
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
