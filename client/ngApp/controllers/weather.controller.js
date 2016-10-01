var darksky;
(function (darksky) {
    var Controllers;
    (function (Controllers) {
        var WeatherController = (function () {
            function WeatherController(weatherService, $geolocation, $http) {
                this.weatherService = weatherService;
                this.$geolocation = $geolocation;
                this.$http = $http;
                this.date = new Date();
                this.chart = {
                    label: [],
                    data: [[], []],
                    series: ['Temperature', 'Wind Speed'],
                    datasetOverride: [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }],
                    options: {
                        scales: {
                            yAxes: [
                                {
                                    id: 'y-axis-1',
                                    type: 'linear',
                                    display: true,
                                    position: 'left'
                                },
                                {
                                    id: 'y-axis-2',
                                    type: 'linear',
                                    display: true,
                                    position: 'right'
                                }
                            ]
                        }
                    }
                };
                this.getWeather();
            }
            WeatherController.prototype.getWeather = function () {
                var _this = this;
                this.weatherService.getCurrentWeather().then(function (data) {
                    console.log(data);
                    _this.weather = data;
                    _this.setData(data.hourly.data);
                });
            };
            WeatherController.prototype.setData = function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var i = data_1[_i];
                    this.chart.label.push((new Date(i.time * 1000)).getHours());
                    this.chart.data[0].push(i.temperature);
                    this.chart.data[1].push(i.windSpeed);
                }
            };
            return WeatherController;
        }());
        Controllers.WeatherController = WeatherController;
    })(Controllers = darksky.Controllers || (darksky.Controllers = {}));
})(darksky || (darksky = {}));
